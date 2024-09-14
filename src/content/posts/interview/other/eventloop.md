---
title: '事件循环'
description: '理解事件循环'
pubDate: '2024-07-22 23:40:00'
category: 'interview'
cardImage: '@images/interview/main/eventloop.jpg'
tags: ['interview', 'javascript', 'eventloop']
selected: true
---

## 事件循环 eventloop

1. js 是单线程，防止代码阻塞，把代码分为同步和异步
2. 同步代码给 js 引擎，异步代码给宿主环境
3. 同步代码放入执行栈中，异步代码等待时机成熟送入任务队列排队
4. 执行栈执行完毕，会去任务队列看是否有异步任务，有就送到执行栈执行，反复循环查找执行，这个过程就是事件循环(eventloop)

![''](https://s19.aconvert.com/convert/p3r68-cdx67/bthyl-asvo9.gif)

## 事件循环 宏任务和微任务

js 把异步任务分为**宏任务**和**微任务**

1. 宏任务是由宿主（浏览器、Node）发起的任务

   - script

   - 事件

   - 网络请求(Ajax/Fetch)

   - setTimeout()/setInterval()

2. 微任务 js 引擎发起的任务
   - promise

## 事件循环 执行顺序

1. 执行栈执行完毕，去任务队列查看是否有任务
2. 先执行微任务，再执行宏任务
3. 微任务执行完毕之后，再去看微任务队列是否有任务。
4. 微任务全部执行完毕之后，去看宏任务队列是否有任务，有则推入执行栈
5. 重复执行步骤 3 和 4，反复循环查找执行，这个过程就是事件循环(eventloop)

> Promise 本身同步，then/catch的回调函数是异步的

[练习事件循环的网站](https://www.jsv9000.app/)

![](https://s5.aconvert.com/convert/p3r68-cdx67/7lryz-9pfac.gif)

练习题:

```js
setTimeout(() => {
  console.log(1)
}, 0)

new Promise((resolve, reject) => {
  console.log(2)
  resolve('p1')

  new Promise((resolve, reject) => {
    console.log(3)

    setTimeout(() => {
      resolve('setTimeout2')
      console.log(4)
    }, 0)

    resolve('p2')
  }).then((data) => {
    console.log(data)
  })

  setTimeout(() => {
    resolve('setTimeout1')
    console.log(5)
  }, 0)
}).then((data) => {
  cosnole.log(data)
})
console.log(6)
```

执行结果：
2
3
6
p2
p1
1
4
5
