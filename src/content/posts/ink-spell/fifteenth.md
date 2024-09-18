---
title: '压缩图片'
description: '通过 upng-js 压缩 .png 的图片'
pubDate: '2024-08-09 20:38:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/fifteenth.jpg'
tags: ['ink-spell', 'upng-js']
selected: false
---

为了减少存储空间的占用，提高数据传输速度，这里采用了压缩图片，因为 png 图片动不动就是几百kb，所以主要是对 png 图片进行了压缩。

使用 **upng-js** 来进行压缩

```bash
pnpm add upng-js
```

安装完毕后，在前端进行压缩，代码如下：

```ts
import UPNG from 'upng-js'
function compressPNG(file: File, quality = 0.2) {
  return new Promise(async (resolve) => {
    const arrayBuffer = await file.arrayBuffer()
    const decoded = UPNG.decode(arrayBuffer)
    const rgba8 = UPNG.toRGBA8(decoded)
    // 关键的压缩方法
    // 这里 保持宽高不变，保持80%的质量（接近于 tinypng 的压缩效果）
    const compressed = UPNG.encode(
      rgba8,
      decoded.width,
      decoded.height,
      256 * quality
    )
    resolve(new File([compressed], file.name, { type: 'image/png' }))
  })
}
```

这里用的是 antd 里面的 upload 上传

```ts
    beforeUpload: async (file) => {
      return new Promise(async (resolve, reject) => {
        const image = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'
        if (!image) {
          reject()
        }
        if (file.type === 'image/png') {
          resolve((await PhotoUtils.compressPNG(file)) as RcFile)
        }
      })
    },
```
