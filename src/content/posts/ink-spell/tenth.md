---
title: 'prisma seed'
description: 'prisma seed示例'
pubDate: '2024-07-25 12:55:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/tenth.jpg'
tags: ['ink-spell', 'prisma', 'seed']
selected: false
---

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
  boofShlefs BookShelf[]
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
 "prisma:need": "pnpm set:env -- ts-node ./prisma/seed/user.ts"
```

然后运行 `npm run prisma:seed` 就可以了

这时候发现数据库已经有数据了。

[详情请见官网](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding)
