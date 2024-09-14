---
title: '闭包'
description: '深入理解闭包'
pubDate: '2024-07-07 22:32:00'
category: 'interview'
cardImage: '@images/interview/main/closure.png'
tags: ['interview', 'javascript', 'closure']
selected: true
---

## 闭包是什么

MDN 官网对于闭包这一概念的定义

> 闭包（closure）是一个函数以及其捆绑的周边环境状态（lexical environment，词法环境）的引用的组合。换而言之，闭包让开发者可以从内部函数访问外部函数的作用域。在 JavaScript 中，闭包会随着函数的创建而被同时创建。——MDN官网[(相关链接)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

简单来说，闭包是可访问到上一层函数里的作用域变量的函数，即便上一层函数已经关闭。

## 闭包的特性

- 函数嵌套函数
- 函数内部可以引用外部的变量
- 变量不会被垃圾回收机制回收

## 内存泄漏

内存中无法触达但垃圾回收无法回收的内存空间，会造成内存泄漏。

## 消除闭包(解决内存泄漏)

不用的时候解除引用，避免不必要的内存占用

取消 **closure** 对外部成员变量的引用，就可以回收相应的内存空间

```javascript
function fun() {
  let court = 1
  return function closure() {
    console.log(court++)
  }
}

let fn = fun()
fn()
fn()
fn()
fn = null
```

## 总结

闭包的作用：

- 延伸了变量的作用范围
- 隐藏变量，避免全局污染

闭包的缺点：

- 因为垃圾回收机制的存在，会导致出现不必要的性能消耗
- 不恰当的使用会出现内存泄漏
