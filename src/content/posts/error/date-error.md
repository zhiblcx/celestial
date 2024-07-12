---
title: 'Date Error'
description: '后端返回数据指定 Date 的错误'
pubDate: '2024-07-04 12:12:00'
category: 'error'
cardImage: '@images/error/date-error.png'
tags: ['admin', 'date', 'error']
selected: true
---

## 问题

在 taskward 项目中，需要后端返回一个 Date 类型 ("YYYY-MM-DD") 数据格式，但是后端实际返回的数据格式为 2024-07-04T04:12:00.000Z，与期望格式不符。

## 原因

经过翻阅 prisma 官方文档，发现后端返回的数据 Date 类型是使用的 JavaScript Date 对象。这种情况下，默认会返回一个的日期格式为 **2024-07-04T04:12:00.000Z**

## 解决

为了解决这个问题，可以在视图对象（VO）使用 **class-transformer** 库的 **@Transform 装饰器**，将对象转换为期望的格式。

```ts
@ApiProperty({ description: '出生日期' })
@Transform(({ value }) => (dayjs(value).isValid() ? dayjs(value).format('YYYY-MM-DD') : null))
birthDate?: Date
```
