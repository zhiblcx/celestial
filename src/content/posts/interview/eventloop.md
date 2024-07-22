---
title: '事件循环'
description: '理解事件循环'
pubDate: '2024-07-22 23:40:00'
category: 'interview'
cardImage: '@images/interview/eventloop.jpg'
tags: ['interview', 'javascript', 'eventloop']
selected: true
---

1. js 是单线程，防止代码阻塞，把代码分为同步和异步
2. 同步代码给 js 引擎，异步代码给宿主环境
3. 同步代码放入执行栈中，异步代码等待时机成熟送入任务队列排队
4. 执行栈执行完毕，会去任务队列看是否有异步任务，有就送到执行栈执行，反复循环查找执行，这个过程就是事件循环(eventloop)
