---
title: 'es6系列'
description: '面试题'
pubDate: '2024-09-17 12:36:00'
category: 'interview'
cardImage: '@images/interview/es6/main/main.png'
tags: ['interview', 'es6']
selected: true
---

# ES6 系列

## [var、let、const](https://celestial-virid.vercel.app/posts/interview/es6/es6-varletconst)

### var

- 用 var 声明过的变量既是全局变量也是顶层变量

- 存在变量提升

- 能进行多次声明

- 函数内使用 var 是局部的，如果不用 var 则是全局的

### let

- let 声明的变量，只在 let 命令所在的代码块内有效

- 不存在变量提升

- 声明前不可用，存在"暂时性死区"

- 不能重复声明

### const

- 一旦声明，立即赋值

- 简单数据类型变量值直接保存在内存地址，类似常量

- 复杂数据类型变量保存指向数据的指针，const固定指针而非数据结构。

- 与 let 相同

### 区别

- 变量提升

  - var

        - 存在变量提升，声明前，可以调用，值为 undefined

  - let、const

        - 不存在变量提升，声明前，不能调用

- 暂时性死区

  - var

    - 不存在暂时性死区

  - let、const

    - 存在暂时性死区，只有等到声明变量的那
      一行代码出现，才可以获取和使用该变量

- 块级作用域

  - var

        - 不存在块级作用域

  - let、const

        - 存在块级作用域

- 重复声明

  - var

        - 允许重复声明

  - let、const

        - 不允许重复声明

- 修改声明的变量

  - var、let

        - 允许修改

  - const

        - 不能修改

- 使用

  - 能用 const 的情况尽量使用 const，其他情况下大多数使用 let，避免使用 var

## [数组新增扩展](https://celestial-virid.vercel.app/posts/interview/es6/es6-array-extend)

### 扩展运算符

- 将一个数组转为用逗号分隔的参数序列

- 扩展运算符实现的浅拷贝复制

- 扩展运算符可以与解构赋值结合起来
  ，用于生成数组

- 如果将扩展运算符用于数组赋值，只能
  放在参数的最后一位，否则会报错

- 可以将字符串转为真正的数组

- 处理具有遍历器接口的对象。对于
  无遍历器接口的对象，会导致报错。

### 构造函数新增方法

- Array.from()

  - 可以将 类似数组的对象和可遍
    的对象 转换为真正的数组

  - 接受第二个参数，用来对每个元素进行
    处理，将处理后的值放入返回的数组

- Array.of()

  - 用于将一组值，转换为数组

  - 没有参数的时候，返回一个空数组

### 实例对象新增方法

- copyWithin(target,start,end)

  - 将指定位置的成员复制到其他位置
    （会覆盖原有成员），然后返回当前数组

- find(value, index, arr)
  findIndex(value, index, arr)

  - find() 用于找出第一个符合条件的数组成员

  - findIndex() 返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1

- fill()

  - 使用给定值，填充一个数组

  - 填充如果是对象，则是浅拷贝

- entries()，keys()，values()

  - keys()是对键名的遍历、

  - values()是对键值的遍历、

  - entries()是对键值对的遍历

- includes()

  - 用于判断数组是否包含给定的值

  - 方法的第二个参数表示搜索的起始位置
    ，默认为0

- flat()，flatMap()

  - 将数组扁平化处理，返回一个新数组
    ，对原数据没有影响

  - flat()默认一层“拉平”，指定整数参数可多层“拉平”，默认参数为1。

  - flatMap() 类似于 map()，对原数组成员执行函数后，对返回数组执行 flat()，生成新数组，原数组不变。

## [对象新增扩展](https://celestial-virid.vercel.app/posts/interview/es6/es6-object-extend)

### 属性的简写

- 当对象键名与对应值名相等的时候
  ，可以进行简写

- 方法也能够进行简写

- 简写的对象方法不能用作构造函数
  ，否则会报错

### 属性名表达式

- 允许字面量定义对象时，
  将表达式放在括号内[]

- 表达式还可以用于定义方法名

