---
title: 'es6系列 —— 函数新增了哪些扩展'
description: '函数新增了哪些扩展'
pubDate: '2024-09-07 10:21:00'
category: 'interview'
cardImage: '@images/interview/es6/es6-function-extend.png'
tags: ['interview', 'es6']
selected: true
---

## 一、参数

**es6** 允许为函数的参数设置默认值

```js
function func(x, y = 'world') {
  console.log(x, y)
}

func('hello') // hello world
func('hello', 'javascript') // hello javascript
func('hello', '') // hello
```

函数的形参是默认声明的，不能再使用 **let** 或 **const** 再次声明

```js
function func(x, y) {
  let x // SyntaxError: Identifier 'x' has already been declared
}
```

参数默认值可以与解构赋值的默认值结合起来使用

```js
function func({ x, y = 2 }) {
  console.log(x, y)
}

func({}) // undefined 2
func({ x: 5 }) // 5 2
func({ x: 5, y: 10 }) // 5 10
func() // TypeError: Cannot destructure property 'x' of 'undefined' as it is undefined.
```

上面的 **func** 函数，当参数为对象时才能进行解构，如果没有提供参数的时候，变量 **x** 和 **y** 就不会生成，从而报错，这里设置默认值避免。

```js
function func({ x, y = 2 } = {}) {
  console.log(x, y)
}

func() // undefined 2
```

参数默认值应该是函数的尾参数，如果不是非尾参数的参数设置为默认值，实际上这个参数是没法省略的

```js
function func(x = 1, y) {
  console.log(x, y)
}

func() // 1 undefined
func(2) // 2 undefined
func(undefined, 10) // 1 10
func(,2) // SyntaxError: Unexpected token ','
```

## 二、属性

### 函数的 length 属性

**length** 将返回没有指定默认值的参数个数

```js
console.log(function (a) {}.length) // 1
console.log(function (a = 5) {}.length) // 0
console.log(function (a, b, c = 5) {}.length) // 2
```

**rest** 参数也不会计入 **length** 属性

```js
console.log(function (...arg) {}.length) // 0
console.log(function ([...arg]) {}.length) // 1
```

如果设置了默认值的参数不是尾参数，那么 **length** 属性也不再计入后面的参数

```js
console.log(function (a = 1, b, c) {}.length) // 0
console.log(function (a, b = 2, c) {}.length) // 1
```

### name 属性

返回该函数的函数名

```js
const f = function () {
  console.log('你好')
}

console.log(f.name) // f
```

如果将一个具名函数赋值给一个变量，则 **name** 属性会返回这个具名函数原本的名字

```js
const f = function bar() {
  console.log(bar)
}

console.log(f.name) // bar
```

**function** 构造函数返回的函数实例，**name** 属性的值为 **anonymous**

```js
console.log(new Function().name) // anonymous
```

**bind** 返回的函数，**name** 属性值还会加上 **bound** 的前缀

```js
function func() {}

console.log(func.bind({}).name) // bound func
console.log(function () {}.name) // " "
console.log(function () {}.bind({}).name) // "bound "
```

## 三、作用域

一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域

等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的

下面例子中，**y=x** 会形成一个单独作用域，**x** 没有被定义，所以指向全局变量 **x**

```js
const x = 1
function func(y = x) {
  const x = 2
  console.log(y)
}

func()
```

## 四、严格模式

只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错

```js
function func(a=2){
  'use strict';
}
// SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list

function func2({a,b}) {
  'use strict'
}

function func3(...arg){
  'use strict'
}
```

## 五、箭头函数

使用“箭头”（**=>**）定义函数

```js
var f = (v) => v

// 等同于
var f = function (v) {
  return v
}
```

如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分

```js
const f = () => 5
// 等同于
const f = function () {
  return 5
}

const f2 = (num1, num2) => num1 + num2
// 等同于
const f2 = function (num1, num2) {
  return num1 + num2
}
```

如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用 **return** 语句返回

```js
function f2(num1, num2) {
  const sum = num1 + num2
  return sum
}
```

如果返回对象，需要加括号将对象包裹

```js
const obj = (id) => ({ id, name: 'John', age: 30 })
```

**注意点**：

- 函数体内的 **this** 对象，就是定义时所在的对象，而不是使用时所在的对象 (箭头函数没有 this，一般是父函数里的 this)
- 不可以当做构造函数，也就是说，不可以使用 **new** ，否则会抛出错误
- 不可以使用 **arguments** 对象，该对象在函数体内不存在，如果要用，可以用 **rest** 参数代替
- 不可以使用 **yield** 命令，因此箭头函数不能用作 **Generator** 函数

[本章来源](https://vue3js.cn/interview/es6/function.html)
