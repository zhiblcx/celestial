---
title: '实现双token'
description: '用户无感知、稳定可靠的双Token刷新机制'
pubDate: '2024-10-24 08:14:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/twentySix.png'
tags: ['ink-spell']
selected: false
---

## 为什么需要无感刷新token机制

**理由1：**
服务器把用户信息放入 token 中，设置一个过期时间，客户端请求的时候通过 authorization 的 header 携带 token，服务器端验证通过，就可以从中获取用户信息。

但是 token 有过期时间，比如 3 天，那过期后再访问就需要重新登录了。这样体验并不好，想想在用某个 app 的时候，用着用着突然跳到登录页了。告诉我要重新登录，体验是不是很差。

所以要加上续签机制，也就是延长 token 过期时间

主流的方案就是通过双 token，一个是 access token，一个是 refresh token。

**理由2：**
单token等过期了就没办法续了，不过期客户端就得保存一个时间戳，在过期之前更换新的 token，但很可能也会出现类似的情况，假设期限7天，你设置5天期限更新，但第六、七天用户没更新，那么第八天就需要重新登录，用户感觉两天没上线就要重新登陆，期限短点也行，但仍然出现另外一个问题，如果你这个 token 被别人劫持拿到了，那么就可以肆意挥霍好几天了，安全性就出现问题了(例如某个场景：某人复制了浏览器存放的信息，到别人那里，就可以简单操作拥有那人的权限了，并且普通人也可以做到)，如果是双 token 呢，一般短的，持续时间为 30m，别人即使拿到了，也会很快到期，还得重新想办法拿新的，这就无形之间增加了成本（针对上面案例，对于使用漏洞者的要求更高了），双token的优势就出现了，并且无需前端设置时间校验，只需要出现 401 的时候，重新调用接口，重发请求即可，也方便后台调整过期时间，另外，后台本来也是每次都需要校验token，因此逻辑上算是无缝支持，两端逻辑都很简单

并且双token比单token除了安全性，逻辑上整体也要简单严谨不少，因此很多人都在使用这一方案，这也是用户体验、开发体验、应用安全的之间互相博弈平衡的结果(当然这也只是针对部分场景出现的方案，未来也许还会改变或者有新的方案，你也会发现，每次新增改变都可以规避一种风险，那同时也会增加开发成本)

## 示意图

![''](@images/ink-spell/twentySix/image.png)

## 双 token 的原理

access token 是用来访问资源的，过期时间短，比如 10 分钟。refresh token 是用来刷新 access token 的，过期时间长，比如 7 天。

客户端每次请求的时候，先检查 access token 是否过期，如果过期了，就使用 refresh token 去刷新 access token，如果 refresh token 也过期了，就跳转到登录页。

## 实现双 token

**后端 nestjs 实现：**

```typescript
// auth.controller.ts
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('/refresh')
  @ApiOperation({ summary: '刷新token' })
  @APIResponse(LoginVo, '刷新成功')
  async refresh_token(@Query('refresh_token') refresh_token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token);
      return await this.authService.refreshToken({
        userId: payload.userId,
        account: payload.account,
      });
    } catch (_) {
      throw new UnauthorizedException('token 失效，请重新登录');
    }
  }

// auth.service.ts

//  生成 access_token 和 refresh_token
  async generateToken(payload: { userId: number; account: string }) {
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      }),
    };
  }

// 刷新 token
  async refreshToken(payload: { userId: number; account: string }) {
    return new R({
      data: await this.generateToken(payload),
      message: '刷新成功',
    });
  }
```

**前端 axios 代码：**

```typescript
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error) => {
    const { data, config } = error.response

    // 需要排除下 /refresh 接口，避免出现刷新失败不断刷新
    if (data.statusCode == 401 && !config.url.includes('refresh')) {
      const res = await refreshToken()
      if (res.status !== 200) {
        window.location.href = '/signin'
        AuthUtils.clearAccessToken()
        AuthUtils.clearFreshToken()
      } else {
        throw error
      }
    }
  }
)

async function refreshToken() {
  const res = await axiosInstance.get(
    `auth/refresh?refresh_token=${AuthUtils.getFreshToken()}`
  )
  AuthUtils.setAccessToken(res.data.data.access_token)
  AuthUtils.setFreshToken(res.data.data.refresh_token)
  return res
}
```

可是上面的代码会出现一个问题，refreshToken 会调用多次，这样会降低性能

于是将添加一个 refreshFlag 的标记，记录是否正在刷新 token，如果正在刷新，就返回一个 Promise，并且把他的 resolve 方法还有 config 加入到一个队列当中。

当 token 刷新完毕之后，重新发起队列当中的请求

代码修改如下所示：

```typescript
interface PendingTask {
  config: AxiosRequestConfig
  resolve: Function
}

let refreshFlag = false
const queue: PendingTask[] = []
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error) => {
    const { data, config } = error.response

    if (refreshFlag) {
      return new Promise((resolve) => {
        queue.push({ config, resolve })
      })
    }

    if (data.statusCode == 401 && !config.url.includes('refresh')) {
      refreshFlag = true
      const res = await refreshToken()
      refreshFlag = false
      if (res.status === 200) {
        queue.forEach(({ config, resolve }) => {
          resolve(axiosInstance(config))
        })
      } else {
        window.location.href = '/signin'
        AuthUtils.clearAccessToken()
        AuthUtils.clearFreshToken()
      }
    } else {
      throw error
    }
  }
)

async function refreshToken() {
  const res = await axiosInstance.get(
    `auth/refresh?refresh_token=${AuthUtils.getFreshToken()}`
  )
  AuthUtils.setAccessToken(res.data.data.access_token)
  AuthUtils.setFreshToken(res.data.data.refresh_token)
  return res
}
```

> 考虑到并发请求用到了 Promise，当 token 刷新成功后，重新发送队列中的请求（即在刷新期间积压的请求），并且把结果通过的 resolve 返回（即重新发起请求）

## 参考文献

[nestjs-实现双token无感刷新](https://juejin.cn/post/7275211391102451772)

[🚀 前端无感刷新token机制（一文说明白）](https://juejin.cn/post/7423210982547767334)

[基于 Axios 封装一个完美的双 token 无感刷新](https://juejin.cn/post/7271139265442021391?from=search-suggest)

[告别频繁登录：教你用Axios实现无感知双Token刷新](https://juejin.cn/post/7406992576513589286)
