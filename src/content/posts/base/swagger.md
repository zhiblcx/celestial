---
title: "初学 swagger"
description: "在 nest 中 swagger 的使用"
pubDate: "2024-07-05 15:03:00"
category: "base"
cardImage: "@images/base/swagger.png"
tags: ["restful",'swagger']
selected: true
---

## 介绍

Swagger 是一套开源的软件框架，它帮助开发者设计、构建、记录以及使用 RESTful Web 服务。它包括了多个与API开发有关的开源工具，主要用于以下几个方面：

1. API 设计和定义：通过 Swagger 规范（OpenAPI），可以以 YAML 或 JSON 格式编写 API 定义。
2. 文档自动生成：根据API定义自动生成交互式API文档，让前端开发和测试人员能够了解如何使用API，通常通过 Swagger UI 来展示。
3. 代码生成：Swagger Codegen 可以根据API定义生成服务器存根、API 客户端库和API 文档等。
4. API 测试：Swagger 提供工具支持API的自动化测试。

## 创建 swagger 文档

首先全局安装 Nest

```bash
npm i -g @nestjs/cli
```

新建一个 nest-swagger 项目

```bash
nest new nest-swagger
```

接着需要安装 @nestjs/swagger swagger-ui-express

```bash
npm install @nestjs/swagger swagger-ui-express -S
```

然后在 main.js 进行引入配置

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('FS_ADMIN') // 标题
    .setDescription('后台管理系统接口文档') // 描述
    .setVersion('1.0') // 版本
    .build();
  const document = SwaggerModule.createDocument(app, options);
  //配置swgger地址
  SwaggerModule.setup('/fs_admin/api', app, document);
  await app.listen(3000);
}
bootstrap();
```

+ **DocumentBuilder** 是 Swagger 模块中的一个类，用于构建 Swagger 文档的基本信息。
+ **SwaggerModule.createDocument(app, swaggerConfig)** ：根据传入的应用实例和之前构建的文档配置对象，创建 Swagger 文档。
+ **SwaggerModule.setup('/fs_admin/api', app, document)** ：将生成的 Swagger 文档设置在指定的路径上（这里是 '**/fs_admin/api**'），以便 Swagger UI 可以通过该路径访问文档。

## 🥂 **DocumentBuilder常用的属性配置**

| 方法                                                       | 描述                       |
| :--------------------------------------------------------- | :------------------------- |
| setTitle(title: string)                                    | 设置文档标题               |
| setDescription(description: string)                        | 设置文档描述               |
| setVersion(version: string)                                | 设置文档版本               |
| setTermsOfService(termsOfService: string)                  | 设置文档服务条款           |
| setContact(name: string, url: string, email: string)       | 设置文档联系信息           |
| setLicense(name: string, url: string)                      | 设置文档许可证信息         |
| setExternalDoc(description: string, url: string)           | 设置外部文档链接           |
| addBearerAuth(options: AddBearerAuthOptions, name: string) | 添加 Bearer Token 认证配置 |
| addApiKey(options: AddApiKeyOptions, name: string)         | 添加 API Key 认证配置      |
| addOAuth2(options: AddOAuth2Options, name: string)         | 添加 OAuth2 认证配置       |

启动项目 **pnpm run start:dev** 访问网址 **<http://localhost:3000/fs_admin/api>** 就可以看到 swagger 界面了
![](@images/base/swagger/image.jpg)

## swagger 操作

新建一个 user 模块

```bash
nest g res user
```

我们发现目录下多了一个 user 模块，再去刷新接口文档，swagger 界面多了几个接口，如下：
![](@images/base/swagger/image2.jpg)

它会展示我们在 **controller** 中写的所有接口，并且没有分类，也没有请求和返回的参数格式，还需要进行一些配置。以 User 模块为例

在 user.controller.ts 中，引入 ApiOperation 和 ApiTags 装饰器，并添加一些注释，如下：

```typescript
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('用户管理')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '创建用户' })
```

打开 swagger 查看效果
![](@images/base/swagger/image3.jpg)

一般开发中，前端传来的数据会放在 DTO(Data transfer Object) 中，而返回给前端的数据定义在 VO(View Object)

接着在 create-user-dto.ts 中，定义前端传过来的参数

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'admin',
    description: '用户名',
  })
  username: string;
  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  password: string;
}
```

