---
title: 'git系列'
description: '面试题'
pubDate: '2024-10-14 19:59:00'
category: 'interview'
cardImage: '@images/interview/git/main/main.png'
tags: ['interview', 'git']
selected: true
---

## [git的常用命令](https://celestial-virid.vercel.app/posts/interview/git/git-common-order)

### 分类

- 配置

- 启动

- 日常基本操作

- 分支操作

- 远程同步

- 撤销

- 存储操作

### 总结

## [fork、clone、branch](https://celestial-virid.vercel.app/posts/interview/git/git-fork-clone-branch)

### 介绍

- fork

  - 代表分叉、克隆 出一个（仓库的）新拷贝

- clone

  - 译为克隆，它的作用是将文件从远程代码仓下载到本地，从而形成一个本地代码仓

- branch

  - 译为分支，其作用简单而言就是开启另一个分支， 使用分支意味着你可以把你的工作从开发主线上分离开来，以免影响开发主线

### 如何使用

### 区别

- fork 只能对代码仓进行操作，且 fork 不属于 git 的命令，通常用于代码仓托管平台的一种“操作”

- clone 是 git 的一种命令，它的作用是将文件从远程代码仓下载到本地，从而形成一个本地代码仓

- branch 特征与 fork 很类似，fork 得到的是一个新的、自己的代码仓，而 branch 得到的是一个代码仓的一个新分支

## [git的理解](https://celestial-virid.vercel.app/posts/interview/git/git-understand)

### 介绍

- 分布式版本控制软件

### 工作原理

- Git 中所有数据在存储前都计算校验和，然后以校验和来引用，所以在我们修改或者删除文件的时候，git能够知道

### 命令

- add

- commit

- push

- pull

- clone

- checkout

## [版本管理的理解](https://celestial-virid.vercel.app/posts/interview/git/git-version-control-understand)

### 介绍

- 版本控制（Version control），是维护工程蓝图的标准作法，能追踪工程蓝图从诞生一直到定案的过程。

### 分类

- 本地版本控制系统

  - 优点

        - 简单，很多系统中都有内置

        - 适合管理文本，如系统配置

  - 缺点

        - 其不支持远程操作，因此并不适合多人版本开发

- 集中式版本控制系统

  - 优点

        - 适合多人团队协作开发

        - 代码集中化管理

  - 缺点

        - 单点故障

        - 必须联网，无法单机工作

- 分布式版本控制系统

  - 优点

        - 适合多人团队协作开发

        - 代码集中化管理

        - 可以离线工作

        - 每个计算机都是一个完整仓库

### 总结

- 记录文件所有历史变化，这是版本控制系统的基本能力

- 随时恢复到任意时间点，历史记录功能使我们不怕改错代码了

- 支持多功能并行开发，通常版本控制系统都支持分支，保证了并行开发的可行

- 多人协作并行开发，对于多人协作项目，支持多人协作开发的版本管理将事半功倍

## [HEAD、工作树、索引](https://celestial-virid.vercel.app/posts/interview/git/git-head)

### HEAD

- 在git中，可以存在很多分支，其本质上是一个指向 commit 对象的可变指针，而 Head 是一个特别的指针，是一个指向你正在工作中的本地分支的指针

### 工作树和索引

- 大家实际操作的目录被称为工作树，也就是工作区域

- 在数据库和工作树之间有索引，索引是为了向数据库提交作准备的区域，也被称为暂存区域

### 区别

- HEAD 指针通常指向我们所在的分支，当我们在某个分支上创建新的提交时，分支指针总是会指向当前分支的最新提交

- 工作树是查看和编辑的（源）文件的实际内容

- 索引是放置你想要提交给 git 仓库文件的地方，如工作树的代码通过 git add 则添加到 git 索引中，通过 git commit 则将索引区域的文件提交到 git 仓库中

## [git pull 和 git fetch](https://celestial-virid.vercel.app/posts/interview/git/git-pull-and-fetch)

### 介绍

- git fetch 命令用于从另一个存储库下载对象和引用

