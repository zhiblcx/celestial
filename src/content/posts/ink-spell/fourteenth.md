---
title: '启动默认只能访问localhost解决方法'
description: '启动默认只能访问localhost解决方法'
pubDate: '2024-07-31 10:11:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/fourteenth.jpg'
tags: ['ink-spell']
selected: false
---

在 **package.json** 文件下 增加 **--force --host** 如下所示

```json
 "scripts": {
    "dev": "vite --force --host",
  },
```
