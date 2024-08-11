---
title: '阅读书籍'
description: '解决阅读书籍问题'
pubDate: '2024-07-21 22:33:00'
updateDate: '2024-08-11 20:31:00'
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

通过正则表达式去获取书籍的目录，然后没有匹配到的就属于内容，放到内容的数组中。

```ts
// 检测文件的编码
export function detectFileEncoding(filePath) {
  const buffer = fs.readFileSync(filePath)
  const result = jschardet.detect(buffer)
  return result.encoding
}

// 读取文件内容
export function readFileContent(path, detectedEncoding) {
  const filePath = process.cwd() + path
  const fileStream = fs.createReadStream(filePath)
  const rl = readline.createInterface({
    input: fileStream.pipe(iconv.decodeStream(detectedEncoding)),
    crlfDelay: Number.POSITIVE_INFINITY,
  })
  const chapterPattern =
    /^(.{0,5}第\s*[一二三四五六七八九十零\d]+\s*章|[\d]+[.|、]\s*第\s*[一二三四五六七八九十零\d]+\s*章)\s*(.{0,10})$/

  const chapter = ['简介']
  const content = [[]]
  let currentChapterIndex = 0 // 当前章节的下标

  return new Promise((resolve) => {
    rl.on('line', (line) => {
      const chapterMatch = line.match(chapterPattern)
      if (chapterMatch) {
        const chapterTitle = chapterMatch[0]
        chapter.push(chapterTitle)
        content.push([]) // 创建一个空数组用于存储该章节的内容
        currentChapterIndex++ // 更新当前章节的下标
      } else if (currentChapterIndex > 0) {
        content[currentChapterIndex].push(line) // 将行内容存储到对应章节的内容数组中
      } else if (currentChapterIndex === 0) {
        content[currentChapterIndex].push(line)
      }
    })

    rl.on('close', () => {
      resolve({
        chapter,
        content,
      })
    })
  })
}
```
