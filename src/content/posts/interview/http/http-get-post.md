---
title: 'http系列 —— GET 和 POST'
description: '面试官：说一下 GET 和 POST 的区别？'
pubDate: '2024-10-09 16:48:00'
category: 'interview'
cardImage: '@images/interview/http/main/http-get-post.jpg'
tags: ['interview']
selected: true
show: false
---

## 一、是什么

**GET** 和 **POST**，两者是 **HTTP** 协议中发送请求的方法

#### GET

**GET** 方法请求一个指定资源的表示形式，使用 GET 的请求应该只被用于获取数据

#### POST

**POST** 方法用于将实体提交到指定的资源，通常导致在服务器上的状态变化或**副作用**

本质上都是 **TCP** 链接，并无差别

但是由于 **HTTP** 的规定和浏览器/服务器的限制，导致他们在应用过程中会体现出一些区别

## 二、区别

从 **w3schools** 得到的标准答案的区别如下：

- **GET** 在浏览器回退时是无害的，而 **POST** 会再次提交请求。
- **GET** 产生的 **URL** 地址可以被 **Bookmark**，而 **POST** 不可以。
- **GET** 请求会被浏览器主动 **cache**，而 **POST** 不会，除非手动设置。
- **GET**请求只能进行 **url** 编码，而 **POST** 支持多种编码方式。
- **GET** 请求参数会被完整保留在浏览器历史记录里，而 **POST** 中的参数不会被保留。
- **GET** 请求在 **URL** 中传送的参数是有长度限制的，而 **POST** 没有。
- 对参数的数据类型，**GET** 只接受 **ASCII** 字符，而 **POST** 没有限制。
- **GET** 比 **POST** 更不安全，因为参数直接暴露在 **URL** 上，所以不能用来传递敏感信息。
- **GET** 参数通过 **URL** 传递，**POST** 放在 **Request body** 中

### 参数位置

貌似从上面看到 **GET** 与 **POST** 请求区别非常大，但两者实质并没有区别

无论 **GET** 还是 **POST**，用的都是同一个传输层协议，所以在传输上没有区别

当不携带参数的时候，两者最大的区别为第一行方法名不同

> POST /uri HTTP/1.1 \r\n
>
> GET /uri HTTP/1.1 \r\n

当携带参数的时候，我们都知道 **GET** 请求是放在 **url** 中，**POST** 则放在 **body** 中

**GET** 方法简约版报文是这样的

```text
GET /index.html?name=qiming.c&age=22 HTTP/1.1
Host: localhost
```

**POST** 方法简约版报文是这样的

```text
POST /index.html HTTP/1.1
Host: localhost
Content-Type: application/x-www-form-urlencoded

name=qiming.c&age=22
```

> 注意：这里只是约定，并不属于 HTTP 规范，相反的，我们可以在 **POST** 请求中 **url** 中写入参数，或者 **GET** 请求中的 **body** 携带参数

### 参数长度

**HTTP** 协议没有 **Body** 和  **URL** 的长度限制，对 **URL** 限制的大多是浏览器和服务器的原因

**IE** 对 **URL** 长度的限制是 2083 字节 (2K+35)。对于其他浏览器，如Netscape、FireFox等，理论上没有长度限制，其限制取决于操作系统的支持

这里限制的是整个 **URL** 长度，而不仅仅是参数值的长度

服务器处理长 **URL** 要消耗比较多的资源，为了性能和安全考虑，会给 **URL** 长度加限制

### 安全

**POST** 比 **GET** 安全，因为数据在地址栏上不可见

然而，从传输的角度来说，他们都是不安全的，因为`HTTP` 在网络上是明文传输的，只要在网络节点上捉包，就能完整地获取数据报文

只有使用 **HTTPS** 才能加密安全

### 数据包

对于 **GET** 方式的请求，浏览器会把 **http header** 和 **data** 一并发送出去，服务器响应200（返回数据）

对于 **POST**，浏览器先发送 **header**，服务器响应100 **continue**，浏览器再发送 **data**，服务器响应200 ok

并不是所有浏览器都会在 **POST** 中发送两次包，**Firefox** 就只发送一次

[文章来源](https://vue3js.cn/interview/http/GET_POST.html)
