---
title: 'es6系列 —— ES6中数组新增了哪些扩展'
description: 'ES6中数组新增了哪些扩展'
pubDate: '2024-09-07 07:00:00'
category: 'interview'
cardImage: '@images/interview/es6/main/es6-array-extend.png'
tags: ['interview', 'es6']
selected: true
show: false
---

## 一、扩展运算符的应用

ES6 通过扩展运算符 **...** ，将一个数组转为逗号分割的参数序列

```js
console.log(...[1, 2, 3]) // 1,2,3

console.log(1, ...[2, 3, 4], 5) // 1,2,3,4,5

console.log([...document.querySelectorAll('div')]) // [div,div,div]
```

主要用于函数调用的时候，将一个数组变为参数序列

```js
function push(array, ...rest) {
  array.push(...rest)
}

function add(x, y) {
  return x + y
}

const arr = [1, 2]

console.log(add(...arr)) // 3
```

可以将某些数据结构转为数组

```js
;[...document.querySelectorAll('div')]
```

能够更简单的实现数组的复制

```js
const arr = [1, 2, 3]
const [...arr2] = arr
console.log(arr2) // [1,2,3]

arr2[2] = 4
console.log(arr) // p[1,2,3]
console.log(arr2) // [1,2,4]
```

数组的合并也简洁了

```js
const arr = [1, 2, 3]
const arr2 = [4, 5, 6]
const arr3 = [7, 8, 9]

const arr4 = [...arr, ...arr2, ...arr3]
console.log(arr4) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

> 通过扩展运算符实现的都是浅拷贝，修改了引用指向的值，会同步反射到新数组

看下面这个例子

```js
const arr = [
  1,
  2,
  3,
  [1000, 2000],
  {
    name: 'nicole',
    age: 23,
  },
]

const arr2 = [...arr]

// 修改简单数据类型
arr[0] = 100
console.log(arr) // [ 100, 2, 3, [ 1000, 2000 ], { name: 'nicole', age: 23 } ]
console.log(arr2) // [ 1, 2, 3, [ 1000, 2000 ], { name: 'nicole', age: 23 } ]

// 修改复杂数据类型

// 修改数组的值（他们的地址共享了，于是两个数组只要有一个数组改变了，都会影响另一个数组）
arr[3][1] = 3000
console.log(arr) // [ 1, 2, 3, [ 1000, 3000 ], { name: 'nicole', age: 23 } ]
console.log(arr2) // [ 1, 2, 3, [ 1000, 3000 ], { name: 'nicole', age: 23 } ]

arr2[3][1] = 4000
console.log(arr) // [ 1, 2, 3, [ 1000, 4000 ], { name: 'nicole', age: 23 } ]
console.log(arr2) // [ 1, 2, 3, [ 1000, 4000 ], { name: 'nicole', age: 23 } ]

// 对象也是一样
```

扩展运算符可以与解构赋值结合起来，用于生成数组

```js
const [first, ...rest] = [1, 2, 3, 4, 5]
console.log(first, rest) // 1 [ 2, 3, 4, 5 ]

const [first1, ...rest1] = []
console.log(first1, rest1) // undefined []

const [first2, ...rest2] = ['a']
console.log(first2, rest2) // a []
```

如果将扩展运算符用于数组赋值，只能放参数的最后一位，否则会报错

```js
const [...arr,arr2] = [1,2,3,4,5]  // SyntaxError: Rest element must be last element
```

可以将字符串转换为真正的数组

```js
console.log([...'hello']) // [ 'h', 'e', 'l', 'l', 'o' ]
```

定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转换为真正的数组

```js
const nodeList = document.querySelectorAll('div')
const array = [...nodeList]

const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
])

console.log(map.keys()) // [Map Iterator] { 1, 2, 3 }
console.log([...map.keys()]) // [ 1, 2, 3 ]
```

如果对没有 Iterator 接口的对象，使用扩展运算符，将会报错

```js
const obj = {
  a: 1,
  b: 2,
}

const arr = [...obj] // TypeError: obj is not iterable
```

## 二、构造函数新增的方法

关于构造函数，数组新增的方法有如下：

- Array.from()
- Array.of()

### Array.from()

将两类对象转换为真正的数组：**类似数组的对象** 和 **可遍历（Iterable）的对象**（包括 **ES6** 新增的数据结构 **Set** 和 **Map**）

```js
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
}

console.log(Array.from(arrayLike)) // [ 'a', 'b', 'c' ]
```

还可以接受第二个参数，用来对每个元素进行处理，将处理后的值放入返回的数组

```js
const arr = [1, 2, 3]