- git pull 命令用于从另一个存储库或本地分支获取并集成(整合)

### 用法

### 区别

- 相同点

  - 在作用上他们的功能是大致相同的，都是起到了更新代码的作用

- 不同点

  - git pull是相当于从远程仓库获取最新版本，然后再与本地分支merge，即git pull = git fetch + git merge

  - 相比起来，git fetch 更安全也更符合实际要求，在 merge 前，我们可以查看更新情况，根据实际情况再决定是否合并

## [git stash 理解](https://celestial-virid.vercel.app/posts/interview/git/git-stash-understand)

### 介绍

- 译为存放，在 git 中，可以理解为保存当前工作进度，会把暂存区和工作区的改动进行保存，这些修改会保存在一个栈上

### 如何使用

- git stash

  - 保存当前工作进度，会把暂存区和工作区的改动保存起来

- git stash save

  - git stash save可以用于存储修改.并且将git的工作状态切回到HEAD也就是上一次合法提交上

- git stash list

  - 显示保存进度的列表

- git stash pop

  - git stash pop 从栈中读取最近一次保存的内容，也就是栈顶的 stash 会恢复到工作区

- git stash apply

  - 将堆栈中的内容应用到当前目录，不同于git stash pop，该命令不会将内容从堆栈中删除

- git stash show

  - 查看堆栈中最新保存的stash和当前目录的差异

- git stash drop

  - git stash drop + stash名称表示从堆栈中移除某个指定的stash

- git stash clear

  - 删除所有存储的进度

### 应用场景

- 但是如果可能发生冲突怎么办.直接git pull会拒绝覆盖当前的修改，这时候就可以依次使用下述的命令：

  - git stash

  - git pull

  - git stash pop

- 或者当你开发到一半，现在要修改别的分支问题的时候，你也可以使用git stash缓存当前区域的代码

  - git stash：保存开发到一半的代码

  - git commit -m '修改问题'

  - git stash pop：将代码追加到最新的提交之后

## [rebase 和 merge](https://celestial-virid.vercel.app/posts/interview/git/git-rebase-and-merge)

### 介绍

- 在使用 git 进行版本管理的项目中，当完成一个特性的开发并将其合并到 master 分支时，会有两种方式：rebase 和 merge

- git merge

  - 将当前分支合并到指定分支

- git rebase

  - 将当前分支移植到指定分支或指定commit之上

### 分析

### 区别

- merge

  - 通过 merge 合并分支会新增一个 merge commit，然后将两个分支的历史联系起来

  - 其实是一种非破坏性的操作，对现有分支不会以任何方式被更改，但是会导致历史记录相对复杂

- rebase

  - rebase 会将整个分支移动到另一个分支上，有效地整合了所有分支上的提交

  - 主要的好处是历史记录更加清晰，是在原有提交的基础上将差异内容反映进去，消除了 git merge 所需的不必要的合并提交

## [git冲突](https://celestial-virid.vercel.app/posts/interview/git/git-conflict)

### 介绍

- 多个分支代码合并到一个分支时

- 多个分支向同一个远端分支推送

### 分析

### 总结

- 当 Git 无法自动合并分支时，就必须首先解决冲突，解决冲突后，再提交，合并完成

- 解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交

## [reset 和 revert的理解](https://celestial-virid.vercel.app/posts/interview/git/git-reset-revert)

### 介绍

- git reset

  - reset用于回退版本，可以遗弃不再使用的提交

- git revert

  - 在当前提交后面，新增一次提交，抵消掉上一次提交导致的所有变化，不会改变过去的历史，主要是用于安全地取消过去发布的提交

### 如何用

### 区别

- git revert 是用一次新的 commit 来回滚之前的commit，git reset 是直接删除指定的 commit

- git reset 是把HEAD向后移动了一下，而 git revert 是 HEAD 继续前进，只是新的 commit 的内容和要 revert 的内容正好相反，能够抵消要被 revert 的内容

- 如果回退分支的代码以后还需要的情况则使用git revert， 如果分支是提错了没用的并且不想让别人发现这些错误代码，则使用 git reset
