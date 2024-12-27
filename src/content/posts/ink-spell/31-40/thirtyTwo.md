---
title: 'vue + nest 下载文件'
description: 'vue + nest 下载文件'
pubDate: '2024-12-01 20:14:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/31-40/thirtyTwo.png'
tags: ['ink-spell']
selected: false
---

## 前言

因为后台需要去查看书籍文件，以及进行修改，想着下载文件进行修改方便，但是实现的时候，发现自己写不出来，于是记录下来，以防后期需要

## 下载方式

### open 或 location.href

最简单最直接的方式，实际上跟 **a** 标签访问下载链接一样

```js
window.open('downloadFile.zip')

location.href = 'downloadFile.zip'
```

当然地址也可以是接口api的地址，而不单纯是个链接地址。

#### 优点

- 简单方便直接

#### 缺点

- 会出现URL长度限制问题
- 需要注意url编码问题
- 浏览器可直接浏览的文件类型是不提供下载的，如txt、png、jpg、gif等
- 不能添加header，也就不能进行鉴权
- 无法知道下载的进度

### a标签的download

我们知道，**a** 标签可以访问下载文件的地址，浏览器帮助进行下载。但是对于浏览器支持直接浏览的txt、png、jpg、gif等文件，是不提供直接下载（可右击从菜单里另存为）的。

为了解决这个直接浏览不下载的问题，可以利用 **download** 属性。

**download** 属性是HTML5新增的属性，兼容性可以了解下 [can i use download](https://caniuse.com/#search=download)

总体兼容性算是很好了，基本可以区分为IE和其他浏览。但是需要注意一些信息：

- Edge 13在尝试下载data url链接时会崩溃。
- Chrome 65及以上版本只支持同源下载链接。
- Firefox只支持同源下载链接。

基于上面描述，如果你尝试下载跨域链接，那么其实 **download** 的效果就会没了，跟不设置 **download** 表现一致。即浏览器能预览的还是会预览，而不是下载。

简单用法：

```html
<a href="example.jpg" download>点击下载</a>
```

可以带上属性值，指定下载的文件名，即重命名下载文件。不设置的话默认是文件原本名。

```html
<a href="example.jpg" download="test">点击下载</a>
```

#### 优点

- 能解决不能直接下载浏览器可浏览的文件

#### 缺点

- 得已知下载文件地址
- 不能下载跨域下的浏览器可浏览的文件
- 有兼容性问题，特别是IE
- 不能进行鉴权

### 利用Blob对象（ink-spell 采取此方法）

该方法较上面的直接使用 **a** 标签 **download** 这种方法的优势在于，它除了能利用已知文件地址路径进行下载外，还能通过发送 **ajax** 请求 **api** 获取文件流进行下载。毕竟有些时候，后端不会直接提供一个下载地址给你直接访问，而是要调取api。

利用 **Blob** 对象可以将文件流转化成 **Blob** 二进制对象。该对象兼容性良好，需要注意的是

- IE10以下不支持。
- 在Safari浏览器上访问 **Blob Url** 或 **Object URL** 当前是有缺陷的，如下文中通过 **URL.createObjectURL** 生成的链接。**caniuse** 官网有指出

> Safari has a [serious issue](https://jsfiddle.net/24FhL/) with blobs that are of the type application/octet-stream

进行下载的思路很简单：发请求获取二进制数据，转化为 **Blob** 对象，利用 **URL.createObjectUrl** 生成 url 地址，赋值在 **a** 标签的 **href** 属性上，结合 **download** 进行下载。

```js
const fileName = data.headers['content-disposition'].split('"')[1]
const url = window.URL.createObjectURL(new Blob([data.data]))
const a = document.createElement('a')
a.href = url
a.download = fileName
document.body.appendChild(a)
a.click()
document.body.removeChild(a)
window.URL.revokeObjectURL(url)
```

#### 优点

- 能解决不能直接下载浏览器可浏览的文件
- 可设置header，也就可添加鉴权信息

#### 缺点

- 兼容性问题，IE10以下不可用；Safari浏览器可以留意下使用情况

## 后端实现方式

nest 是基于 **express** 之上的，所以，其文件上传和下载的功能，实际上就是 **express** 的功能。

```js
res.download(path [, filename] [, fn])
```

- path：要下在的文件所在的路径；
- filename：文件下载后的名字；
- fn：回调函数

```js
  @Get("/download/:bookID")
  @ApiOperation({ summary: '下载书籍' })
  @HttpCode(HttpStatus.OK)
  @APIResponse(null, '下载成功')
  async downloadBook(@Param('bookID') bookID: number, @Res() res,) {
    const fileName = await this.bookService.downloadBook(Number(bookID))
    const suffix = '.txt'
    res.download(appConfig.BOOK_FILE_URL + '\\' + fileName, new Date().valueOf() + suffix)
  }
```

## 参考文献

[前端下载文件的5种方法的对比(附加获取文件名](https://juejin.cn/post/6844904069958467592)

[nest入门记之「实现文件下载接口」](https://juejin.cn/post/6899370669969653773)

[nest笔记四：文件的上传与下载](https://juejin.cn/post/7076628616083144741)

[express res.download 方法](https://blog.csdn.net/change_fate/article/details/129751156)
