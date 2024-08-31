---
title: '使用 nginx 部署前端'
description: '使用 nginx 部署 react'
pubDate: '2024-08-31 20:00:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/twentieth.jpg'
tags: ['ink-spell', 'react']
selected: false
---

## nginx 卸载

```bash
apt-get remove nginx nginx-common
apt-get purge nginx nginx-common
apt-get autoremove
apt-get remove nginx-full nginx-common
```

## 安装 nginx

```bash
# 更新源列表
apt-get update
# 下载 nginx
apt-get install nginx
```

## 配置 nginx

```bash
# 进入 nginx 配置目录
cd /etc/nginx
```

默认配置文件是 **/etc/nginx/nginx.conf**

计划将配置文件放到/etc/nginx/configs下，这样以便添加其他配置文件。

```bash
cd /etc/nginx
mkdir configs
```

```bash
touch project.conf
```

修改 project.conf，需要先复制粘贴当前目录下的 /modules-enabled 下面的 default 文件然后进行修改，不然就会报错

```perl
server {
listen 8080; # 自己设置端口号
server_name xxx.xxx.xxx.xxx; # 自己设置ip地址 ip!
#access_log logs/host.access.log main;
location / {
root /usr/share/nginx/dist; # 这里写项目打包好的dist文件的地址，可以改，这个随意
index index.html; # 需要保证dist中有index.html文件
try_files $uri $uri/ @router;
}

        location @router {
            rewrite ^.*$ /index.html last;            # 解决重新刷新页面，页面空白的问题
        }

        location /api/ {   # 和之前开发的时候配代理服务器差不多，需要一个前缀
            proxy_pass http://xxx.xxx.xxx.xxx:9090/;    # 此处配置代理，把请求的后端域名端口啥的放这里
        }
        error_page   500 502 503 504  /50x.html;     #错误页面

}
```

接着在 /etc/nginx/ngxin.conf 中添加 include /etc/nginx/configs/\*.conf;

```perl
include /etc/nginx/configs/*.conf;
```

启动 nginx

```bash
systemctl start nginx
```

停止 nginx

```bash
systemctl stop nginx
```

重启 nginx

```bash
systemctl reload nginx
```

查看 nginx 状态

```bash
systemctl status nginx
```

查看 nginx 是否有语法错误

```bash
nginx -t
```

> nginx 默认上传的文件 1MB 以内，如果要更改，请在 /etc/nginx/nginx.conf 中添加
> client_max_body_size 20M 这样就可以上传比较大的文件

[文章来源](https://juejin.cn/post/7286310628352557117)
