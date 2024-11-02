---
title: 'postgresql 数据导入与导出'
description: 'postgresql 修改字段之后一个数据的迁移'
pubDate: '2024-11-01 22:12:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/21-30/twentyNine.png'
tags: ['ink-spell']
selected: false
---

## 服务器的数据进行导出

首先进入到数据库中

```bash
sudo -i -u postgres
```

- postgres 是用户名

导出数据

```bash
pg_dump ink_spell > /home/postgres/ink_spell.sql

ls # 查看文件夹下是否导出成功
```

- ink_spell 是数据库名
- /home/postgres/ink_spell.sql 是导出文件的路径

![''](@images/ink-spell/twentyNine/image4.png)

但是发现导出的是 copy 这种，可能有些的不兼容，我想要 insert

![''](@images/ink-spell/twentyNine/image5.png)

那我们在之前的命令加个 --insert

```bash
pg_dump ink_spell --inserts > /home/postgres/ink_spell_insert.sql
```

![''](@images/ink-spell/twentyNine/image6.png)

这样去看数据，发现都是 insert 插入啦！

![''](@images/ink-spell/twentyNine/image7.png)

## docker 数据导出

首先查看 docker 的容器

```bash
docker ps
```

进入到容器

```bash
docker exec -it <容器名字/容器id> /bin/bash
```

![''](@images/ink-spell/twentyNine/image8.png)

导出数据库

```bash
pg_dump -U postgres -d ink_spell > /2024-11-2-ink-spell.sql
```

- ink_spell 数据库名
- /2024-11-2-ink-spell.sql 导出的路径

![''](@images/ink-spell/twentyNine/image9.png)

## 宿主机的数据导入到服务器的数据

```bash
docker cp ink-spell-postgres:/2024-11-2-ink_spell.sql ./
```

![''](@images/ink-spell/twentyNine/image10.png)

## 修改字段之后 prisma 进行迁移

在数据库表的初始创建并经过一段时间的稳定运行之后，为了开发新功能，需要对现有数据库表进行调整，比如我新增一个 Test Model

然后执行迁移命令

```bash
pnpm prisma migrate dev
```

得到 prisma 警告，从提示可以看出，数据库的 schema 与迁移历史不一致，需要重置整个数据库，所有的数据都将丢失。

![''](@images/ink-spell/twentyNine/image.png)

### 找到问题

prisma migrate dev是通过\_prisma_migrations表中的数据来判断是否需要重置数据表的。

### 解决问题

找到了问题的原因，只需要手动创建一条迁移历史就可以解决这个问题。

在prisma目录下创建migrations/initial/migration.sql文件。

然后需要在数据库自己把你创建的表本地创建

通过prisma migrate resolve命令应用这条记录，使其生效（其实就是将他存到\_prisma_migrations表中）

```bash
pnpm prisma migrate resolve --applied initial
```

![''](@images/ink-spell/twentyNine/image2.png)

这时候执行

```bash
pnpm prisma migrate dev
```

就可以正常迁移了

![''](@images/ink-spell/twentyNine/image3.png)

## 参考文献

[PostgreSQL Dump 备份、恢复、数据迁移](https://blog.csdn.net/wlchn/article/details/78915716)

[pgsql导出所有数据表的insert脚本](https://blog.csdn.net/Heyll__/article/details/80755998)

[postgresql docker中导出导入数据](https://www.unuuc.cn/archives/postgresqldocker%E4%B8%AD%E5%AF%BC%E5%87%BA%E5%AF%BC%E5%85%A5%E6%95%B0%E6%8D%AE)

[Prisma，我只是更新一下表结构，你为什么要重置我的数据库！？](https://juejin.cn/post/7361629576416116777)