- 属性名表达式与简洁表示法，
  不能同时使用，会报错

### super 关键字

- 指向当前对象的原型对象

### 扩展运算符的应用

- 在解构赋值中，未被读取的可遍历的
  属性，分配到指定的对象上面

- 解构赋值必须是最后一个
  参数，否则会报错

- 对象的扩展运算符等同于使用
  Object.assign()方法

### 属性的遍历

- 遍历的方法

  - for...in

  - Object.keys(obj)

  - Object.getOwnPropertyNames(obj)

  - Object.getOwnPropertySymbols(obj)

  - Reflect.ownKeys(obj)

- 遵循的顺序

  - 首先遍历所有数值键，按照数值升序排列

  - 其次遍历所有字符串键，按照加入时间升序排列

  - 最后遍历所有 Symbol 键，按照加入时间升序排

### 对象新增的方法

- Object.is()

  - 严格判断两个值是否相等，与严格比较运算符（===）的行为基本一致

  - 和严格比较预算符相反
    Object.is(+0, -0) // false
    Object.is(NaN, NaN)// true

- Object.assign()

  - Object.assign()方法用于对象的合并

  - 第一个参数是目标对象，后面的参数都是源对象

  - Object.assign()方法是浅拷贝，
    遇到同名属性会进行替换

- Object.getOwnPropertyDescriptors()

  - 返回指定对象所有自身属性
    （非继承属性）的描述对象

- Object.setPrototypeOf()，Object.getPrototypeOf()

  - Object.setPrototypeOf
    方法用来设置一个对象的原型对象

  - Object.setPrototypeOf
    用于读取一个对象的原型对象

- Object.keys()，Object.values()，Object.entries()

  - Object.keys() 返回自身的所有可遍历属性的键名的数组

  - Object.values() 返回自身的所有可遍历属性的键对应值的数组

  - Object.entries() 返回一个对象自身的所有可遍历属性的键值对的数组

- Object.fromEntries()

  - 用于将一个键值对数组转为对象

## [函数新增扩展](https://celestial-virid.vercel.app/posts/interview/es6/es6-function-extend)

### 参数

- 允许为函数的参数设置默认值

- 函数的形参是默认声明的，
  不能使用let或const再次声明

- 参数默认值可以与解构赋值的
  默认值结合起来使用

- 默认参数应在函数尾部设置，
  否则非尾部参数无法省略。

### 属性

- 函数的 length 属性

  - length 将返回没有指定默认值的参数个数

  - rest 参数也不会计入 length 属性

  - 如果设置了默认值的参数不是尾参数
    length 属性也不再计入后面的参数了

- name 属性

  - 返回该函数的函数名

  - 具名函数赋值给变量，name属性取函数原名

  - Function构造函数返回实例，name为"anonymous"

  - bind返回函数，name加"bound"前缀。

### 作用域

- 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域

### 严格模式

- 只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错

### 箭头函数

- 使用“箭头”（=>）定义函数

## [Set、Map](https://celestial-virid.vercel.app/posts/interview/es6/es6-set-map)

### Set

- 集合的数据结构

  - 是由一堆无序的、相关联的，且不重复的内存结构【数学中称为元素】组成的组合

- 增删改查

  - size 属性

    - size 属性返回 Set 结构的成员总数

  - add()

    - 添加某个值，返回 Set 结构本身

  - delete()

    - 删除某个值，返回一个布尔值，
      表示删除是否成功

  - has()

    - 返回一个布尔值，判断
      该值是否为 Set 的成员

  - clear()

    - 清除所有成员，没有返回值

- 遍历

  - keys()：返回键名的遍历器

  - values()：返回键值的遍历器

  - entries()：返回键值对的遍历器

  - forEach()：使用回调函数遍历每个成员

- 使用场景

  - 并集、交集、和差集

  - 数组去重

### Map

- 字典的数据结构

  - 是一些元素的集合。每个元素有一个称作 key 的域，不同元素的 key 各不相同

