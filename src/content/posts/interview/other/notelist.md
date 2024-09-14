---
title: '笔记列表'
description: '用原生 js 写一个笔记列表'
pubDate: '2024-09-03 22:39:00'
category: 'interview'
cardImage: '@images/interview/main/notelist.jpg'
tags: ['interview', 'javascript', 'ajax', 'http']
selected: true
---

笔试题目：写一个笔记列表页面（列表展示10个笔记，假设id 1-10），每个笔记信息通过 /api/note/{id}获取详细信息, 点击一个"刷新"按钮可以重新获取笔记信息，并按笔记最后更改时间倒序排列。

## 难点

1. XMLHttpRequest 的使用
2. http 请求

> 这里主要是不怎么知道怎么写原生的，加上对 XMLHttpRequest 和 http 的理解不够深入，导致做起来比较困难。

## XMLHttpRequest

### 基本步骤

1. 创建一个 ajax 对象
2. 配置链接信息
3. 发送请求
4. 监听请求状态变化

```javascript
// 创建一个 ajax 对象
const xhr = new XMLHttpRequest()

// xhr.open("请求方式","请求地址","是否异步") true 表示异步
xhr.open('get', '')

// 发送请求
xhr.send()

// 监听请求状态变化
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const result = JSON.parse(xhr.responseText)
    console.log(result)
  }
}
```

### ajax 状态码

- **readyState === 0**：表示未初始化完成，也就是 **open** 方法还没有执行
- **readyState === 1**：表示配置信息已经完成，也就是执行完 **open** 之后
- **readyState === 2**：表示 **send** 方法已经执行完成
- **readyState === 3**：表示正在解析响应内容
- **readyState === 4**：表示响应内容已经解析完毕，可以在客服端使用了

```javascript
// 1. 创建一个ajax 对象
const xhr = new XMLHttpRequest()

// 2. 配置链接信息
xhr.open('get', 'http://127.0.0.1:8080/api/note/1')

// 3. 发送请求
xhr.send()

// 4. 监听请求状态变化
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const result = JSON.parse(xhr.responseText)
    console.log(result)
  }
}
```

## http

### 基本步骤

1. 导入 http 模块
2. 创建 web 服务器实例
3. 为服务器实例绑定 request 事件，监听客户端的请求。
4. 启动服务器

```javascript
const http = require('http')

// 创建 web 服务器实例
const server = http.createServer()

// 为服务器实例绑定 request 事件，监听客户端的请求。
server.on('request', (req, res) => {
  // req 是请求对象，包含了与客户端相关的数据和属性，例如请求的 url
  // res 是响应对象，包含了与服务器相关的数据和属性，例如向客户端发送响应数据
  const url = req.url
  const method = req.method
  // 向服务器发送指定内容
  res.end()
})

// 启动服务器
server.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})
```

### 解决中文乱码问题

```javascript
res.setHeader('Content-Type', 'text/html; charset=utf-8')
```

### 解决同源问题

```javascript
res.setHeader('Access-Control-Allow-Origin', '*') // 允许所有源
```

## 完整代码

```javascript
// 前端
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <ul id="notes"></ul>
    <button id="refresh">刷新</button>
    <div id="detail"></div>
  </body>
  <script>
    // 创建异步对象
    const ajax = new XMLHttpRequest()
    const ajax2 = new XMLHttpRequest()
    const notes = document.getElementById('notes')
    const refresh = document.getElementById('refresh')
    const noteData = []
    for (let i = 0; i < 10; i++) {
      const note = `这是第${i + 1}条笔记`
      const modify = new Date().valueOf()
      noteData.push({ note, modify, id: i + 1 })
      const noteElement = document.createElement('li')
      noteElement.innerText = note
      noteElement.setAttribute('id', i + 1)
      notes.appendChild(noteElement)
    }

    notes.addEventListener('click', e => {
      // 获取 id 属性
      const currentNote = e.target.getAttribute('id')
      ajax.open('get', `http://localhost:3000/api/note/${currentNote}`)
      ajax.send()
      // 注册事件
      ajax.onreadystatechange = () => {
        if (ajax.readyState === 4 && ajax.status === 200) {
          const data = JSON.parse(ajax.responseText)
          const detailElement = document.getElementById('detail')
          const detailElementChild = `<div>笔记详情：${data.content}</div> <input type="text" id="note" /> <button id="modify">修改</button>`
          detailElement.innerHTML = detailElementChild
          const note = document.getElementById('note')
          const modify = document.getElementById('modify')
          modify.addEventListener('click', () => {
            if (note.value.trim() === '') {
              window.alert('请输入内容哦~')
            } else {
              ajax2.open('post', `http://localhost:3000/api/note/${currentNote}`)
              ajax2.send(JSON.stringify({ content: note.value }))
              ajax2.onreadystatechange = () => {
                if (ajax.readyState === 4 && ajax.status === 200) {
                  const data = JSON.parse(ajax.responseText)
                  noteData[data.id - 1].modify = new Date().valueOf()
                }
              }
            }
          })
        }
      }
    })

    refresh.addEventListener('click', () => {
      noteData.sort((a, b) => b.modify - a.modify)
      notes.innerHTML = ''
      for (let i = 0; i < 10; i++) {
        const note = noteData[i]
        const noteElement = document.createElement('li')
        noteElement.innerText = note.note
        noteElement.setAttribute('id', note.id)
        notes.appendChild(noteElement)
      }
    })
  </script>
</html>

```

```javascript
// 后端
const http = require('http')
const server = http.createServer()
const notes = []
for (let i = 0; i < 10; i++) {
  const note = `这是第${i + 1}条笔记内容`
  notes.push(note)
}

server.on('request', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // 允许所有源
  res.setHeader(`Content-Type`, `text/html; charset=utf-8`)
  const regex = /\/api\/note\/(\d+)/
  const getNoteContent = req.url.match(regex)
  if (getNoteContent) {
    if (getNoteContent[1] <= 10 && getNoteContent[1] >= 1) {
      if (req.method === 'GET') {
        res.end(
          JSON.stringify({
            id: getNoteContent[1],
            content: notes[getNoteContent[1] - 1],
          })
        )
      } else if (req.method === 'POST') {
        // 获取数据
        req.on('data', (chunk) => {
          const data = JSON.parse(chunk.toString())
          notes[getNoteContent[1] - 1] = data.content
          res.end(
            JSON.stringify({
              id: getNoteContent[1],
              content: data.content,
            })
          )
        })
      }
    }
  }
})

server.listen(3000)
```
