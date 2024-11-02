---
title: 'nest 国际化'
description: 'nest-i18n 实现后端国际化'
pubDate: '2024-10-25 16:49:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/twentySeven.png'
tags: ['ink-spell', 'download']
selected: false
---

## 前言

如果你的网站需要支持多种语言访问，那么就需要实现国际化功能

这样，中文用户访问的时候看到的是中文界面，英文访问时看到的是英文界面

不仅前端需要国际化，后端也需要国际化，否则，当英文用户用英文界面登录的时候，突然遇到一个 “用户不存在” 的错误提示，会感到非常困惑

## 安装

安装 nestjs-i18n 包

```bash
pnpm install nestjs-i18n
```

## 配置 i18nModule

在 AppModule 中引入 i18nModule：

```typescript
import { Module } from '@nestjs/common'
import { I18nModule, QueryResolver } from 'nestjs-i18n'
import { AppController } from './app.controller'
import * as path from 'node:path'

@Module({
  imports: [
    I18nModule.forRoot({
      // 设置默认语言为中文
      fallbackLanguage: 'Chinese',
      // 加载器选项
      loaderOptions: {
        // 指定国际化路径
        path: path.join(__dirname, '/i18n/'),
        // 监听文件变化
        watch: true,
      },
      // 配置解析器，支持通过查询参数 'lang' 或 'l' 来指定语言
      resolvers: [new QueryResolver(['lang', 'l'])],
      // 输出翻译生成的类型
      typesOutputPath: path.join(
        __dirname,
        '../src/generated/i18n.generated.ts'
      ),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
```

## 添加国际化资源包

在 src 目录创建 i18n 目录，然后创建语言资源文件：
i18n/Chinese/test.json

```json
{
  "hello": "你好世界"
}
```

i18n/English/test.json

```json
{
  "hello": "Hello World"
}
```

在构建过程中,i18n文件夹不会自动复制到您的 dist 文件夹中。要使 nestjs 能够执行此操作，请修改 nest-cli.json 中的 compilerOptions。

```json
"assets": [
      { "include": "i18n/**/*", "watchAssets": true }
    ]
```

使用 monorepo 结构时不要忘记设置 outDir

```json
    "outDir": "dist/src"
```

![''](@images/ink-spell/twentySeven/image.png)

## 进行翻译

app.controller.ts 文件修改成如下所示

```ts
import { Controller, Get } from '@nestjs/common'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { I18nTranslations } from './generated/i18n.generated'

export type SupportedLang = 'English' | 'Chinese'
export const defaultLang: SupportedLang = 'Chinese'

@Controller()
export class AppController {
  constructor(private readonly i18n: I18nService<I18nTranslations>) {}
  @Get()
  getHello(): string {
    return this.i18n.t('test.hello', {
      lang: I18nContext.current()?.lang || defaultLang,
    })
  }
}
```

I18nService 从资源文件中获取 test.hello 的值，使用当前语言。

## 运行项目

```bash
pnpm run start:dev
```

![''](@images/ink-spell/twentySeven/image2.png)
![''](@images/ink-spell/twentySeven/image3.png)

发现这样写过于复杂，岂不是每次都要这样写，并且还要导入类型，非常繁琐

```ts
this.i18n.t('test.hello', {
  lang: I18nContext.current()?.lang || defaultLang,
})
```

有没有什么更好的办法让他变成以下这种写法呢，并且也不用导入类型呢？

```ts
this.i18n.translation.t('test.hello')
```

## 简化国际化调用

在 src 文件下创建 translation 文件夹

```text
src
  ├── translation.module.ts
  └── translation.service.ts
```

也可以用命令行生成

```bash
nest g resource translation
```

修改 translation.service.ts 文件

