---
title: 'github 第三方登录'
description: 'nest + react 实现 github 第三方登录'
pubDate: '2024-11-19 19:34:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/31-40/thirtyOne.png'
tags: ['ink-spell', 'oauth']
selected: false
---

## 简介

第三方授权登录具备以下优点：

- 对于用户：操作简便、快捷，无需记忆账号密码，规避了繁杂的注册流程；
- 对于应用开发商：借助第三方账户登录，能够迅速获取用户的部分个人信息，有利于为用户提供个性化体验和精准推荐；

## OAuth 的思路

OAuth在“客户端”和“服务供应商”之间，设置了一个授权层。“客户端”不能直接登录“服务供应商”，只能登录授权，以此将用户与客户端区分开来。“客户端”登录授权之后，“服务提供商”根据令牌的权限范围和有效期，向"客户端"开放用户储存的资料。

![''](@images/ink-spell/thirtyOne/image.png)

> 简单说，OAuth 就是一种授权机制。数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（token），用来代替密码，供第三方应用使用。

## OAuth的登录实践

![''](@images/ink-spell/thirtyOne/image2.png)

### 1. GitHub 应用登记

点击按钮去github主页新建一个OAuth App，[点击创建](https://github.com/settings/applications/new) 按如下提示填写信息

![''](@images/ink-spell/thirtyOne/image3.png)

[官网重定向指出](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#loopback-redirect-urls) 这里如果是本地地址，不要用 localhost，用 127.0.0.1 来替换

![''](@images/ink-spell/thirtyOne/image4.png)

创建完之后记住页面上方的 Client ID 和 Client Secret，后面开发时需要用到这两个参数。

![''](@images/ink-spell/thirtyOne/image5.png)

在 github 上通过如上，可以找到 OAuth 的 Client ID 和 Client Secret

### 2. Web应用授权流程

#### 1.请求用户的 github 身份

```bash
GET https://github.com/login/oauth/authorize
```

| 参数         | 类型   | 描述                                            |
| ------------ | ------ | ----------------------------------------------- |
| client_id    | string | Github 上的 OAuth 的 Client ID                  |
| redirect_uri | string | Github 上的 redirect_uri 一定要对应，不然就报错 |

#### 2.用户被 github 重定向到 redirect_uri 网址

比如我们 redirect_uri 是 **<http://127.0.0.1:6600/oauth>**

那么我们授权登陆了之后，被 github 重定向到 **<http://127.0.0.1:6600/oauth?code=>???**

```bash
POST https://github.com/login/oauth/access_token
```

| 参数          | 类型   | 描述                               |
| ------------- | ------ | ---------------------------------- |
| client_id     | string | Github 上的 OAuth 的 Client ID     |
| client_secret | string | Github 上的 OAuth 的 Client Secret |
| code          | string | Github 重定向返回的 code           |

默认情况下，响应采取以下格式：

```bash
access_token=gho_16C7e42F292c6912E7710c838347Ae178B4a&scope=repo%2Cgist&token_type=bearer
```

如果在请求头提供格式 **Accept: application/json**

```json
Accept: application/json
{
  "access_token":"gho_16C7e42F292c6912E7710c838347Ae178B4a",
  "scope":"repo,gist",
  "token_type":"bearer"
}
```

#### 3.使用访问令牌获取用户信息

```bash
Authorization: Bearer OAUTH-TOKEN
GET https://api.github.com/user
```

返回类似这样的格式

```json
{
  "login": "CaoMeiYouRen",
  "id": 123456,
  "node_id": "xxxxxxxxxxxxxxx",
  "avatar_url": "https://avatars.githubusercontent.com/u/40430746?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/CaoMeiYouRen",
  "html_url": "https://github.com/CaoMeiYouRen",
  "followers_url": "https://api.github.com/users/CaoMeiYouRen/followers",
  "following_url": "https://api.github.com/users/CaoMeiYouRen/following{/other_user}",
  "gists_url": "https://api.github.com/users/CaoMeiYouRen/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/CaoMeiYouRen/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/CaoMeiYouRen/subscriptions",
  "organizations_url": "https://api.github.com/users/CaoMeiYouRen/orgs",
  "repos_url": "https://api.github.com/users/CaoMeiYouRen/repos",
  "events_url": "https://api.github.com/users/CaoMeiYouRen/events{/privacy}",
  "received_events_url": "https://api.github.com/users/CaoMeiYouRen/received_events",
  "type": "User",
  "site_admin": false,
  "name": null,
  "company": null,
  "blog": "https://blog.cmyr.ltd/",
  "location": "中国",
  "email": null,
  "hireable": null,
  "bio": "主攻ts/js/vue，前端工程师，B站搜草梅友仁",
  "twitter_username": null,
  "public_repos": 198,
  "public_gists": 0,
  "followers": 17,
  "following": 5,
  "created_at": "2018-06-20T12:50:51Z",
  "updated_at": "2022-08-03T08:18:05Z"
}
```

[详情请见官网](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow)

### 3. 代码实现

![''](@images/ink-spell/thirtyOne/image6.gif)

#### 前端

```ts
window.open(
  `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=http://127.0.0.1:6600/oauth`,
  '_blank',
  'height=600, width=700'
)
```

然后通过路由导航到 <http://127.0.0.1:6600/oauth> ，判断是否登录成功，不管是否登录成功，都关闭该窗口

```ts
export const Route = createFileRoute('/$')({
  beforeLoad: async (router) => {
    if (router.location.pathname === '/oauth') {
      const code = (router.search as { code?: string }).code
      if (code !== undefined) {
        try {
          const result = await httpRequest.get(`/auth/oauth?code=${code}`)
          const { access_token, refresh_token } = result.data
          AuthUtils.setAccessToken(access_token)
          AuthUtils.setFreshToken(refresh_token)
          // 通过 window.opener 打开的窗口的父窗口重新刷新
          window.opener.location.href = '/'
          window.close()
        } catch (_) {
          window.opener.alert('连接超时')
          window.close()
        }
      }
      return
    }
    throw redirect({
      to: '/404'
    })
  },
  component: () => <Page />
})
```

#### 后端

```ts
  // 第三方登录
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('/oauth')
  @ApiOperation({ summary: '第三方登录' })
  async getAccessToken(@Query('code') code: string) {
    const imagePath = appConfig.OAUTH_REGISTER_AVATAR + `${new Date().getTime()}.png`;
    if (!code) {
      throw new HttpException('Missing code parameter', HttpStatus.BAD_REQUEST);
    }

    try {
      const tokenResponse = await axios({
        method: 'post',
        url:
          'https://github.com/login/oauth/access_token?' +
          `client_id=${env.CLIENT_ID}&` +
          `client_secret=${env.CLIENT_SECRETS}&` +
          `code=${code}`,
        headers: {
          accept: 'application/json',
        },
        timeout: 10 * 1000
      });
      const accessToken = tokenResponse.data.access_token;

      const result = await axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: {
          accept: 'application/json',
          Authorization: `token ${accessToken}`,
        },
      });
      const user = result.data
      // login 账号
      // name  用户名
      // avatar_url 头像
      // 密码默认 123456

      // 注册用户
      const isDownloadAvatar = await this.authService.validateOauth(user.login, OauthEnum.GITHUB)
      if (!isDownloadAvatar) {
        // TODO:登录不需要下载头像
        // 下载用户的头像
        await axios({
          method: "GET",
          url: user.avatar_url,
          responseType: 'arraybuffer',
        }).then((response: AxiosResponse) => {
          writeFile(imagePath, response.data, 'binary', function (err) {
            if (err) {
              console.log("下载失败", err);
            } else {
              console.log("下载成功");
            }
          });
        })
      }

      return await this.authService.oauth({
        account: user.login,
        username: user.name,
        password: appConfig.DEFAULT_PASSWORD,
        avatar: imagePath.replace("public", "static"),
      }, OauthEnum.GITHUB)
    } catch (err) {
      throw new BadGatewayException("连接超时")
    }
  }
```

## 参考文章

[给你的网站添加第三方登录以及短信验证功能](https://juejin.cn/post/6844904024118919176)

[第三方登录之 GitHub OAuth 的接入与使用](https://juejin.cn/post/7128318034166415397)
