---
title: 'es6系列 —— var、let、const 的区别'
description: 'var、let、const 的区别'
pubDate: '2024-09-06 20:11:00'
category: 'interview'
cardImage: '@images/interview/es6/main/es6-var、let、const.png'
tags: ['interview', 'es6']
selected: true
---

## var

在 ES6 中，顶层对象的属性和全局变量是等价的，用 **var** 声明的变量既是全局变量，也是顶层变量

> 顶层对象，在浏览器环境中是指 **window** 对象，在 node 环境指的是 **global** 对象

```js
var a = 10
console.log(window.a)
```

使用 **var** 声明的变量存在变量提升的情况

```js
console.log(a) // undefined
var a = 10
```

在编译阶段，编译器会将其变成以下执行

```js
var a
console.log(a) // undefined
a = 10
```

使用 **var** 我们能对一个变量进行多次声明，后面声明的变量会覆盖前面的变量声明

```js
var a = 20
var a = 30
console.log(a) // 30
```

在函数中使用 **var** 声明变量的时候，该变量是局部的

```js
var a = 10
function change(){
    var a = 20
}
change()
console.log(a) // 10
```

而如果函数中内不使用 **var** ，该变量是全局的

```js
var a = 20
function change(){
    a = 30
}
change()
console.log(a) // 30
```

## let

**let** 是 **ES6** 新增的命令，用来声明变量

用法类似于 **var** 但是所声明的变量，只在 **let** 命令所在的代码块内有效

```js
{
    let a = 20
}
console.log(a) // ReferenceError: a is not defined
```

不存在变量提升

```js
console.log(a)
let a = 20 // ReferenceError: Cannot access 'a' before initialization
```

这表示在声明它之前，变量 a 是不存在的，这时候如果用到它，就会抛出一个错误，告诉你，这个变量还没初始化

只要块级作用域内存在 **let** 命令，这个区域就不再受外部的影响

```js
var a = 10
while(true){
    a = 'abc' // ReferenceError: Cannot access 'a' before initialization
    let a
}
```

使用 **let** 声明变量前，该变量都不可用，也就是大家所说的 "暂时性死区"

最后，**let** 不允许在相同作用域中重复声明

```js
let a = 1;
let a = 2; // SyntaxError: Identifier 'a' has already been declared
```

注意是相同作用域，下面这种情况是不会报错的

```js
let a = 20
{
    let a = 30
}
```

因此，我们不能在函数内部中声明参数

```js
function(a){
    let a; // SyntaxError: Identifier 'a' has already been declared
}
func()
```

## const

**const** 声明一个只读的常量，一旦声明，常量的值就不能改变

```js
const a = 20;
a = 30; // TypeError: Assignment to constant variable.
```

这意味着，**const** 一旦声明，就必须立刻初始化，不能留到以后赋值

```js
const a // TypeError: Assignment to constant variable.
```

如果之前使用过 **var** 或 **let** 声明过变量，再用 **const** 声明同样会报错

```js
var a = 20
const a = 30 // SyntaxError: Identifier 'a' has already been declared

let b = 40
const b = 50 // SyntaxError: Identifier 'a' has already been declared
```

**const** 实际上保证的并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不能改动

对于简单类型的数据，指就保存在变量指向的那个内存地址，因此等同于常量

对于复杂类型的数据，变量指向的内存地址，保存的只是一个指向实际数据的指针，**const** 只能保证这个指针是固定的，并不能确保变量的结构不变

```js
const foo = {}
// 为 foo 添加一个属性，可以成功
foo.prop = 123 
console.log(foo.prop) // 123

foo = {} // TypeError: Assignment to constant variable.
```

其他情况 **const** 与 **let** 一致

## 区别

**var**、**let**、**const** 三者区别可以围绕下面五点展开：

+ 变量提升
+ 暂时性死区
+ 块级作用域
+ 重复声明
+ 修改声明的变量
+ 使用

### 变量提升

**var** 声明的变量存在变量提升，即变量可以在声明之前调用，值为 **undefined**

**let** 和 **const** 不存在变量提升，即它们所声明的变量一定要在声明后使用，否则会报错

```js
console.log(a) // undefined
var a = 20 

console.log(b)
let b = 20 // ReferenceError: Cannot access 'b' before initialization

console.log(c)
const c = 20 // ReferenceError: Cannot access 'b' before initialization
```

### 暂时性死区

**var** 不存在暂时性死区

**let** 和 **const** 存在暂时性死区，只有等到声明变量的那一行代码出现，才可以获取和使用该变量

```js
console.log(a) // undefined
var a = 20 

console.log(b)
let b = 20 // ReferenceError: Cannot access 'b' before initialization

console.log(c)
const c = 20 // ReferenceError: Cannot access 'b' before initialization
```

### 块级作用域

**var** 不存在块级作用域

**let** 和 **const** 存在块级作用域

```js
{
  var a = 20
}
console.log(a) // 20

{
  let b = 20
}
console.log(b) // ReferenceError: b is not defined

{
  const c = 20
}
console.log(c) // ReferenceError: c is not defined
```

### 重复声明

**var** 允许重复声明

**let** 和 **const** 在同一作用域下不允许重复声明变量

```js
var a = 10
var a = 20 // 20

let b = 10
let b = 20 // SyntaxError: Identifier 'b' has already been declared

const c = 10
const c = 20 // SyntaxError: Identifier 'c' has already been declared
```

### 修改声明的变量

**var** 和 **let** 可以

**const** 只声明一个只读的变量。一旦声明，常量的值（地址）就不可更改

```js
var a = 20
a = 30 // 30

let b = 20
b = 30 // 20

const c = 20
c = 30 // TypeError: Assignment to constant variable.
```

### 使用

能用 **const** 的情况下尽量使用 **const**，其他大多数情况下使用 **let**，避免使用 **var**

[本章来源](https://vue3js.cn/interview/es6/var_let_const.html)
