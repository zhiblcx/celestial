---
title: '原型和原型链'
description: '深入理解原型和原型链'
pubDate: '2024-07-08 16:09:00'
category: 'interview'
cardImage: '@images/interview/prototype-prototypeChain.jpg'
tags: ['interview', 'javascript', 'prototype', 'prototype chain']
selected: true
---

## 原型是什么

在 JavaScript 中，每个对象都有一个与之关联的原型对象。原型对象是一个普通的对象，它包含了一些属性和方法，这些属性和方法可以被其他对象继承。

## 原型的特点

1. 原型对象中的属性和方法可以被多个对象共享。
2. 当访问一个对象的属性或方法时，如果该对象本身没有该属性或方法，则会去它的原型对象中查找。
3. 原型对象也有自己的原型对象，这样就形成了一个原型链。

![''](@images//interview/prototype-prototypeChain/image.png)

![''](@images//interview/prototype-prototypeChain/image2.png)

## 原型的使用

```javascript
// 原型对象
function Person(name, age) {
  this.name = name
  this.age = age
}

// 在 Person 的原型链上挂载属性和方法
Person.prototype.species = '人类'
Person.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name}, I'm ${this.age} years old.`)
}

const person1 = new Person('nicole', '20')
person1.sayHello()
```