- 增删改查

  - size 属性

    - size 属性返回 Map 结构的成员总数

  - set()

    - 设置键名 key 对应的键值为 value，
      然后返回整个 Map 结构

  - get()

    - get方法读取 key 对应的键值，
      如果找不到 key，返回 undefined

  - has()

    - has 方法返回一个布尔值，
      表示某个键是否在当前 Map 对象之中

  - delete()

    - delete 方法删除某个键，返回 true。
      如果删除失败，返回 false

  - clear()

    - clear 方法清除所有成员，没有返回值

- 遍历

  - keys()：返回键名的遍历器

  - values()：返回键值的遍历器

  - entries()：返回所有成员的遍历器

  - forEach()：遍历 Map 的所有成员

### WeakSet 和 WeakMap

- WeakSet

  - 与 Set 区别

    - 没有遍历操作的 API

    - 没有 size 属性

  - WeakSet 成员只能是引用类型，
    而不能是其他类型的值

  - WeakSet里面的引用只要在外部消失，
    它在 WeakSet 里面的引用就会自动消失

- WeakMap

  - 与 Map 区别

        - 没有遍历操作的 API

        - 没有 clear 清空方法

  - WeakMap 只接受对象作为键名（null除外），不接受其他类型的值作为键名

  - WeakMap 的键名所指向的对象，一旦不再需要，里面的键名对象和所对应的键值对会自动消失，不用手动删除引用

## [Promise](https://celestial-virid.vercel.app/posts/interview/es6/es6-promise)

### 介绍

- Promise，译为承诺，是异步编程的一种解决方案，比传统的解决方案（回调函数）更加合理和更加强大

- 状态

  - pending（进行中）

  - fulfilled（已成功）

  - rejected（已失败）

- 特点

  - 对象的状态不受外界影响，只有异步操作
    的结果，可以决定当前是哪一种状态

  - 一旦状态改变，就不会再变，
    任何时候都可以得到这个结果

### 用法

- Promise 对象是一个构造函数，用来生成Promise 实例

- Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject

- 实例方法

  - then()

    - 实例状态发生改变时的回调函数

  - catch()

    - 指定发生错误时的回调函数

  - finally()

    - 不管 Promise 对象最后状态如何，
      都会执行的操作

- 构造函数方法

  - all()

        - 等待所有Promise fulfilled，传递各返回值数组一旦有一个rejected → all也rejected，传递首个 reject 实例返回值

  - race()

        - 只要 p1、p2、p3 之中有一个实例率先改变状态，p的状态就跟着改变

  - allSettled()

        - 只有等到所有这些参数实例都返回结果，不管是fulfilled 还是rejected，包装实例才会结束

  - resolve()

        - 将现有对象转为 Promise 对象

  - reject()

        - 会返回一个新的 Promise 实例，该实例的状态为rejected

  - try()

### 使用场景

- 图片加载

## [Generator](https://celestial-virid.vercel.app/posts/interview/es6/es6-generator)

### 介绍

- 一种异步编程解决方案，语法行为与传统函数完全不同

- 解决异步函数的手段

  - 回调函数

  - promise

- 执行 Generator 函数会返回一个遍历器对象，可以依次遍历 Generator 函数内部的每一个状态

- 特征

  - function关键字与函数名之间有一个星号

  - 函数体内部使用 yield 表达式，
    定义不同的内部状态

### 使用

- Generator 函数会返回一个遍历器对象，即具有Symbol.iterator 属性，并且返回给自己

- 通过 yield 关键字可以暂停 generator函数返回的遍历器对象的状态

- 可以通过 for...of 进行遍历

### 异步解决方案

- 回调函数

  - 把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，再调用这个函数

- Promise 对象

  - 为了解决回调地狱而产生的，将回调函数的嵌套，改成链式调用

- generator 函数

  - yield 表达式可以暂停函数执行，next 方法用于恢复函数执行，这使得 Generator 函数非常适合将异步任务同步化

- async/await

  - 将上面 Generator 函数改成 async/await 形式，更为简洁，语义化更强了

