---
title: '文件下载'
description: 'nest传给前端文件，前端接收文件下载 '
pubDate: '2024-09-06 18:13:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/21-30/twentyOne.jpg'
tags: ['ink-spell', 'download']
selected: false
---

## fs 文件系统模块

fs 模块是 Node.js 官方提供的、用来操作文件的模块。它提供了一系列的方法和属性，用来满足用户对文件的操作需求。

- fs.readFile()方法，用来读取指定文件中的内容
- fs.writeFile()方法，用来向指定的文件写入内容

### 读取指定文件中的内容

```js
fs.readFile(path[,options],callback);
```

参数解读：

- 参数1：必选参数，字符串，表示文件的路径。
- 参数2：可选参数，表示以什么编码格式来读取文件。
- 参数3：必选参数，文件读完成后，调用回调函数拿到读取的结果。

```js
const fs = require('node:fs')
fs.readFile('./files/1.txt', 'utf8', (err, result) => {
  if (err) return console.log(`文件读取失败!${err.message}`)

  console.log(`文件读取成功：内容是：${result}`)
})
```

### 向指定的文件中写入内容

```js
fs.writeFile(file,data[.options],callback);
```

参数解读：

- 参数1：必选参数，需要指定一个文件路径的字符串，表示文件的存放路径。
- 参数2：必选参数：表示要写入的内容
- 参数3：可选参数，表示以什么格式写入文件内容，默认值是utf8.
- 参数4：必选参数，文件写入完成后的回调函数。

```js
const fs = require('node:fs')
fs.writeFile('F:/files/2.txt', 'Hello Node.js', (err) => {
  if (err) return console.log(`文件写入失败!${err.message}`)

  console.log('文件写入成功')
})
```

## ink-spell NestJs 的使用

```js
  @Get('/download/:bookShelfId')
  @ApiOperation({ summary: '下载书架书籍笔记' })
  @HttpCode(HttpStatus.OK)
  async downloadBookShelf(
    @Param('bookShelfId') bookShelfId: number,
    @Res() res,
  ) {
    const data =
      await this.bookshelfService.acquireBookShelfByBookShelfId(bookShelfId);
    const filePath = appConfig.DEFAULT_NOTES_URL;
    const fileName = `${bookShelfId}.txt`;
    let content = '';
    for (let i = 0; i < data.length; i++) {
      content += `${data[i].name || '暂无书名'}\n`;
      content += `作者：${data[i].author || '暂无作者'}\n`;
      content += `主角：${data[i].protagonist || '暂无主角'}\n`;
      content += `描述：${data[i].description || '暂无描述'}\n\n`;
    }

    fs.writeFile(filePath + fileName, content, (err) => {
      if (err) {
        throw new BadRequestException('笔记下载失败，请稍后再试哦~');
      } else {
        res.download(filePath + fileName, new Date().valueOf() + '.txt');
      }
    });
  }
```

这样就把文件传给前端了，前端需要把数据转换为 Blob 进行下载

## 前端下载文件

```js
const downloadBookShelfNotesMutation = () => {
  return useMutation({
    mutationFn: (bookShelfId: number) => request.get(`/bookshelf/download/${bookShelfId}`),
    onSuccess: (data) => {
      const fileName = data.headers['content-disposition'].split('"')[1]
      // 生成一个 url,用来引入该 Blob 对象
      const url = window.URL.createObjectURL(new Blob([data.data]))
      const a = document.createElement('a')
      a.href = url
      // 下载的文件名
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    }
  })
}
```
