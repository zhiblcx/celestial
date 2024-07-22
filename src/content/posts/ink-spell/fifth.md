---
title: '阅读书籍'
description: '解决阅读书籍问题'
pubDate: '2024-07-21 22:33:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/fifth.png'
tags: ['ink-spell']
selected: false
---

## 检测文件编码

用 **jschardet** 检查文件编码

```js
const fs = require('node:fs')
const jschardet = require('jschardet')

function detectFileEncoding(filePath) {
  const buffer = fs.readFileSync(filePath)
  const result = jschardet.detect(buffer)
  return result.encoding
}

// 使用示例：
const filePath = './file/book2.txt'
const detectedEncoding = detectFileEncoding(filePath)
console.log('检测到的编码:', detectedEncoding)
```
