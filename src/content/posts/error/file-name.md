---
title: 'File 文件名乱码'
description: '前端传给后端文件名，文件名却是乱码'
pubDate: '2024-08-03 17:04:00'
category: 'error'
cardImage: '@images/error/main/file-name.jpg'
tags: ['ink-spell', 'file', 'error']
selected: true
---

## 前端传给后端文件名，文件名却是乱码

### 后端

```js
decodeURIComponent(escape(name))
```

但是 escape 已经被弃用了，我目前没有更好的解决办法
