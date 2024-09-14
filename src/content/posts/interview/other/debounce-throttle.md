---
title: '防抖和节流'
description: '深入理解防抖和节流'
pubDate: '2024-07-08 11:35:00'
category: 'interview'
cardImage: '@images/interview/main/debounce-throttle.jpg'
tags: ['interview', 'javascript', 'debounce', 'throttle']
selected: true
---

## 防抖 (debounce)

概念：单位时间内，频繁触发事件，只执行最后一次

典型场景：搜索框搜索输入

示例代码：

> 不利用[闭包](https://celestial-virid.vercel.app/posts/interview/closure/)实现

```javascript
const search = document.getElementById('search')
let timer = null
search.oninput = function () {
  if (timer != null) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    console.log(search.value)
  }, 2000)
}
```

> 利用闭包实现

```javascript
const search = document.getElementById('search')

search.oninput = debounce(() => {
  console.log(search.value)
}, 2000)

function debounce(fn, delay) {
  let timer = null
  return () => {
    if (timer != null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}
```

代码思想：利用定时器，每次触发先清掉以前的定时器

## 节流 (throttle)

概念：单位时间内，频繁触发事件，只执行一次

典型场景：快速点击按钮

示例代码：

> 不利用闭包实现

```javascript
const certain = document.getElementById('certain')
let flag = false
certain.onclick = function () {
  if (flag) {
    return
  }
  flag = true
  setTimeout(() => {
    console.log('确定了')
    flag = false
  }, 2000)
}
```

> 利用闭包实现

```javascript
const certain = document.getElementById('certain')

certain.onclick = throttle(() => {
  console.log('确定了')
}, 2000)

function throttle(fn, delay) {
  let flag = false
  return () => {
    if (flag) {
      return
    }
    flag = true
    setTimeout(() => {
      fn()
      flag = false
    }, delay)
  }
}
```

代码思想：利用定时器，等定时器执行完毕，才开启定时器
