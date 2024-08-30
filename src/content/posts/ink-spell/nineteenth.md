---
title: '用宝塔部署后端'
description: '用宝塔部署 NestJs'
pubDate: '2024-08-30 15:28:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/nineteenth.jpg'
tags: ['ink-spell', 'nestjs']
selected: false
---

## 安装宝塔界面

首先，我们已经有了一台服务器，并且连接到服务器上，然后开始安装宝塔界面，去[官网](https://www.bt.cn/new/index.html)找一下界面的下载，服务器是 ubuntu，以下以 ubuntu 举例：

```bash
wget -O install.sh https://download.bt.cn/install/install_lts.sh && sudo bash install.sh ed8484bec
```

下载好了之后，他会出现默认信息，网站地址、账号和密码，需要保存起来，以便后面使用。

> 根据提示，把这个端口记得开放了，不然不能访问

## 添加服务器

我是直接用命令行去添加数据库的，然后宝塔界面有一个同步数据库，从服务器同步到面板，就可以对数据库进行管理，备份很方便。

![''](@images/ink-spell//nineteenth/image.png)

如果是通过宝塔面板添加项目的，我这里报错了，可以看[这篇文章](https://juejin.cn/post/7346478166604496896?searchId=20240830153717F8ADF83C7BD792842456)

我使用的是 postgres 数据库，以下只针对 postgres 数据库，其他数据库也类似

首先我们先下载数据库

```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-client
```

安装完毕后，系统会创建一个数据库超级用户 postgres，密码为空。

```bash
sudo -i -u postgres
```

这时使用以下命令进入 postgres，输出以下信息，说明安装成功：

```bash
~$ psql
psql (9.5.17)
Type "help" for help.

postgres=#
```

输入以下命令退出 PostgreSQL 提示符：

```bash
\q
```

PostgreSQL 安装完成后默认是已经启动的，但是也可以通过下面的方式来手动启动服务。

```bash
sudo /etc/init.d/postgresql start   # 开启
sudo /etc/init.d/postgresql stop    # 关闭
sudo /etc/init.d/postgresql restart # 重启
```

获取postgresql.conf文件位置。

```bash
find / -name postgresql.conf
```

进入postgresql.conf文件目录。

```bash
cd /etc/postgresql/14/main/postgresql.conf
```

这里也可以直接用宝塔进入到该文件，进行修改

```bash
listen_addresses = '*'
```

把这一行添加到最上面

![''](@images/ink-spell//nineteenth/image2.png)

5432 是端口号，你可以进行修改，记得开放该端口

如果使用的是 vim 进行修改，记得按 esc 然后输入 **:wq** 保存退出

```bash
# 修改密码
ALTER USER postgres WITH PASSWORD 'Lpf65BsDhDNdaJmH';

# 创建数据库
CREATE DATABASE dbname;
```

在 ubuntu 添加 [node](https://nodejs.org/zh-cn/download/prebuilt-binaries) 包，这里不用 nvm 我一直下不了 node。

![](@images/ink-spell//nineteenth/image3.png)

然后上传到 ubuntu 某个文件夹

```bash
# 解压
tar -xvf node-v16.14.0-linux-x64.tar.xz
```

配置环境变量

```bash
vim /etc/profile //执行这一步后一定要按i键，才可以接下来的操作

export PATH=$PATH:/usr/local/node/bin //编辑完成后按esc键退出编辑，输入:wq!保存，/usr/local/node/bin为node转移后的文件路径

source /etc/profile
```

然后直接在 linux 下跑项目，成功了的话就可以了，之后直接在宝塔界面里重启项目，就可以访问了。

[以上详情具体操作](https://juejin.cn/post/7074030999738253343)