```typescript
import { Injectable } from '@nestjs/common'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { I18nPath, I18nTranslations } from 'src/generated/i18n.generated'

export type SupportedLang = 'English' | 'Chinese'
export const defaultLang: SupportedLang = 'English'

@Injectable()
export class TranslationService {
  constructor(private readonly I18n: I18nService<I18nTranslations>) {}

  t(key: I18nPath, options?: Record<string, unknown>): string {
    return this.I18n.t(key, {
      lang: this.lang(),
      ...options,
    })
  }

  lang(): SupportedLang {
    return (I18nContext.current()?.lang || defaultLang) as SupportedLang
  }
}
```

现在去修改 app.controller.ts 文件

```typescript
import { Controller, Get } from '@nestjs/common'
import { TranslationService } from './translation/translation.service'

@Controller()
export class AppController {
  constructor(private readonly translation: TranslationService) {}
  @Get()
  getHello(): string {
    return this.translation.t('test.hello')
  }
}
```

是不是一目了然了呢？

## 在 DTO 中使用国际化

由于 DTO 不在 Ioc 容器中，无法直接注入 I18nService。可以使用 I18nValidationPipe 来实现国际化验证消息。
安装验证相关的包

```bash
pnpm install class-validator class-transformer
```

### 添加验证资源包

Chinese/test.json

```json
{
  "hello": "你好世界",
  "account_not_empty": "账号不能为空",
  "password_not_empty": "密码不能为空",
  "password_must_be_length_characters_long": "`密码长度为 {length} 位`"
}
```

English/test.json：

```json
{
  "hello": "Hello World",
  "account_not_empty": "account cannot be empty",
  "password_not_empty": "password cannot be empty",
  "password_must_be_length_characters_long": "password must be {length} characters long"
}
```

### 添加 DTO 文件

创建一个 TestDto.ts 文件，内容如下

```ts
import { IsNotEmpty, Length } from 'class-validator'
import { i18nValidationMessage as t } from 'nestjs-i18n'
import { I18nTranslations } from './generated/i18n.generated'

type I18n = I18nTranslations

export class TestDto {
  @IsNotEmpty({
    message: t<I18n>('test.account_not_empty'),
  })
  account: string

  @IsNotEmpty({
    message: t<I18n>('test.password_not_empty'),
  })
  @Length(6, 16, {
    message: t<I18n>('test.password_must_be_length_characters_long', {
      length: '6-16',
    }),
  })
  password: string
}
```

修改 app.controller.ts 文件

```ts
import { Body, Controller, Post } from '@nestjs/common'
import { TestDto } from './test.dto'
import { TranslationService } from './translation/translation.service'

@Controller()
export class AppController {
  constructor(private readonly translation: TranslationService) {}
  @Post()
  getHello(@Body() test: TestDto): string {
    console.log(test)
    return this.translation.t('test.hello')
  }
}
```

这时候需要给项目全局添加 **I18nValidationPipe** 和 **I18nValidationExceptionFilter**

### 全局启用 I18nValidationPipe 和 I18nValidationExceptionFilter

在 main.ts 中配置：

```ts
// 使用全局验证管道，进行国际化验证
app.useGlobalPipes(new I18nValidationPipe())
// 使用全局异常过滤器，处理国际化验证异常
app.useGlobalFilters(new I18nValidationExceptionFilter())
```

通过 **apiFox软件** 去检查是否成功

![''](@images/ink-spell/twentySeven/image4.png)

如果不想要详细的错误信息，可以进行如下修改

```ts
app.useGlobalFilters(
  new I18nValidationExceptionFilter({
    detailedErrors: false, // 设置是否显示详细错误信息
  })
)
```

![''](@images/ink-spell/twentySeven/image5.png)

通过传递 **query(lang=English)** 显示英文的错误

![''](@images/ink-spell/twentySeven/image6.png)

通过这些配置，Nest 项目可以灵活支持多种语言，满足国际化需求。

> 如果按照如上流程没有出现这些错误信息，可能是 _ValidationPipe_ 作为一个全局管道了，把这个删掉就可以了

## 参考文献

[Nest 实现国际化](https://zhuanlan.zhihu.com/p/703187083)

[nestjs-i18n 官网](https://nestjs-i18n.com/quick-start)
