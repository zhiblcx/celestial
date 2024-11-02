---
title: 'react 引入静态资源'
description: 'vite + react 引入静态资源错误'
pubDate: '2024-07-12 15:48:00'
category: 'error'
cardImage: '@images/error/main/react-img.jpg'
tags: ['react', 'image', 'error']
selected: true
---

## vite 中不支持使用 require

vite 中[静态资源处理](https://www.vitejs.net/guide/assets.html#new-url-url-import-meta-url)

错误示例：

```tsx
export default function InkCard({ ink }: { ink: Ink }) {
  function getImageUrl(name: string) {
    return new URL(`@assets/images/${name}`, import.meta.url).href
  }

  return (
    <img
      src={getImageUrl(ink.ink_img)}
      alt=""
      className="object-cover w-[100%] h-[100%]"
    />
  )
}
```

不能使用 **@** 哪怕已经在项目中配置 **@**

修正代码：

```tsx
export default function InkCard({ ink }: { ink: Ink }) {
  function getImageUrl(name: string) {
    return new URL(`../../../assets/images/${name}`, import.meta.url).href
  }

  return (
    <img
      src={getImageUrl(ink.ink_img)}
      alt=""
      className="object-cover w-[100%] h-[100%]"
    />
  )
}
```

要使用引用../这种形式，一层一层找到图片
