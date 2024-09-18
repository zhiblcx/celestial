---
title: 'prisma 不能读取 .env.local'
description: 'prisma不能读取除了.env以外的环境配置'
pubDate: '2024-07-24 23:30:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/eighth.jpg'
tags: ['ink-spell', 'prisma']
selected: false
---

## 原因

当执行 **npx prisma migrate dev** 时，在加载 **.env.local** 之前不会执行其他代码

## 解决

```bash
pnpm add dotenv-cli
```

在执行 **npx prisma migrate dev** 执行 **dotenv-cli**，以便文中的环境变量已经改变

```json
  "scripts": {
    "set:env": "dotenv -e .env.local -e .env",
    "prisma:migrate:dev": "pnpm set:env -- prisma migrate dev"
  }
```
