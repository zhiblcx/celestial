---
title: 'docker wsl错误'
description: 'docker wsl错误'
pubDate: '2024-11-02 08:20:00'
category: 'error'
cardImage: '@images/error/main/docker-wsl.jpg'
tags: ['error']
selected: true
---

## 启动 docker 遇到错误

![''](@images/error/docker-wsl/image.png)

## 解决办法

在终端中运行以下命令

```bash
wsl --unregister docker-desktop
```

再次运行 Docker Desktop（将重新创建发行版）
