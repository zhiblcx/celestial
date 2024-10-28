---
title: '项目三大难点'
description: '关于 ink-spell 三大难点'
pubDate: '2024-10-28 21:45:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/twentySeven.png'
tags: ['ink-spell']
selected: false
---

## 项目难点之一：暗夜模式

利用 tailwindcss 实现暗夜模式

在全局样式中，添加 **dark** 类，设置为 **color-scheme:dark**，利用属性选择题 **[dark-theme="dark"]{ color:#fff }**，这样 **dark-theme** 属性并且属性值为 **"dark"** 的元素将应用 **color:#fff**。

创建一个关于 ThemeUtils 文件，其中有四个方法。

getTheme：从 localstorage 获取当前主题

setTheme：保存当前主题到 localStorage

clearTheme：从 localStorage 中移除主题

changeTheme：接收一个主题值theme，判断是什么主题，如果是 Dark 需要给根元素添加一个类名 .dark，如果是 Light，则移除这个 .dark，然后设置属性值，data-theme 属性设置为 theme，并且把 theme 保存到 localStorage。

接着封装一个 **主题切换按钮**，利用 useState 来实现实时数据同步，但是发现一个问题，假如当前为暗夜模式，用户重新刷新，localStorage 依旧还是存储的 dark ，但是界面是白天模式。于是我配合了 zustand 使用，利用状态订阅里面的 fireImmediately 设置为 true，它就会在创建订阅函数的时候立即触发回调函数，这样就达到了我的目的。

tailwindcss 默认包含一个 dark，在元素类名上添加 dark 前缀加其他类名，切换到暗夜模式，就可以启用 dark 后面的类名。

## 项目难点之二：国际化

i18next 是一个用 JavaScript 编写的国际化框架，而 react-i18next 是基于 i18next 实现的

创建语言包（定义语言 json 文件） English 和 Chinese 两个文件夹，并在下面创建对应的 json 文件，比如我创建了 common.json 和 auth.json 这是针对翻译的命名空间的分割。

命名空间是 i18next 国际化框架的一项功能，允许将加载到多个文件的翻译分开。

接着我需要设置 i18next 的相关配置，如默认语言。

在这里利用 zustand 实现了一个切换语言的选择器，我把语言存储到 localstorage ，首先查看是否有语言，如果没有语言，切换到默认语言，这里假如我设置的默认语言为 Chinese ，定义一个切换语言的方法，方法里面有 i18n.changeLanguage 切换语言，把当前的语言存储到本地，以便下次使用。

利用 zustand 的状态订阅，实现实时数据同步，使用户在切换语言后能够立即看到翻译后的内容。

要实现 TypeScript 提供的类型提示，创建一个 @types 文件夹，创建 i18n.d.ts 和 resource.ts，在 i18n.d.ts 进行配置，也就是把其中一种语言导入，进行类型声明，还要在 tsconfig.app.json 添加相关配置 "include":["src","@types"] 让 vite 编译它，就有 TypeScript 的类型检查和提示了。

因为使用的是 ant-ui 组件库，所以还需要对 ant-ui 组件库进行国际化，ant-ui 自带翻译文件，进行相关配置就可以了。

## 项目难点之三：实现双token无感刷新。

随着 token 有效期的缩短，频繁的重新登陆已经成为常见现象，ink-spell 实现了一种无缝的，用户无感知的token刷新机制。

它的主要就是前端发送一个登录请求，后端返回两个token，分别为 access-token 和 refresh-token。

前端把这两个 token 存储到本地中，访问其他接口，携带 token，这个 token 没有过期

后端返回处理结果

前端访问其他接口，携带 token，这个 token 过期了

后端返回token过期

前端接收到了，让 token 过期访问的接口排队，等刷新完token再次访问。

前端携带 refresh-token，刷新 token，这个 refresh-token 没有过期

后端返回刷新完的 access-token 和 refresh-token

前端把这两个 token 替换本地的 tonen，接着访问之前 token 过期的接口

后端返回处理结果

如果前端这时候再次返回一个 token 过期，并且去刷新 token，refresh-token 也过期，这时候前端将显示登录过期，重新登陆，并跳转到登录页面

这样就实现了双token无感刷新机制，有效的解决了频繁登录的问题，提高了用户的体验
