---
title: '初学 prisma'
description: 'prisma 的简单操作'
pubDate: '2024-07-04 13:34:00'
category: 'base'
cardImage: '@images/base/prisma.png'
tags: ['base', 'prisma', 'mysql']
selected: true
---

## 项目初始化

```bash
mkdir prisma-test
cd prisma-test
npm init -y
```

安装 TypeScript 相关的包，包括 TypeScript 编译器、ts-node 和 Node.js API 的类型说明

```bash
pnpm install typescript ts-node @types/node -D
```

创建 tsconfig.json

```bash
npx tsc --init
```

安装 prisma

```bash
pnpm install prisma
```

## 编写代码

### 编写 Schema

使用以下命令生成 schema 文件

```bash
npx prisma init --datasource-provider mysql
```

运行该命令后，项目会多两个文件 prisma 和 .env

- **schema.prisma**：Prisma 的核心文件之一，包括数据库的模型定义，这些模型是数据库的表示，用于定义表的结构、关系以及其他 Prisma 客户端 API 需要的配置文件

- **.env**：环境变量文件，用于存储数据库连接信息等敏感信息，避免直接在代码中硬编码这些信息

### 配置数据库连接信息

在 .env 文件中配置数据库连接信息

```bash
DATABASE_URL = 'mysql://{username}:{password}@localhost:3306/{database_name}'
```

修改为

```bash
DATABASE_URL="mysql://root:123456@localhost:3306/prisma-test"
```

### 定义 Model

在 prisma/schema.prisma 文件中定义数据模型(modle)，例如：

```typescript
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String
  published Boolean @default(false)
  authorId  Int
  author    User    @relation(fields: [authorId], references: [id])
}
```

### 生成 Prsima Client 代码

```bash
npx prisma migrate dev
```

也可以通过 **npx prisma migrate dev --name test** 指定名字

Prisma Migrate 为 Prisma 架构中的声明性数据模型定义生成 SQL 迁移文件。

运行该命令后会在 prisma 文件夹下生成一些文件，其中包括 .sql文件，并且在数据库中也生成了对应的表

如果修改了表里面的数据或者添加了，都需要先执行以下这个命令

### 编写应用代码

在 src 文件夹下创建一个 index.ts 文件，编写应用代码，例如：

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createUser() {
  await prisma.user.create({
    data: {
      name: 'alice',
      email: 'alice@gmail.com',
    },
  }),
    await prisma.user.create({
      data: {
        name: 'nicole',
        email: 'nicole@gmail.com',
      },
    })

  const users = prisma.user.findMany()
  console.log(users)
}

createUser()
```

运行 typescript 代码

```bash
npx ts-node ./src/index.ts
```

可以看到 prisma-test 数据库里面的 user 表中生成了两条记录
![](@images/base/prisma/image.png)

### CURD 全流程

给 post 添加点数据，编写应用代码，例如：

```typescript
async function createPost() {
  const user = await prisma.user.create({
    data: {
      name: 'bob',
      email: 'bob@gmail.com',
      posts: {
        create: [
          {
            title: 'post 1',
            content: 'content 1',
          },
          {
            title: 'post 2',
            content: 'content 2',
          },
        ],
      },
    },
  })
  console.log(user)
}
```

可以看到数据库的 post表中多了两条记录

![](@images/base/prisma/image2.jpg)

同时 user 表中也多了一条信息

给 PrismaClient 配置一些信息，例如：

```typescript
const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query', // 设置日志级别为查询（query），这样只有查询语句会被记录
    },
  ],
})
```

更新一下 post 表中的数据，例如：

```typescript
async function updatePost() {
  await prisma.post.update({
    where: {
      id: 2,
    },
    data: {
      content: '修改',
    },
  })
}
```

可以在控制台看到打印的日志

![](@images/base/prisma/image3.png)

同时 post 表中的内容也改变了

删除 post 表中的 id 为 1 的数据，例如：

```typescript
async function deletePostById() {
  await prisma.post.delete({
    where: { id: 1 },
  })
}
```

删除成功

## prisma seed
