---
title: 'tailwindcss 暗夜模式'
description: 'tailwindcss 如何实现暗夜模式'
pubDate: '2024-07-13 13:53:00'
category: 'base'
cardImage: '@images/base/swagger.png'
tags: ['tailwindcss', 'dark', 'theme']
selected: false
---

## 安装 tailwindcss

```bash
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

在 **tailwind.config.js** 添加所有模板文件的路径

```ts
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

index.css 内容如下：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

确保项目能正确使用 **tailwindcss**

创建一个 enums/theme 文件，定义一个枚举类型

```ts
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}
```

创建一个 themeUtils.ts 文件

```ts
import { Theme } from '../enums'
export class ThemeUtils {
  static readonly #THEME_KEY = 'theme'

  static getTheme(): string | null {
    return localStorage.getItem(this.#THEME_KEY)
  }

  static setTheme(theme: string): void {
    localStorage.setItem(this.#THEME_KEY, theme)
  }

  static clearTheme(): void {
    localStorage.removeItem(this.#THEME_KEY)
  }

  static changeTheme(theme: Theme) {
    if (theme === Theme.DARK || theme === Theme.LIGHT) {
      document.documentElement.setAttribute('data-theme', theme)
      ThemeUtils.setTheme(theme)
    }
    if (theme === Theme.DARK) {
      document.documentElement.classList.add(Theme.DARK)
    } else if (theme === Theme.LIGHT) {
      document.documentElement.classList.remove(Theme.DARK)
    }
  }
}
```

在 index.css 添加如下配置

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.dark {
  color-scheme: dark;
}

[data-theme='dark'] {
  color: #ffffff;
}
```

创建一个 ThemeToggle

```tsx
import { Switch } from 'antd'
import { ThemeUtils } from '@/shared/utils'
import { Theme } from '@/shared/enums/Theme'
import { useState } from 'react'

function ThemeToggle() {
  const [theme, setTheme] = useState(Theme.LIGHT)

  function changeTheme(checked: boolean) {
    const currentTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    setTheme(currentTheme)
    ThemeUtils.changeTheme(currentTheme)
  }

  return <Switch onChange={changeTheme} />
}

export default ThemeToggle
```

在 Header 组件中使用，添加 **dark:bg-gray-800**,在暗夜模式的时候，就会执行这个类名

```tsx
import ThemeToggle from '@/shared/components/ThemeToggle'

function Header() {
  return (
    <div className="dark:bg-gray-800 flex justify-between items-center py-4 px-5 ">
      Header
      <ThemeToggle />
    </div>
  )
}

export default Header
```

已经实现暗夜模式
