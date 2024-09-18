---
title: '浏览器滚动条样式'
description: '浏览器滚动条样式修改'
pubDate: '2024-07-18 12:06:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/second.png'
tags: ['ink-spell', 'scroll']
selected: false
---

## 滚动条样式修改

```scss
// 整个滚动条
.height::-webkit-scrollbar {
  width: 7px;
  background-color: #fff;
}

[data-theme='dark'] .height::-webkit-scrollbar {
  background: #000;
}

// 可拖动的滚动条手柄
.height::-webkit-scrollbar-thumb {
  background-color: #a5a5a5;
  border-radius: 5px;
}

[data-theme='dark'] .height::-webkit-slider-thumb {
  background-color: #ebebeb;
}
```

## 补充

**::-webkit-scrollbar:horizontal{}** — 水平滚动条。

**::-webkit-scrollbar:vertical{}** — 垂直滚动条。

[更多样式](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar)
