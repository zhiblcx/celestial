---
title: 'linux 安装 pnpm 后不生效'
description: '解决linux中npm install pnpm -g后pnpm命令不生效的情况'
pubDate: '2024-09-22 16:58:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/twentyTwo.png'
tags: ['ink-spell']
selected: false
---

## 问题所在

由于我在宝塔安装了 node ，导致它的一个 pnpm 安装的包改变，简而言之，就是全局找不到 pnpm，但是 pnpm 是已经成功安装的，就是不能在全局使用，现在我们要配置一下环境变量。

## 解决方法

3. 执行下述命令

   ```bash
   mkdir node_global
   mkdir node_cache
   npm config set prefix '/dtdp/node/node-v16.15.0-linux-x64/node_global'
   npm config set cache '/dtdp/node/node-v16.15.0-linux-x64/node_cache'
   ```

4. 查看 npm 配置信息

   ```bash
   npm config ls
   ```

5. 下载pnpm

   ```bash
   npm install pnpm -g
   ```

6. 确定 npm 全局所安装的包的节点路径

   ```bash
   npm list -g prefix
   ```

   内容如下：/dtdp/node/node-v16.15.0-linux-x64/node_global/lib

7. 配置环境变量 **vim /etc/profile**，同时修改后执行 **source /etc/profile** 命令使配置生效

找到 **node_global** 所在路径：

```bash
 export PATH="/dtdp/node/node-v16.15.0-linux-x64/node_global/bin/:$PATH"
```

[文章来源](https://blog.csdn.net/qq_45023120/article/details/130390511)
