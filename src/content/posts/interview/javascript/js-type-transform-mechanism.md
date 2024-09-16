---
title: 'javascript系列 —— JavaScript 中的类型转换机制'
description: '面试官：谈谈 JavaScript 中的类型转换机制？'
pubDate: '2024-09-08 18:28:00'
category: 'interview'
cardImage: '@images/interview/javascript/main/js-type-transform-mechanism.jpg'
tags: ['interview']
selected: true
---

## 一、概述

前面我们讲到，JS中有六种简单数据类型：**undefined**、**null**、**boolean**、**string**、**number**、**symbol**，以及引用类型：**object**

但是我们在声明的时候只有一种数据类型，只有到运行期间才会确定当前类型

```js
const x = y ? 1 : a
```

上面代码中，`x`的值在编译阶段是无法获取的，只有等到程序运行时才能知道

虽然变量的数据类型是不确定的，但是各种运算符对数据类型是有要求的，如果运算子的类型与预期不符合，就会触发类型转换机制

常见的类型转换有：

- 强制转换（显示转换）
- 自动转换（隐式转换）

## 二、显示转换

显示转换，即我们很清楚可以看到这里发生了类型的转变，常见的方法有：

- Number()
- parseInt()
- String()
- Boolean(）

### Number()

将任意类型的值转化为数值

先给出类型转换规则：

| 原始值    | 转换结果                            |
| :-------- | :---------------------------------- |
| Undefined | NaN                                 |
| Null      | 0                                   |
| true      | 1                                   |
| false     | 0                                   |
| String    | 根据语法和转换规则来转换            |
| Symbol    | Throw a TypeError exception         |
| Object    | 先调用 toPrimitive，再调用 toNumber |

实践一下：

```js
Number(123) // 123

Number() // 0

// 空字符串转为0
Number('') // 0
// 字符串：如果可以被解析为数值，则转换为相应的数值
Number('123') // 123
// 字符串：如果不可以被解析为数值，返回 NaN
Number('123a') // NaN

// 布尔值：true 转成 1，false 转成 0
Number(false) // 0
Number(true) // 1

// null：转成0
Number(null) // 0
// undefined：转成 NaN
Number(undefined) // NaN

// 对象：通常转换成NaN(除了只包含单个数值的数组)
Number({ 1: 2 }) // NaN
Number([1, 2, 3]) // NaN
Number([1]) // 1
```

从上面可以看到，**Number** 转换的时候是很严格的，只要有一个字符无法转成数值，整个字符串就会被转为 **NaN**

### parseInt()

**parseInt** 相比 **Number**，就没那么严格了，**parseInt** 函数逐个解析字符，遇到不能转换的字符就停下来

```js
Number.parseInt('32a3') // 32
```

### String()

可以将任意类型的值转化成字符串

给出转换规则图：

| 原始值    | 转换结果                            |
| --------- | ----------------------------------- |
| Undefined | "Undefined"                         |
| Null      | "null"                              |
| Boolean   | "true" or "false"                   |
| Number    | 对应的字符串类型                    |
| String    | String                              |
| Symbol    | Throw a TypeError exception         |
| Object    | 先调用 toPrimitive，再调用 toNumber |

实践一下：

```js
// 数值：转为相应的字符串
console.log(String(1)) // "1"
// 字符串：转换后还是原来的值
console.log(String('1')) // "1"

// 布尔值：true 转为字符串 "true"，false 转为字符串 "false"
console.log(String(true)) // "true"
console.log(String(false)) // "false"

// undefined：转为字符串 "undefined"
console.log(String(undefined)) // undefined
// null：转为字符串 "null"
console.log(String(null)) // "null"

// 对象
console.log(String({ a: 1, b: 2 })) // "[object Object]"
console.log(String([1, 2, 3])) // "1,2,3"
```

### Boolean()

| 数据类型  | 转换为 true 的值       | 转换为 false 的值          |
| --------- | ---------------------- | -------------------------- |
| Boolean   | true                   | false                      |
| String    | 非空字符串             | ""（空字符串）             |
| Number    | 非零数值（包括无穷值） | 0、NaN（参见后面相关内容） |
| Object    | 任意对象               | null                       |
| Undefined | N/A（不存在）          | undefined                  |

实践一下：

```js
Boolean(undefined) // false
Boolean(null) // false
Boolean('') // false
Boolean('11') // true
Boolean(0) // false
Boolean(Number.NaN) // false
Boolean({}) // true
Boolean([]) // true
Boolean(new Boolean(false)) // true
```

## 三、隐式转换

在隐式转换中，我们可能最大的疑惑是 ：何时发生隐式转换？

我们这里可以归纳为两种情况发生隐式转换的场景：

比较运算（**==**、**!=**、**>**、**<**）、if、while需要布尔值地方
算术运算（**+**、**-**、**\***、**/**、**%**）
除了上面的场景，还要求运算符两边的操作数不是同一类型

### 自动转换为布尔值

在需要布尔值的地方，就会将非布尔值的参数自动转为布尔值，系统内部会调用 **Boolean** 函数

可以得出个小结：

- undefined
- null
- false
- +0
- -0
- NaN
- ""

除了上面几种会被转化成 **false**，其他都换被转化成 **true**

### 自动转换为字符串

遇到预期为字符串的地方，就会将非字符串的值自动转为字符串

具体规则是：先将复合类型的值转为原始类型的值，再将原始类型的值转为字符串

常发生在 **+** 运算中，一旦存在字符串，则会进行字符串拼接操作

```js
console.log(`1${1}`) // 11
console.log(`1${true}`) // 1true
console.log(`1${false}`) // 1false
console.log(`1${undefined}`) // 1undefined
console.log(`1${null}`) // 1null
console.log(`1${{}}`) // 1[object Object]
console.log(`1${[]}`) // 1
console.log(`1${function () {}}`) // 1function () {}
```

### 自动转换为数值

除了 **+** 有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值

```js
console.log('5' - '2') // 3
console.log('5' * '2') // 10
console.log(true - 1) // 0
console.log(false - 1) // -1
console.log('1' - 1) // 0
console.log('5' * []) // 0
console.log('5' * {}) // NaN
console.log(false / '5') // 0
console.log('abc' - 1) // NaN
console.log(null + 1) // 1
console.log(undefined + 1) // NaN
```

**null** 转为数值时，值为 **0** 。**undefined**转为数值时，值为 **NaN**

[本章来源](https://vue3js.cn/interview/JavaScript/type_conversion.html)
