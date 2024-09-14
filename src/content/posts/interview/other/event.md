---
title: '事件冒泡，事件委托，事件捕获'
description: '事件冒泡，事件委托，事件捕获'
pubDate: '2024-08-06 12:14:00'
category: 'interview'
cardImage: '@images/interview/main/event.jpg'
tags: ['interview', 'javascript', 'event']
selected: true
---

## 事件冒泡

- 事件冒泡阶段从事件触发的元素开始，逐级向上直到根节点

## 事件捕获

- 事件捕获阶段从根节点开始，逐级向下直到触发事件的元素

## 事件委托

- 事件委托是一种利用事件冒泡原理，将事件监听器添加到父元素上，通过事件冒泡机制来处理子元素的事件

如何实现事件委托

- 在父元素上添加事件监听器，通过事件对象中的 `target` 属性来判断事件触发的元素，然后执行相应的处理函数

## 如何阻止事件传播

- 使用 `event.stopPropagation()` 方法可以阻止事件冒泡和事件捕获
