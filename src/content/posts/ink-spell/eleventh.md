---
title: 'vite 获取环境变量'
description: '通过 process.env 获取环境变量'
pubDate: '2024-07-27 15:30:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/eleventh.jpg'
tags: ['ink-spell', 'vite']
selected: false
---

vite.config.ts 内容如下：

```ts
import { defineConfig, loadEnv } from 'vite'
export default defineConfig(({ command, mode }) => {
  // env 就是 定义的环境变量，是一个对象
  const env = loadEnv(mode, process.cwd())
  return {
    // ...以及其他配置内容
    // 这一条可以让其他文件也可以读取环境变量
    // process.env.VITE_BASE_API_PREFIX
    define: {
      'process.env': env,
    },
  }
})
```

.env.local 内容如下

```env
# 如果没有这个会报错，对应的是上面文件的 mode
NODE_ENV=development

VITE_BASE_API_PREFIX = /api
```
