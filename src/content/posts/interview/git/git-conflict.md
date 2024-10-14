---
title: 'git系列 —— git 冲突'
description: '面试官：说说 git 发生冲突的场景？如何解决？'
pubDate: '2024-10-14 10:54:00'
category: 'interview'
cardImage: '@images/interview/git/main/git-conflict.png'
tags: ['interview', 'git']
selected: true
show: false
---

## 一、是什么

一般情况下，出现分支的场景有如下：

- 多个分支代码合并到一个分支时
- 多个分支向同一个远端分支推送

具体情况就是，多个分支修改了同一个文件（任何地方）或者多个分支修改了同一个文件的名称

如果两个分支中分别修改了不同文件中的部分，是不会产生冲突，直接合并即可

应用在命令中，就是 **push**、**pull**、**stash**、**rebase** 等命令下都有可能产生冲突情况，从本质上来讲，都是 **merge** 和 **patch**（应用补丁）时产生冲突

## 二、分析

在本地主分值 **master** 创建一个 **a.txt** 文件，文件起始位置写上 **master commit**，如下：

![''](@images/interview/git/git-conflict/image.png)

然后提交到仓库：

- git add a.txt
- git commit -m 'master first commit'

创建一个新的分支 **featurel1** 分支，并进行切换，如下：

```text
git checkout -b featurel1
```

然后修改 **a.txt** 文件首行文字为 **featurel commit**，然后添加到暂存区，并开始进行提交到仓库：

- git add a.txt
- git commit -m 'featurel first change'

然后通过 **git checkout master** 切换到主分支，通过 **git merge** 进行合并，发现不会冲突

此时 **a.txt** 文件的内容变成 **featurel commit** ，没有出现冲突情况，这是因为 **git** 在内部发生了快速合并

> 如果当前分支的每一个提交(commit)都已经存在另一个分支里了，git 就会执行一个“快速向前”(fast forward)操作
>
> git 不创建任何新的提交(commit)，只是将当前分支指向合并进来的分支

如果此时切换到 **featurel** 分支，将文件的内容修改成 **featrue second commit**，然后提交到本地仓库

然后切换到主分支，如果此时在 **a.txt** 文件再次修改，修改成 **mastet second commit**，然后再次提交到本地仓库

此时，**master** 分支和 **feature1** 分支各自都分别有新的提交，变成了下图所示：

![''](@images/interview/git/git-conflict/image3.png)

这种情况下，无法执行快速合并，只能试图把各自的修改合并起来，但这种合并就可能会有冲突

现在通过 **git merge featurel** 进行分支合并，如下所示：

![''](@images/interview/git/git-conflict/image4.png)

从冲突信息可以看到，**a.txt** 发生冲突，必须手动解决冲突之后再提交

而 **git status** 同样可以告知我们冲突的文件：

打开 **a.txt** 文件，可以看到如下内容：

**git** 用 **<<<<<<<** ，**=======**，**>>>>>>>** 标记出不同分支的内容：

```text
Invalid code snippet option
```

- ======= 和 >>>>>>> 之间的区域就是传入进来更改的内容

现在要做的事情就是将冲突的内容进行更改，对每个文件使用 **git add**  命令来将其标记为冲突已解决。 一旦暂存这些原本有冲突的文件，**Git** 就会将它们标记为冲突已解决然后再提交：

- git add a.txt
- git commit -m "conflict fixed"

此时 **master** 分支和 **feature1** 分支变成了下图所示

![''](@images/interview/git/git-conflict/image5.png)

使用 **git log** 命令可以看到合并的信息：

![''](@images/interview/git/git-conflict/image6.png)

## 三、总结

当 **Git** 无法自动合并分支时，就必须首先解决冲突，解决冲突后，再提交，合并完成

解决冲突就是把 **Git** 合并失败的文件手动编辑为我们希望的内容，再提交

[文章来源](https://vue3js.cn/interview/git/conflict.html)