const arr2 = Array.from(arr, (x) => x * x) // [ 1, 4, 9 ]
```

### Array.of()

用于将一组值，转换为数组

```js
Array.of(1, 2, 3) // [1,2,3]
```

没有参数的时候，返回一个空数组

当参数只有一个的时候，实际上是指定数组的长度

参数个数不少于两个的时候，**Array()**才会返回由参数组成的新数组

```js
console.log(Array()) // []
console.log(Array(3)) // [ <3 empty items> ]
console.log(Array(1, 2, 3)) // [ 1, 2, 3 ]
```

## 三、实例对象新增的方法

关于数组实例对象新增的方法有如下：

- copyWithin()
- find()、findIndex()
- fill()
- entries()，keys()，values()
- includes()
- flat()，flatMap()

### copyWithin()

将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回数组

参数如下：

- target（必需）：从该位置开始替换数据。如果为负值，表示倒数
- start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示从末尾开始算
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算

```js
console.log([1, 2, 3, 4, 5].copyWithin(2, 3))
// 将从 第四位直到数组结束的成员(4,5)复制到 第二位开始的位置，结果覆盖了原来数组的成员 (3,4)
// [ 1, 2, 4, 5, 5 ]
```

### find()、findIndex()

**find()**用于找出第一个符合条件的数组成员

参数是一个回调函数，接受三个参数依次为当前值、当前的位置和原数组

```js
;[1, 5, 10, 15].find((value, index, arr) => value > 9) // 10
```

**findIndex()** 返回第一个符合条件的数组成员的位置，如果所有数组成员都不符合条件，则返回 **-1**

```js
;[1, 5, 10, 15].findIndex((value, index, arr) => value > 9) // 2
```

这两个方法都可以接受第二个参数，用来绑定回调函数的 **this** 对象

```js
function f(v) {
  return v > this.age
}

const person = {
  name: 'nicole',
  age: 20,
}

console.log([18, 20, 28, 46].find(f, person)) // 28
```

### fill()

使用给定值，填充一个数组

```js
;[1, 2, 3].fill(4) // [4, 4, 4]

Array.from({ length: 3 }).fill(8) // [ 8, 8, 8 ]
```

还可以接收第二个和第三个参数，用于指定填充的起始位置和结束位置

```js
const arr = [1, 2, 3, 4, 5]

console.log(arr.fill(7, 2, 4)) // [ 1, 2, 7, 7, 5 ]
```

如果填充的是对象，则是浅拷贝

### entries()，keys()，values()

**keys()** 是对键名的遍历、**value()** 是对键值的遍历、**entries()** 是对键值对的遍历

```js
for (const index of ['a', 'b'].keys()) console.log(index)

// 0
// 1

for (const elem of ['a', 'b'].values()) console.log(elem)

// a
// b

for (const [index, elem] of ['a', 'b'].entries()) console.log(index, elem)

// 0 a
// 1 b
```

### includes()

用于判断数组是否包含给定的值

```js
console.log([1, 2, 3].includes(4)) // false

console.log([1, 2, 3].includes(1)) // true

console.log([1, 2, 3, Number.NaN].includes(Number.NaN)) // true
```

方法的第二个参数表示搜索的起始位置，默认为 **0**

参数为负数则表示倒数的位置

```js
console.log([1, 2, 3, 4, 10, 6].includes(1, 2)) // false

console.log([1, 2, 3, 4, 10, 6].includes(10, -2)) // true
```

### flat()，flatMap()

将数组扁平化处理，返回一个新数组，对原数组没有影响

```js
console.log([1, 2, 3, [4, 5]].flat()) // [1,2,3,4,5]
```

**flat()** 默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将 **flat()** 方法的参数写成一个整数，表示想要拉平的层数，默认为1

```js
console.log([1, 2, 3, [4, [5, 6]]].flat()) // [ 1, 2, 3, 4, [ 5, 6 ] ]
console.log([1, 2, 3, [4, [5, 6]]].flat(2)) // [1,2,3,4,5,6]
```

**flatMap()** 方法对原数组的每个成员执行一个函数相当于执行 **Array.prototype.map()**，然后对返回值组成的数组执行 **flat()** 方法。该方法返回一个新数组，不改变原数组

```js
// 相当于[[1,2],[2,4],[3,6]].flat()
console.log([1, 2, 3].flatMap((x) => [x, x * 2]))
// [ 1, 2, 2, 4, 3, 6 ]
```

**flatMap()** 方法还可以有第二个参数，用来绑定遍历函数里面的 **this**

```js
function f(x) {
  return [x, x * this.age]
}

const person = {
  name: 'nicole',
  age: 20,
}
console.log([1, 2, 3].flatMap((x) => [x, x * this.age], person))
// [ 1, NaN, 2, NaN, 3, NaN ]

console.log([1, 2, 3].flatMap(f, person))
// [ 1, 20, 2, 40, 3, 60 ]
```

## 四、数组的空位

数组的空位指，数组的某一个位置没有任何值

ES6 则是明确将空位转为 **undefined** ，包括 **Array.from**、**扩展运算符**、**copyWithin()**、**fill()**、**entries()**、**keys()**、**values()**、**find()** 和 **findIndex()**

建议大家在日常书写中，避免出现空位

## 五、排序的稳定性

将 **sort()** 默认设置为稳定的排序算法

```js
const arr = ['peach', 'straw', 'apple', 'spork']

arr.sort((s1, s2) => {
  if (s1[0] < s2[0]) return -1

  return 1
})
// [ 'apple', 'peach', 'straw', 'spork' ]
```

排序结果中，**straw** 在 **spork** 的前面，跟原始顺序一致

[本章来源](https://vue3js.cn/interview/es6/array.htm)
