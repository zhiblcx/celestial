---
title: '正则表达式'
description: '描述要匹配的文本模式'
pubDate: '2024-07-23 22:11:00'
category: 'base'
cardImage: '@images/base/regular-expression.jpg'
tags: ['base', 'regex']
selected: true
---

## 基本概念

正则表达式是一种用于描述字符串模式的语言，常用于文本搜索、替换、验证等操作。正则表达式由普通字符（例如字母和数字）和特殊字符（称为元字符）组成。

## 常用方法

- test() - 用来查看正则表达式与指定字符串是否匹配

```js
const reg = /regex/
reg.test('I am learning regex') // true
reg.test('what is you name') // false
```

- exec() - 查找符合规则的字符串

```js
const reg = /regex/
console.log(reg.exec('I am learning regex'))
// [ 'regex', index: 14, input: 'I am learning regex', groups: undefined
// 第一个是是要查找的字符串，第二个是 查找指定字符串的首字符的下标，第三个是整个字符串
console.log(reg.exec('what is you name')) // null
```

- replace() - 用来替换字符串中符合规则的字符

```js
const reg = /regex/
const str = 'I am learning regex'
str.replace(reg, 'font-end') // I am learning font-end
```

- match() - 可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配

```js
const reg = /regex/
const str = 'I am learning regex'
str.match(reg)
// [ 'regex', index: 14, input: 'I am learning regex', groups: undefined ]
// 和 exec 类似
```

## 修饰符

修饰符约束正则执行的某些细节行为，如是否区分大小写，是否全局匹配

- g - 全局匹配，即匹配所有符合条件的字符串，而非在第一个匹配后停止
- i - 忽略大小写

```js
const reg = /Regex/i
const str = 'I am learning regex'
reg.test(str) // true
```

```js
const reg = /regex/g
const str = 'I am learning regex. she is learning regex'
str.replace(reg, 'javascript')
// I am learning javascript. she is learning javascript
```

## 元字符

普通字符：大多数字符能描述自己本身，例如所有的字母和数字

元字符：是一些具有特殊含义的字符，可以极大的提高了灵活性和强大的匹配功能

> 比如：匹配二十六个字母，可以用普通字符 abcdefg...xyz，但是用元字符表示[a-z]

1. 边界符

   (1) . 单词边界

```js
const reg = /\bcat\b/g
const str = 'The cat scattered his food all over the room.'
str.replace(reg, 'dog')
```

(2) . 字符串边界

| 边界符 | 说明               |
| :----- | ------------------ |
| ^      | 表示匹配行首的文本 |
| $      | 表示匹配行尾的文本 |

> 注意：如果 ^ 和 $ 同时出现表示精准匹配

2. 量词：表示某个模式出现的次数

| 量词  | 说明            |
| ----- | --------------- |
| \*    | 重复0次或更多次 |
| +     | 重复1次或更多次 |
| ?     | 重复0次或1次    |
| {n}   | 重复n次         |
| {n,}  | 重复n次或更多次 |
| {n,m} | 重复n到m次      |

> 注意：逗号两侧不能出现空格

3. 字符类

   (1) . [ ] 匹配字符集合

```js
// 后面的字符串只要包含 abc 任意一个字符
const regex = /[abc]/
regex.test('andy') // true
regex.test('bobby') // true
regex.test('cathy') // true
regex.test('dd') // false

// 使用连字符 - 表示一个范围
const regex2 = /[a-z]/ // 匹配26个英文小写字母的任意一个
const regex3 = /[0-9]/ // 匹配0-9的任意一个数字

// [ ] 里面加上 ^ 表示取反，注意要写到括号里面
const regex4 = /[^a-z]/ // 表示匹配除了26个小写字母以外的字符
```

(2) . 匹配除换行符以外的任意单个字符

```js
const reg = /./ // 匹配除换行符以外的任意单个字符
reg.test('aaa') // true
reg.test('/n') // false
```

(3) . 预定义：指的是某些常见模式的简写方式

| 预订类 | 说明                                                      |
| :----- | :-------------------------------------------------------- |
| \d     | 匹配0-9之间的任意数字，相当于[0-9]                        |
| \D     | 匹配0-9以外的任意字符，相当于`[^0-9]`                     |
| \w     | 匹配任意的字母、数字和下划线，相当于[a-zA-Z0-9_]          |
| \W     | 匹配除字母，数字和下划线以外的字符，相当于`[^a-zA-Z0-9_]` |
| \s     | 匹配空格（包含换行、空格、制表符等），相当于[\t\r\n\v\f]  |
| \S     | 匹配非空格的字符，相当于`[^\t\r\n\v\f]`                   |

> \t: 制表符(TAB)，\r: 回车符(CR)，\v: 垂直制表符(VT)，\f: 换页符(FF)
