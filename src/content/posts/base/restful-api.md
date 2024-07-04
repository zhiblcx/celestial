---
title: "RESTful API"
description: "RESTful API 设计指南"
pubDate: "2024-06-27 16:57:00"
category: "base"
cardImage: "@images/base/restful.jpg"
tags: ["restful"]
selected: true
---

## Uniform Interface

+ 获取所有用户：`GET /users`
+ 获取特定用户：`GET /users/{id}`
+ 创建用户：`POST /users`
+ 更新用户：`PUT /users/{id}`
+ 删除用户：`DELETE /users/{id}`

## 版本控制

+ **URL方法**：`https://api.example.com/api/v1/resources`和`https://api.example.com/api/v2/resources`

## HTTP 状态码

+ `200 OK`：请求成功，表示获取请求的数据
+ `201 Created`：请求成功，创建了一个新的资源
+ `204 No Content`：请求成功，表示操作成功，但是没有返回数据
+ `400 Bad Request`：请求失败，表示请求格式不正确或者缺少必要的参数
+ `401 Unauthorized`：请求失败，表示认证失败或缺少授权
+ `403 Forbidden`：请求失败，表示没有访问权限
+ `404 Not Found`：请求失败，表示请求的资源不存在
+ `500 Internal Server Error`：请求失败，表示服务器内部错误
