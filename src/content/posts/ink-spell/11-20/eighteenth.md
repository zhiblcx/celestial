---
title: 'vscode 拼写错误'
description: '解决 vscode 里插件 Code Spell Checker 拼写错误'
pubDate: '2024-08-19 08:56:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/11-20/eighteenth.jpg'
tags: ['ink-spell', 'Code Spell Checker']
selected: false
---

在 vscode 写代码的时候，遇到如下情况

![''](@images/ink-spell/eighteenth/image.png)

这对有强迫症的人来说简直就是噩梦，所以必须要解决一下

## 原因

经过查找发现是 Vscode 里面的 Code Spell Checker 插件提示 **tailwindcss** Unknown word，所以针对 Code Spell Checker 插件做出相对应的解决

## 解决方法

在根目录下创建一个 **cspell.json** 文件，这个会覆盖默认的配置

文件内容如下：

```ts
{
  "version": "0.2",
  "language": "en",
  "words": [
    "tailwindcss"
  ]
}
```

这样就发现这个蓝色的波浪线就消失了
