---
title: '配置返回格式swagger'
description: 'NestJs 配置返回格式swagger'
pubDate: '2024-07-30 18:33:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/thirteenth.jpg'
tags: ['ink-spell', 'NestJs', 'swagger']
selected: false
---

## 配置返回格式swagger

正常我们不会用系统的状态码显示，而是配置成下面的样式，data 字段我们则是灵活的

```json
//对象类型data
{
  "code": 200,
  "msg": "ok",
  "data": {
    "name": "西瓜",
    "age": 20,
    "mobile": "133****3333",
    "sex": 1,
    "marry": false
  }
}

//数组类型data
{
  "code": 200,
  "msg": "ok",
  "data": [
    {
      "name": "甜瓜",
      "age": 20,
      "mobile": "133****3333",
      "sex": 1,
      "marry": false
    }
  ]
}

//page页的长列表
{
  "code": 200,
  "msg": "ok",
  "data": {
    "items": [
      {
        "name": "哈密瓜",
        "age": 20,
        "mobile": "133****3333",
        "sex": 1,
        "marry": false
      }
    ],
    "itemCount": 0,
    "totalItems": 0,
    "totalPages": 0,
    "currentPage": 0,
    "itemsPerPage": 0
  }
}
```

先编写一个新的装饰器，系统有一个 ApiResponse，不好用，我们使用自己创建的，取名 APIResponse，如下所示

```ts
import { applyDecorators, Type } from '@nestjs/common'
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger'

const baseTypeNames = ['String', 'Number', 'Boolean']
/**
 * @description: 生成返回结果装饰器
 */

export const APIResponse = <T extends Type<any>>(
  type?: T | T[],
  isPage?: boolean,
  message: string = '请求成功'
) => {
  let prop = null
  // 判断type是否为数组
  if (Array.isArray(type)) {
    // 判断是否为分页
    if (isPage) {
      // 生成包含分页信息的对象结构
      prop = {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            // getSchemaPath 获取一个模型的引用
            items: { $ref: getSchemaPath(type[0]) },
          },
          itemCount: { type: 'number', default: 0 },
          totalItems: { type: 'number', default: 0 },
          totalPages: { type: 'number', default: 0 },
          currentPage: { type: 'number', default: 0 },
          itemsPerPage: { type: 'number', default: 0 },
        },
      }
    } else {
      //生成包含数组类型数据的对象结构。
      prop = {
        type: 'array',
        items: { $ref: getSchemaPath(type[0]) },
      }
    }
  } else if (type) {
    // 判断type是否为基础类型
    if (type && baseTypeNames.includes(type.name)) {
      // 生成基础类型的对象结构。
      prop = { type: type.name.toLocaleLowerCase() }
    } else {
      // 生成引用类型的对象结构。
      prop = { $ref: getSchemaPath(type) }
    }
  } else {
    // 生成包含空值的对象结构。
    prop = { type: 'null', default: null }
  }

  const resProps = {
    type: 'object',
    properties: {
      code: { type: 'number', default: 200 },
      msg: { type: 'string', value: message },
      data: prop,
    },
  }

  return applyDecorators(
    // 使用 ApiExtraModels 装饰器 定义为额外的模型
    ApiExtraModels(type ? (Array.isArray(type) ? type[0] : type) : String),
    ApiResponse({
      schema: {
        // allOf 根据所有子模式验证值
        allOf: [resProps],
      },
    })
  )
}
```

装饰器使用如下所示

```ts
//单个类
...
@APIResponse(UserDto)
updateUserInfo(
    ...
) {
    ...
    //使用findOne获取一个user
    return ResponseData.ok(user);
}

//数组类型,一个普通的元组即可
...
@APIResponse([UserDto])
updateUserInfo(
    ...
) {
    ...
    //使用find获取多个users
    return ResponseData.ok(users);
}

//长列表，带page页的
...
@APIResponse([UserDto], true)
updateUserInfo(
    ...
) {
    ...
    //使用findAndCount 可以获取数据和总数量, userPage
    return ResponseData.pageOk(userPage, pageDto); //用后面的类即可
}
```

分页的数据是这样的

```json
{
  "code": 200,
  "msg": "ok",
  "data": {
    "items": [
      {
        "id": 1,
        "title": "标题",
        "desc": "描述",
        "content": "内容",
        "status": 0,
        "createTime": "2022",
        "updateTime": "2022",
        "user": {
          "nickname": "小鬼快跑",
          "age": 20,
          "mobile": "133****3333",
          "sex": 1
        },
        "userId": 1,
        "collectCount": 10,
        "featureId": 10
      }
    ],
    "itemCount": 0,
    "totalItems": 0,
    "totalPages": 0,
    "currentPage": 0,
    "itemsPerPage": 0
  }
}
```

[本章来源](https://juejin.cn/post/7274182001933172772)
