---
title: 'monorepo 项目架构'
description: 'monorepo 项目架构'
pubDate: '2024-11-02 21:06:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/21-30/thirty.png'
tags: ['ink-spell']
selected: false
---

## 介绍

单一仓库（**Monorepo**）架构，可以理解为：利用单一仓库来管理多个 **packages** 的一种**策略或手段**

**Monorepo** 目录中除了会有公共的 **package.json** 依赖以外，在每个 **sub-package** 子包下面，也会有其特有的 **package.json** 依赖。

兄弟模块之间可以通过模块 **package.json** 定义的 **name** 相互引用，保证模块之间的独立性

## monorepo 项目搭建

### **背景**

传统的多仓库 **Multirepo** 模式，通常都是一个仓库存放一个项目。比如现在你有三个项目，就需要创建三个远程仓库，并且需要为每个项目单独安装和升级依赖

而单一仓库 **Monorepo** 模式，就是在一个仓库中管理多个项目，这些项目可以是独立的，也可以相互依赖。通过 **Monorepo**，多个项目可以共享依赖。

### 安装包管理工具

创建一个新的项目目录 **pnpm-monorepo**，根目录运行 **pnpm init** 创建 **packages.json** 文件

然后根据目录创建一个文件夹 **packages**，用于存储子包

### 配置 workspace

根目录新建一个 **pnpm-workspace.yaml**，将 **packages** 下所有的目录都作为包进行管理

```bash
packages:
  - 'packages/*'
```

![''](@images/ink-spell/thirty/image.png)

去插件市场找一个插件

![''](@images/ink-spell/thirty/image2.png)

安装完成后，按住 ctrl+shift+p 打开窗口

![''](@images/ink-spell/thirty/image3.png)

点击 **Monorepo：Sync Workspace Folders**

目录就变成这样了

![''](@images/ink-spell/thirty/image4.png)

### 子包共享

此时，**pnpm-workspace.yaml** 工作空间下的每个子包都可以共享我们的公共依赖了。还有个问题是，兄弟模块之间如何共享呢？ 子包之间可以通过 **package.json** 定义的 **name** 相互引用

用 **--workspace** 参数去安装共享子包，会去 **workspace**工作空间中找依赖项并安装

```bash
pnpm install @libc/shared --workspace -w
```

**package.json** 中就会自动添加如下依赖，**"workspace:"** 只会解析本地 **workspace** 包含的 **package**

```bash
"dependencies": {
   "@libc/shared": "workspace:^"
 }
```

此时，项目就可以使用公共包 **libc-shared** 里的方法，**import** 引入即可

```bash
import { isObject } from '@libc/shared'
```

[从零开始：用 vue 3 + pnpm 打造高效的 Monorepo 项目架构 🦄](https://juejin.cn/post/7415776780076105779)
