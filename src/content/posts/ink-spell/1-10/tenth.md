---
title: 'prisma seed'
description: 'prisma seed 示例与多文件 Prisma 架构'
pubDate: '2024-07-25 12:55:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/1-10/tenth.jpg'
tags: ['ink-spell', 'prisma', 'seed']
selected: false
---

## Prisma 连接数据库

基于在 prisma 已经安装完成，并且可以连接数据库

schema.prisma 文件如下：

```ts
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id         Int         @id @default(autoincrement())
  username   String      @unique
  account    String      @unique
  password   String
  sex        String      @default("女")
  email      String?
  avatar     String
}
```

新建一个文件,prisma/seed/user.ts,内容如下：

```ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function seed() {
  await prisma.user.upsert({
    where: { username: 'nicole' },
    update: {},
    create: {
      username: 'nicole',
      account: 'nicole',
      password: '123456',
      avatar: '/static/images/avatar.png',
    },
  })
  process.stdout.write('Seed your database successfully!\n')
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit()
  })
```

> 注意：seed 文件可以放在任意地方

然后在 package.json 中添加如下内容：

```json
"prisma": {
  "seed": "ts-node prisma/seed/user.ts"
}
```

如果环境变量没有存储在.env，而是存储在类似其他.env.local这样的文件中，就会发现，他找不到 **"DATABASE_URL"**，
所以需要安装

```bash
npm install dotenv
```

然后在 package.json 中添加如下内容：

```ts
 "set:env": "dotenv -e .env.local -e .env.example",
 "prisma:seed": "pnpm set:env -- ts-node ./prisma/seed/user.ts"
```

然后运行 `npm run prisma:seed` 就可以了

这时候发现数据库已经有数据了。

[详情请见官网](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding)

## 多文件 Prisma 架构

如何启用多文件 Prisma 架构支持

要使用多个 Prisma 架构文件，请在当前 prisma 目录中添加 schema 文件夹。启用 prismaSchemaFolder 预览功能后，您可以将任意数量的文件添加到 prisma/schema 目录中。

```txt
my-app/
├─ ...
├─ prisma/
│ ├─ schema/
│ │ ├─ post.prisma
│ │ ├─ schema.prisma
│ │ ├─ user.prisma
├─ ...

```

将prismaSchemaFolder 功能标志添加到 Prisma 架构中 generator 块的 previewFeatures 字段中：

```ts
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["prismaSchemaFolder"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

有一个明显的“主”架构文件：虽然您现在可以拥有任意数量的架构文件，但您仍然需要一个定义 datasource 和 generator 块的位置。我们建议使用一个显然是“主”文件的模式文件，以便可以轻松找到这些块。 **main.prisma** 、 **schema.prisma** 和 **base.prisma** 效果很好的几个。

[详情请见官网](https://www.prisma.io/docs/orm/prisma-schema/overview/location#learn-more-about-the-prismaschemafolder-preview-feature)