- 区别

  - promise 和 async/await 是专门用于处理异步操作的

  - promise 编写代码相比 Generator、async 更为复杂化，且可读性也稍差

  - Generator、async 需要与 promise 对象搭配处理异步情况

  - async 实质是 Generator 的语法糖，相当于会自动执行 Generator 函数

  - async 使用上更为简洁，将异步代码以同步的形式进行编写，是处理异步编程的最终方案

### 使用场景

## [Proxy](https://celestial-virid.vercel.app/posts/interview/es6/es6-proxy)

### 介绍

- 定义

  - 用于定义基本操作的自定义行为

- 性质

  - 修改的是程序默认形为，就形同于在编程语言层面上做修改，属于元编程

### 用法

- Proxy 为构造函数，用来生成 Proxy 实例

- 参数

  - target 表示所要拦截的目标对象

  - handler 通常以函数作为属性的对象

- handler 解析

  - get(target,propKey,receiver)：拦截对象属性的读取

  - set(target,propKey,value,receiver)：拦截对象属性的设置

  - has(target,propKey)：拦截 propKey in proxy的操作，返回一个布尔值

  - deleteProperty(target,propKey)：拦截delete proxy[propKey] 的操作，返回一个布尔值

  - ...

- Reflect

  - 若需要在 Proxy 内部调用对象的默认行为，建议使用 Reflect

### 使用场景

- 常用功能

  - 拦截和监视外部对对象的访问

  - 降低函数或类的复杂度

  - 在复杂操作前对操作进行校验或对所需资源进行管理

## [Module](https://celestial-virid.vercel.app/posts/interview/es6/es6-module)

### 介绍

- 能够单独命名并独立地完成一定功能的程序语句的集合（即程序代码和数据结构的集合体）

- 两个基本特征

  - 外部特征是指模块跟外部环境联系的接口和模块的功能

  - 内部特征是指模块的内部环境具有的特点

- 为什么需要封装

  - 代码抽象

  - 代码封装

  - 代码复用

  - 依赖管理

  - 如果没有模块化

        - 变量和方法不容易维护，容易污染全局作用域

        - 加载资源的方式通过 script 标签从上到下。

        - 依赖的环境主观逻辑偏重，代码较多就会比较复杂。

        - 大型项目资源难以维护，特别是多人合作的情况下，资源的引入会让人奔溃

- AMD

  - 代表库为 require.js

  - 采用异步方式加载模块

- CommonJs

  - node.js 使用的语法

  - 特点

        - 所有代码都运行在模块作用域，不会污染全局作用域

        - 模块是同步加载的，即只有加载完成，才能执行后面的操作

        - 模块在首次执行后就会缓存，再次加载只返回缓存结果，如果想要再次执行，可清除缓存

        - require 返回的值是被输出的值的拷贝，模块内部的变化也不会影响这个值

- ECMAScript

  - require 是运行时加载，import 是编译时加载

  - require 可以写在代码的任意位置，import 只能写在文件的最顶端

### 使用

- 两个命令

  - export：用于规定模块的对外接口

  - import：用于输入其他模块提供的功能

- 动态加载

  - 允许您仅在需要时动态加载模块，而不必预先加载所有模块，这存在明显的性能优势

- 复合写法

  - 如果在一个模块之中，先输入后输出同一个模块，import 语句可以与 export 语句写在一起

### 应用场景

## [Decorator](https://celestial-virid.vercel.app/posts/interview/es6/es6-decorator)

### 介绍

- 装饰者模式就是一种在不改变原类和使用继承的情况下，动态地扩展对象功能的设计理论。

### 用法

- 类的装饰

  - 当对类本身进行装饰的时候，
    能够接受一个参数，即类本身

- 类属性的装饰

  - 接受三个参数

    - 类的原型对象

    - 需要装饰的属性名

    - 装饰属性名的描述对象

  - 如果一个方法有多个装饰器，就像洋葱一样，
    先从外到内进入，再由内到外执行

  - 装饰器不能用于修饰函数，因为函数存在变量声明情况

### 使用场景
