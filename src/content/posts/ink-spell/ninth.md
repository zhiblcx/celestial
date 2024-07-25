---
title: 'nest.js 静态服务'
description: 'nest.js 读取静态资源'
pubDate: '2024-07-25 12:37:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/ninth.jpg'
tags: ['ink-spell', 'static']
selected: false
---

## 安装

安装所需要的包

```bash
pnpm install --save @nestjs/serve-static
```

## 引导程序

安装过程完成后，我们可以将其导入 **ServeStaticModule** 根目录 **AppModule** 并通过将配置对象传递给forRoot()方法对其进行配置。

```ts
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

console.log(__dirname)
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
      serveRoot: '/images', //此处要添加/，相当于访问的前缀
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

![](@images/ink-spell/ninth/image.png)
