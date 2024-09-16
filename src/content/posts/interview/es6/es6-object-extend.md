---
title: 'es6系列 —— 对象新增了哪些扩展'
description: '对象新增了哪些扩展'
pubDate: '2024-09-07 15:23:00'
category: 'interview'
cardImage: '@images/interview/es6/main/es6-object-extend.png'
tags: ['interview', 'es6']
selected: true
---

## 一、属性的简写

ES6 中，当对象键名和对应值名相等的时候，可以进行简写

```js
const baz = { foo: foo }
// 等同于
const baz = { foo }
```

方法也能进行简写

```js
const o = {
  method: function () {
    return 'hello'
  },
}

// 等同于
const o = {
  method() {
    return 'hello'
  },
}
```

在函数内作为返回值，也会变得方便很多

```js
function func() {
  const x = 1
  const y = 2
  return { x, y }
}

console.log(func()) // { x: 1, y: 2 }
```

**注意：**简写的对象方法不能用作构造函数，否则会报错

```js
const obj = {
  f() {
    this.foo = 'bar'
  },
}

new obj.f() // TypeError: obj.f is not a constructor
```

## 二、属性名表达式

ES6 允许字面量定义对象时，将表达式放在括号内

```js
const lastWord = 'last word'

const obj = {
  'first word': 'hello',
  [lastWord]: 'world',
}

console.log(obj['first word']) // hello
console.log(obj[lastWord]) // world
console.log(obj['last word']) // world
```

表达式还可以用于定义方法名

```js
const obj = {
  ['h' + 'ello']() {
    return 'hi'
  },
}

console.log(obj.hello()) // hi
```

注意，属性名表达式与简洁表示法，不能同时使用，会报错

```js
const foo = 'bar'
const bar = 'abc'
const baz = { [foo] } // 报错

const foo = 'bar'
const baz = { [foo]: 'abc' }
console.log(baz) // { bar: 'abc' }
```

**注意**，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串 **[object Object]**

```js
const keyA = { a: 1 }
const keyB = { b: 1 }

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB',
}

console.log(myObject) // { '[object Object]': 'valueB' }
```

## 三、super 关键字

**this** 关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字 **super**，指向当前对象的原型对象

```js
const proto = {
  sayHi() {
    console.log('hi')
  },
}

const obj = {
  sayHi() {
    console.log('hello')
  },
  find() {
    super.sayHi()
  },
}

Object.setPrototypeOf(obj, proto) // 为 obj 设置原型对象
obj.find() // hi
```

## 四、扩展运算符的应用

在解构赋值中，未被读取的可遍历的属性，分配到指定的对象上面

```js
const { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 }
console.log(a) // 1
console.log(b) // 2
console.log(rest) // { c: 3, d: 4 }
```

**注意**：解构赋值必须是最后一个参数，否则会报错

解构赋值是浅拷贝

```js
const obj = { a: { b: 1 } }
const { ...obj2 } = obj
obj2.a.b = 2
console.log(obj) // { a: { b: 2 } }
```

对象的扩展运算符等同于使用 **Object.assign()** 方法

以上方法等同于

```js
const obj = { a: { b: 1 } }
const obj2 = Object.assign(obj)
obj2.a.b = 2
console.log(obj) // { a: { b: 2 } }
```

## 五、属性的遍历

ES6 一共有 5 种方法可以遍历对象的属性

- for...in：循环遍历对象自身的 和 继承的可枚举属性（不含 Symbol 属性）
- Object.keys(obj)：返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名
- Object.getOwnPropertyNames(obj)：回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名
- Object.getOwnPropertySymbols(obj)：返回一个数组，包含对象自身的所有 Symbol 属性的键名
- Reflect.ownKeys(obj)：返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举

上述遍历，都遵守同样的属性遍历的次序规则：

- 首先遍历所有数值键，按照数值升序排列
- 其次遍历所有字符串键，按照加入时间升序排列
- 最后遍历所有 Symbol 键，按照加入时间升序排

```js
Reflect.ownKeys({ [Symbol()]: 0, c: 2, a: 3, 1: 1 })
// [ '1', 'c', 'a', Symbol() ]
```

## 六、对象新增的方法

关于对象新增的方法，分别有以下：

- Object.is()
- Object.assign()
- Object.getOwnPropertyDescriptors()
- Object.setPrototypeOf()，Object.getPrototypeOf()
- Object.keys()，Object.values()，Object.entries()
- Object.fromEntries()

### Object.is()

严格判断两个值是否相等，与严格比较运算符（===）的行为基本一致，不同之处只有两个：一是 **+0** 不等于 **-0**，二是 **NaN** 等于自身

```js
;+0 === -0 // true
Number.NaN === Number.NaN // false

Object.is(+0, -0) // false
Object.is(Number.NaN, Number.NaN) // true
```

### Object.assign()

**Object.assign()** 方法用于对象的合并，将源对象 **source** 的所有可枚举属性，复制到目标对象 target

**Object.assign()** 方法的第一个参数是目标对象，后面的参数都是源对象

```js
const target = { a: 1, b: 2 }
const source = { b: 4, c: 5 }
const source2 = { c: 5 }

Object.assign(target, source, source2)
target // { a: 1, b: 4, c: 5 }
```

> 注意：**Object.assign()** 方法是浅拷贝，遇到同名属性会进行替换

### Object.getOwnPropertyDescriptors()

返回指定对象所有自身属性（非继承属性）的描述对象

```js
const obj = {
  foo: 123,
  get bar() {
    return 'abc'
  },
}

console.log(Object.getOwnPropertyDescriptors(obj))
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```

### Object.setPrototypeOf()，Object.getPrototypeOf()

**Object.setPrototypeOf** 方法用来设置一个对象的原型对象

```js
Object.setPrototypeOf(object, prototype)

// 用法
const o = Object.setPrototypeOf({}, null)

const obj = {
  a: 1,
}

const obj2 = {
  a: 2,
  show() {
    console.log(super.a)
  },
}

obj2.show() // undefined
Object.setPrototypeOf(obj2, obj)
obj2.show() // 1
```

**Object.getPrototypeOf()**
用于读取一个对象的原型对象

```js
Object.getPrototypeOf(obj)
```

### Object.keys()，Object.values()，Object.entries()

#### Object.keys()

返回自身的（不含继承的）所有可遍历（enumerable）属性的键名的数组

```js
const person = {
  name: 'nicole',
  age: 20,
}
Object.keys(person) //  [ 'name', 'age' ]
```

#### Object.values()

返回自身的（不含继承的）所有可遍历（enumerable）属性的键对应值的数组

```js
const person = {
  name: 'nicole',
  age: 20,
}
Object.values(person) // [ 'nicole', 20 ]
```

#### Object.entries()

返回一个对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对的数组

```js
const person = {
  name: 'nicole',
  age: 20,
}
Object.entries(person) // [ [ 'name', 'nicole' ], [ 'age', 20 ] ]
```

### Object.fromEntries()

用于将一个键值对数组转为对象

```js
const obj = Object.fromEntries([
  ['name', 'nicole'],
  ['age', 20],
])

obj // { name: 'nicole', age: 20 }
```

[本章来源](https://vue3js.cn/interview/es6/object.html)
