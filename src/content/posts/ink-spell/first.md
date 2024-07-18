---
title: '增量散列文件'
description: '解决导入不重复书籍'
pubDate: '2024-07-18 09:00:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/first.jpg'
tags: ['ink-spell', 'spark-md5']
selected: true
---

## 什么是增量散列文件

增量散列文件（Incremental Hash File）是一种用于数据完整性验证和快速文件比较的技术。它基于散列函数，通过对文件内容逐步计算散列值来生成增量散列文件。

## 增量散列文件是如何生成的

1. 将文件分割成固定大小的块。
2. 对每个块计算其散列值，通常使用常见的散列算法（如MD5、SHA-1或SHA-256）。
3. 将所有块的散列值按顺序组合起来形成增量散列文件。

## 增量散列文件具有以下特点

1. 数据完整性验证：通过对文件进行散列计算，可以生成唯一的散列值用于验证文件的完整性。如果文件的内容发生改变，其散列值也会发生变化，从而可以检测到数据篡改或损坏。
2. 快速文件比较：通过比较两个文件的增量散列文件，可以快速判断它们是否相同。如果两个文件的增量散列文件完全一致，那么它们的内容也是一致的；反之，如果增量散列文件不同，那么文件内容也必然不同。

## 项目中如何使用

这里使用了 [spark-md5](https://www.npmjs.com/package/spark-md5) 来实现

```ts
document.getElementById('file').addEventListener('change', function () {
  const blobSlice =
    File.prototype.slice ||
    File.prototype.mozSlice ||
    File.prototype.webkitSlice
  const file = this.files[0]
  const chunkSize = 2097152 // Read in chunks of 2MB
  const chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0
  const spark = new SparkMD5.ArrayBuffer()
  const fileReader = new FileReader() // 这个 FileReader 是 ts 内置的一个API

  fileReader.onload = function (e) {
    console.log('read chunk nr', currentChunk + 1, 'of', chunks)
    spark.append(e.target.result) // Append array buffer
    currentChunk++

    if (currentChunk < chunks) {
      loadNext()
    } else {
      console.log('finished loading')
      console.info('computed hash', spark.end()) // Compute hash
    }
  }

  fileReader.onerror = function () {
    console.warn('oops, something went wrong.')
  }

  function loadNext() {
    const start = currentChunk * chunkSize
    const end = start + chunkSize >= file.size ? file.size : start + chunkSize

    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
  }

  loadNext()
})
```

这里会生成一个值

![''](@images/ink-spell/first/image.png)

同样内容的文件这个散列值是一样的，通过这个值，可以实现导入不重复的书籍
