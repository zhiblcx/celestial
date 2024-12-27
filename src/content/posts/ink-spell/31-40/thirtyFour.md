---
title: 'Nextjs  角色权限'
description: 'Nextjs 的基于角色控制访问（RBAC）'
pubDate: '2024-12-05 08:12:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/31-40/thirtyFour.png'
tags: ['ink-spell', 'role']
selected: false
---

## 基本的 RBAC 实现

RBAC 全程：Role-based access control

首先，让我们创建角色的枚举

```js
export enum Role {
  User = 'user',
  Admin = 'admin',
}
```

接着，我们需要一个 **@Roles()** 装饰器。该装饰器允许指定**访问特定资源**所需的角色。

```js
import { Role } from '@/shared/enums/role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
```

现在我们有了自定义的 **@Roles()** 装饰器，我们可以用它来装饰任何路由处理程序。

![''](@images/ink-spell/thirtyFour/image.png)

最后，我们创建一个 **RolesGuard** 类，它将分配给当前用户的角色与当前正在处理的路由的实际角色进行比较。为了访问路由的角色（自定义元数据），我们将使用 **Reflector** 帮助器类，该类由框架提供。

![''](@images/ink-spell/thirtyFour/image2.png)

确保注册 **RolesGuard**

```typescript
providers: [
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
]
```

当权限不足的用户请求端点时，Nest 自动返回以下响应：

```typescript
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

## 拦截器和元数据（Reflection and metadata）

```ts
import { Role } from '@/shared/enums/role.enum'
import { SetMetadata } from '@nestjs/common'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)

// 可替换为
import { Reflector } from '@nestjs/core'
export const Roles = Reflector.createDecorator<Role[]>()
```

考虑以下场景，您在两个级别都提供了 **Roles** 数据。

```ts
@Roles(['user'])
@Controller('cats')
export class CatsController {
  @Post()
  @Roles(['admin'])
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto)
  }
}
```

如果您的目的是将 **user** 指定为默认角色，并有选择地为某些方法覆盖它，您可能会使用 **getAllAndOverride()** 方法。

具有此代码的守卫，在 **create()** 方法的上下文中运行，并具有上述元数据，将产生 **roles** 包含 **['admin']** 。

要获取两者的元数据并将其合并（此方法合并数组和对象），请使用 **getAllAndMerge()** 方法：

```typescript
const roles = this.reflector.getAllAndMerge(Roles, [
  context.getHandler(),
  context.getClass(),
])
```

这将导致 **roles** 包含 **['user', 'admin']** 。

## 参考文献

[基于 RBAC 对 MongoDB 账号进行权限管理](https://juejin.cn/post/7384629198129872935)

[Next官网——Authorization](https://docs.nestjs.com/security/authorization)

[Next官网——Reflection and metadata](https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata)
