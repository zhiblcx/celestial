---
title: '初学 git '
description: '免费开源的分布式版本控制系统'
pubDate: '2024-08-02 11:54:00'
category: 'base'
cardImage: '@images/base/git.jpg'
tags: ['base', 'git']
selected: true
---

git 常见的操作流程图如下

![git](@images/base/git/image.png)

## 基本概念

- 版本库 .git 文件
  - 当我们使用 git 管理文件时，比如 **git init** 时，这个时候，会多出一个 **.git** 文件，这个文件称之为版本库
  - **.git** 文件另外一个作用就是在它创建的时候，会自动创建 master 分支，并且将 HEAD 指针指向 master 分支。
- 工作区
  - 本地项目存放文件的位置
  - 可以理解为上图的 **workspace**
- 暂存区（Index/Stage）
  - 顾名思义就是暂时存放文件的位置，通过 add 命令将工作区的文件添加到缓存区
- 本地仓库（Repository）
  - 通常情况下，我们使用 commit 命令可以将暂存区的文件添加到本地仓库
  - 通常而言，HEAD 指针指向的就是 master 分支
- 远程仓库（Remote）
  - 举个例子，当我们使用 GitHub 托管我们的项目时，它就是一个远程仓库
  - 通常我们使用 clone 命令将远程仓库代码拷贝下来，本地仓库更新之后，通过 push 托送给远程仓库

## Git 文件状态

- 我们要查看一个文件的状态

```bash
git status
```

- Change not staged for commit
  - 工作区有该内容，但是缓存区没有，需要 **git add**
- Change to be committed
  - 文件已放在缓存区了，需要 **git commit**
- nothing to commit , working tree clean
  - 推送代码 **git push**

## 常见命令

![git](@images/base/git/image_all.png)

### git 配置命令

![git](@images/base/git/image2.png)

### 分支管理

![git](@images/base/git/image3.png)

- 从当前分支切换到其他分支
  - git switch branch-name

### fetch指令

![git](@images/base/git/image4.png)

### 花式撤销

![git](@images/base/git/image5.png)

- 版本回退

  | 指令              | 工作区 | 暂存区 |
  | :---------------- | :----- | :----- |
  | git reset --soft  | √      | √      |
  | git reset --hard  | ×      | ×      |
  | git reset --mixed | √      | ×      |

### 状态查询

![git](@images/base/git/image9.png)

- 查看状态
  - git status
- 查看历史操作记录
  - git reflog
- 查看日志
  - git log

### 文档查询

![git](@images/base/git/image10.png)

- 展示 Git 命令大纲
  - git help
- 展示 Git 命令大纲全部列表
  - git help -a
- 展示具体命令说明手册
  - git help

### 文件暂存

![git](@images/base/git/image6.png)

### 差异比较

![git](@images/base/git/image7.png)

### 分支命令管理

![git](@images/base/git/image8.png)

### 忽略文件.gitignore

文件的作用是忽略一些文件，避免 git 跟踪，以及上传到 github上面

```bash
# 忽略 node_modules/ 目录下所有的文件
node_modules
```

[本章来源](https://juejin.cn/post/6869519303864123399)
[视频讲解](https://www.bilibili.com/video/BV1HM411377j/?spm_id_from=333.337.search-card.all.click)