![](@images/base/swagger/image4.jpg)

可以看到示例值有了，接下来我们在 user 文件夹下创建 vo/create-user.vo.ts 用来描述这个接口的返回值

```typescript
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserVo {
  @ApiProperty({ example: 200 })
  code: number;
  @ApiProperty({ example: {} })
  data: object;
  @ApiProperty({ example: '请求成功' })
  message: string;
}
```

接着在 user.controller.ts 中用 **@ApiResponse** 装饰一下

```typescript
@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: '创建用户',
  })
  @ApiOkResponse({
    description: '返回示例',
    type: CreateUserVo,
  })
  create(@Body() createUserDto: CreateUserDto) {}
```

![](@images/base/swagger/image5.jpg)

因为有些接口需要登录才能访问，因此需要在 swagger 中配置 token
其实很简单，在 main.ts 加一个 addBearerAuth() 函数即可

```typescript
const options = new DocumentBuilder()
    .setTitle('FS_ADMIN') // 标题
    .setDescription('后台管理系统接口文档') // 描述
    .setVersion('1.0') // 版本
    .addBearerAuth()
    .build();
```

接着在需要认证的接口上添加 **@ApiBearerAuth** 装饰器

```typescript
 @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: '创建用户',
  })
  @ApiResponse({
    description: '返回示例',
    type: CreateUserVo,
  })
```

![](@images/base/swagger/image6.jpg)

可以看到多了一个输入 token 的地方，我们把 token 输入进去就可以访问加了权限的接口

## 🥂 **常用的Swagger 装饰器**

| **装饰器**              | 描述                                                     | **使用场景**                                                 |
| :---------------------- | :------------------------------------------------------- | ------------------------------------------------------------ |
| **@ApiTags**            | 为控制器或方法添加标签，用于组织 Swagger UI 文档         | 标明控制器或方法所属的领域，使文档更易于组织                 |
| **@ApiOperation**       | 为控制器方法添加操作描述，包括摘要和详细描述             | 提供关于 API 操作的清晰说明，方便开发者理解 API 的作用       |
| **@ApiParam**           | 描述路径参数、请求参数或响应参数，包括名称、类型、描述等 | 提供详细的参数信息，方便开发者正确使用和理解 API             |
| **@ApiBody**            | 指定请求体的 DTO 类型，用于描述请求体的结构              | 明确请求体的结构，帮助开发者正确发送请求                     |
| **@ApiResponse**        | 描述 API 的响应，包括状态码、描述等。                    | 提供关于 API 响应的详细说明，方便开发者处理各种响应情况      |
| **@ApiBearerAuth**      | 指定请求需要携带 Bearer Token，用于身份验证              | 在需要身份验证的接口中使用，指定需要提供 Token 信息          |
| **@ApiProperty**        | 为 DTO 类型的属性添加元数据，如描述、默认值等            | 提供详细的属性信息，使开发者了解 DTO 对象的结构和约束        |
| **@ApiQuery**           | 描述查询参数，包括名称、类型、描述等                     | 用于标识查询参数，使开发者清晰了解 API 的可用查询选项        |
| **@ApiHeader**          | 描述请求头信息，包括名称、类型、描述等                   | 提供请求头的详细信息，使开发者正确设置请求头                 |
| **@ApiExcludeEndpoint** | 标记一个控制器方法不在 Swagger UI 中显示                 | 在一些特殊情况下，可以使用该装饰器排除不需要在文档中展示的接口 |
