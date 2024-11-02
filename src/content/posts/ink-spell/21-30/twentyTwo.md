---
title: '暗夜模式切换、扩散动画'
description: '暗夜模式切换、扩散动画'
pubDate: '2024-09-18 19:53:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/21-30/twentyTwo.png'
tags: ['ink-spell']
selected: false
---

实现效果如下：

![''](https://s5.aconvert.com/convert/p3r68-cdx67/3nemv-zr2eh.gif)

## 实现代码

```tsx
import { Theme } from '@/shared/enums/Theme'
import { useThemeStore } from '@/shared/store'
import { MoonStar, Sun } from 'lucide-react'

function ThemeToggle({ size = 24 }) {
  const { theme, setTheme } = useThemeStore()

  // 如果当前页面是暗色，则切换为亮色；如果当前页面是亮色，则切换为暗色
  const willDark = theme === Theme.LIGHT

  function toggleTheme(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const currentTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    if (!document.startViewTransition) {
      setTheme(currentTheme)
    } else {
      const transition = document.startViewTransition(() => {
        setTheme(currentTheme)
      })
      // 传入点击事件，从点击处开始扩散。否则，从右上角开始扩散
      const x = event?.clientX ?? window.innerWidth
      const y = event?.clientY ?? 0
      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
      )
      void transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ]
        document.documentElement.animate(
          {
            clipPath: willDark ? clipPath : [...clipPath].reverse(),
          },
          {
            duration: 500,
            easing: 'ease-in',
            pseudoElement: willDark
              ? '::view-transition-new(root)'
              : '::view-transition-old(root)',
          }
        )
      })
    }
  }

  return (
    <div onClick={(event) => toggleTheme(event)}>
      {theme === Theme.DARK ? <Sun size={size} /> : <MoonStar size={size} />}
    </div>
  )
}

export default ThemeToggle
```

但是打包之后发现 **document** 没有 **startViewTransition** 方法，所以还需要下载一个包

```path
pnpm add @types/dom-view-transitions
```

## 扩散动画相关的 CSS

```
/** Animated Theme Toggle */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

.dark::view-transition-old(root) {
  z-index: 1;
}
.dark::view-transition-new(root) {
  z-index: 999;
}

::view-transition-old(root) {
  z-index: 999;
}
::view-transition-new(root) {
  z-index: 1;
}
```

[文章来源](https://wtto00.github.io/posts/dark-mode-spread-animation/)
