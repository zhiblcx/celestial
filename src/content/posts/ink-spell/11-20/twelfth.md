---
title: '使用异常过滤器处理异常'
description: 'NestJs + Prisma 使用异常过滤器处理异常'
pubDate: '2024-07-30 10:26:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/11-20/twelfth.jpg'
tags: ['ink-spell', 'prisma', 'error']
selected: false
---

## 专用异常层的优点

在很多情况下，异常会被程序代码自动生成。在这种情况下，你应该处理异常并向用户返回适当的 HTTP 错误。

虽然可以手动在每个控制器中逐个处理异常，但由于多种原因，这不是一个好主意：

- 它会使你的核心程序逻辑因大量错误处理而变得混乱。
- 许多端点都会处理相似的错误，就像找不到资源这种。你就要在很多地方复制相同的错误处理代码。
- 很难更改错误处理逻辑，因为它分散在很多位置。

为了解决这些问题，NestJS 有一个异常层，负责处理整个应用程序中未处理异常的。在 NestJS 中，你可以创建异常过滤器来定义如何处理应用程序中抛出的不同类型的异常。

## 创建手动异常过滤器

首先，用 Nest CLI 生成一个[过滤器类](https://docs.nestjs.com/exception-filters#inheritance)：

```bash
npx nest generate filter prisma-client-exception
```

这将创建一个新文件 src/prisma-client-exception.filter.ts，它包含以下内容：

```ts
// src/prisma-client-exception.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'

@Catch()
export class PrismaClientExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
```

此时你会收到一个来自 eslint 的错误提示，因为 catch 方法还是空的。更新 PrismaClientExceptionFilter 中的 catch 方法实现，如下所示：

```ts
import { ArgumentsHost, Catch } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'

@Catch(Prisma.PrismaClientKnownRequestError) // 1
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  // 2
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message) // 3

    // default 500 error code
    super.catch(exception, host)
  }
}
```

Prisma 会针对许多不同类型的错误抛出 PrismaClientKnownRequestError。所以需要弄清如何从 PrismaClientKnownRequestError 异常中提取错误码。PrismaClientKnownRequestError 异常有一个包含错误码的 code 属性。你可以在 Prisma [错误信息指南](https://www.prisma.io/docs/orm/reference/error-reference#prisma-client-query-engine)中找到这个错误码列表。

你要查找的错误码是 P2002，它是因为违反了唯一约束而产生的。现在你需要更新 catch 方法，以确保在出现此种错误的时候抛出 HTTP 409 Confict 这个响应。另外你也需要为用户提供一个自定义的错误信息。

```ts
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'
import { Response } from 'express'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message)
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const message = exception.message.replace(/\n/g, '')

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT
        response.status(status).json({
          statusCode: status,
          message: message,
        })
        break
      }
      default:
        // default 500 error code
        super.catch(exception, host)
        break
    }
  }
}
```

## 将异常过滤器应用到程序中

现在，对于 PrismaClientExceptionFilter 来说要想发挥错用，你需要将其应用到合适的作用域中。异常过滤器作用域可以被限定为单个路由（方法作用域），整个控制器（控制器作用域）或整个应用程序（全局作用域）。

方法一：

可以通过更新 main.ts 文件将异常过滤器应用到整个应用中：

```ts
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { PrismaExceptionFilter } from './core/prisma-client-exception/prisma-client-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter))

  await app.listen(3000)
}
bootstrap()
```

方法二：

你也可以将异常过滤器注入控制器中，如下所示：

```ts
import { PrismaExceptionFilter } from './core/prisma-client-exception/prisma-client-exception.filter'
@Module({
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: PrismaExceptionFilter }],
})
export class AppModule {}
```

## 使用 nestjs-prisma 包来处理 Prisma 异常

在 [nestjs-prisma 文档](https://nestjs-prisma.dev/docs/exception-filter/) 中可以查看这个包的安装和使用说明。

[本章来源](https://juejin.cn/post/7236182358818406459)
