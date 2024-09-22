---
title: 'javascript系列 —— JavaScript中的数据类型以及存储上的差别'
description: '面试官：说说JavaScript中的数据类型？存储上的差别？'
pubDate: '2024-09-07 19:05:00'
category: 'interview'
cardImage: '@images/interview/javascript/main/js-event-loop.png'
tags: ['interview']
selected: true
show: false
---

## 一、是什么

首先，**JavaScript** 是一门单线程的语言，意味着同一时间内只能做一件事，但是这并不意味着单线程就是阻塞，而**实现单线程非阻塞**的方法就是**事件循环**

在 **JavaScript** 中，所有的任务都可以分为

- 同步任务：立即执行的任务，同步任务一般会直接进入到主线程中执行
- 异步任务：异步执行的任务，比如 **ajax** 网络请求，**setTimeout** 定时函数等

同步任务与异步任务的运行流程图如下：

![''](@images/interview/javascript/js-event-loop/image.png)

从上面我们可以看到，**同步任务进入主线程**，即主执行栈，**异步任务进入任务队列**，主线程内的任务执行完毕为空，会去任务队列读取对应的任务，推入主线程执行。上述过程的不断重复就事件循环

## 二、宏任务与微任务

如果将任务划分为同步任务和异步任务并不是那么的准确，举个例子：

```js
console.log(1)

setTimeout(() => {
  console.log(2)
}, 0)

new Promise((resolve, reject) => {
  console.log('new Promise')
  resolve()
}).then(() => {
  console.log('then')
})

console.log(3)
```

如果按照上面流程图来分析代码，我们会得到下面的执行步骤：

- **console.log(1)**，同步任务，主线程中执行
- **setTimeout()** ，异步任务，放到 **Event Table**，0 毫秒后 **console.log(2)** 回调推入 **Event Queue** 中
- **new Promise** ，同步任务，主线程直接执行
- **.then** ，异步任务，放到 **Event Table**
- **console.log(3)**，同步任务，主线程执行

所以按照分析，它的结果应该是 **1 => 'new Promise' => 3 => 2 => 'then'**

但是实际结果是：**1=>'new Promise'=> 3 => 'then' => 2**

出现分歧的原因在于异步任务执行顺序，事件队列其实是一个“先进先出”的数据结构，排在前面的事件会优先被主线程读取

例子中 **setTimeout** 回调事件是先进入队列中的，按理说应该先于 **.then** 中的执行，但是结果却偏偏相反

原因在于异步任务还可以细分为微任务与宏任务

### 宏任务

### 微任务

## 三、async 与 await

## 四、流程分析

[文章来源](https://vue3js.cn/interview/JavaScript/event_loop.html)
