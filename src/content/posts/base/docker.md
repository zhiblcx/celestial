---
title: '初学 Docker '
description: '快速构建、运行、管理应用的工具'
pubDate: '2024-07-22 13:40:00'
category: 'base'
cardImage: '@images/base/docker.jpg'
tags: ['base', 'docker']
selected: true
---

## Docker 是做什么的？

Docker 可以帮助我们下载应用镜像，创建并运行镜像的容器，从而快速部署应用.

## 什么是镜像

将应用所需的函数库、依赖、配置等与应用一起打包得到的就是镜像。

## 什么是容器

为每个镜像应用进程创建的隔离运行环境就是容器

## 什么是镜像仓库

- 存储和管理镜像的服务就是惊喜那个仓库
- [DockerHub](https://hub.docker.com/) 是目前最大的镜像仓库，其中包含各种常见的应用镜像

## docker run 命令中常见的参数

- **-d:** 让容器后台运行 docker run -d
- **-p:** 将容器的端口映射到宿主机上 docker run -p 8080:80
- **--name:** 为容器指定名称 docker run --name my-container
- **-v:** 将宿主机上的目录挂载到容器中 docker run -v /path/to/host:/path/to/container
- **-e:** 设置环境变量 docker run -e ENV_VAR=value

镜像名称结构

- **Repository**(镜像名) : **TAG**(版本号)

## [docker 的常用命令](https://docs.docker.com/reference/)

- **docker pull:** 从镜像仓库中下载镜像
- **docker push:** 将镜像推送到镜像仓库

- **docker build:** 从 Dockerfile 构建镜像
- **docker save:** 将镜像保存到文件
- **docker load:** 从文件加载镜像

- **docker images:** 查看本地镜像
- **docker rmi:** 删除镜像

- **docker run:** 从镜像创建容器并运行
- **docker logs:** 查看容器日志
- **docker exec:** 在容器中执行命令
- **docker stop:** 停止容器
- **docker start:** 启动容器
- **docker restart:** 重启容器
- **docker ps:** 查看正在运行的容器
- **docker rm:** 删除容器
- **docker commit:** 从容器创建镜像

![](@images/base/docker/image.jpg)

## docker 挂载

1. 数据卷挂载

**数据卷(volumn)** 是一个虚拟目录，是**容器内目录**与**宿主机目录**之间映射的桥梁，方便我们操作容器内的文件，或方便我们迁移容器产生的数据

![](@images/base/docker/image2.png)

**数据卷命令**

- **docker volume create:** 创建数据卷
- **docker volume ls:** 查看所有数据卷
- **docker volume inspect:** 查看数据卷详细信息
- **docker volume rm:** 删除数据卷
- **docker volume prune:** 清理数据卷

```bash
docker run -d --name nginx -p 80:80 -v nginx:/usr/share/nginx/html nginx:latest
```

> - 注意：在执行 docker run 命令时，使用 -v 数据卷:容器内目录，可以完成数据卷挂载
> - 当创建容器的时，如果挂载了数据卷且数据卷不存在，会自动创建数据卷

2. 宿主机目录挂载

```bash
docker run -d \
 --name mysql \
 -p 3306:3306 \
 -e TZ=Asia/Shanghai \
 -e MYSQL_ROOT_PASSWORD=123 \
 -v /root/mysql/data:/var/lib/mysql \
 -v /root/mysql/init:/docker-entrypoint-initdb.d \
 -v /root/mysql/conf:/etc/mysql/conf.d \
 mysql
```

> - 在执行 docker run 命令时，使用 -v 本地目录:容器内目录，可以完成宿主机目录挂载
> - 本地目录必须以 "/" 或 "./" 开头，如果直接以名称开头，会被识别为数据卷而非本地目录
>   - -v mysql:/var/lib/mysql 会被识别为一个数据卷叫mysql
>   - -v ./mysql:/var/lib/mysql 会被识别为当前目录下的mysql目录

## 自定义镜像

#### 镜像结构

- **入口(Entrypoint):** 镜像运行入口，一般是程序启动的脚本或参数
- **层(layer):** 添加安装包、依赖、配置等，每次操作都形成新的一层
- **基础镜像(BaseImage):** 应用依赖的系统函数库、环境、配置、文件等

#### Dockerfile

**Dockerfile** 是一个文本文件，其中包含了一个个的**指令(Instruction)** ，用指令来说明要执行什么操作来构建镜像。将来 Docker 可以根据 Dockerfile 帮我们构建镜像。常见指令如下：

| 指令       | 说明                                         | 示例                                                             |
| :--------- | :------------------------------------------- | :--------------------------------------------------------------- |
| FORM       | 指定基础镜像                                 | FROM centos:6                                                    |
| ENV        | 设置环境变量，可在后面指令使用               | ENV key value                                                    |
| COPY       | 拷贝本地文件到镜像的指定目录                 | COPY ./jre11.tar.gz/tmp                                          |
| RUN        | 执行 linux 的 shell 命令，一般是安装的命令   | RUN tar -zwf /tmp/jre11.tar.gz && EXPORTS path =/tmp/jre11:$path |
| EXPOSE     | 指定容器运行时监听的端口，是给镜像使用者看的 | EXPOSE 8080                                                      |
| ENTRYPOINT | 镜像中应用的启动命令，容器运行时调用         | ENTRYPOINT java -jar xx.jar                                      |

## 网络

加入自定义网络的容器才可以通过容器名互相访问

| 命令                      | 说明                     |
| :------------------------ | :----------------------- |
| docker network create     | 创建一个网络             |
| docker network ls         | 查看所有网络             |
| docker network rm         | 删除指定网络             |
| docker network prune      | 清除未使用的网络         |
| docker network connect    | 使指定容器连接加入某网络 |
| docker network disconnect | 使指定容器连接离开某网络 |
| docker network inspect    | 查看网络详细信息         |

## DockerCompose

Docker Compose 通过一个单独的 **docker-compose.yml** 模板文件（YAML 格式）来定义一组相关联的应用容器，帮助我们实现**多个相互关联的 Docker 容器的快速部署**

![](@images/base/docker/image3.jpg)
