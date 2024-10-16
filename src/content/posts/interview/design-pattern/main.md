---
title: '设计模式系列'
description: '面试题'
pubDate: '2024-10-17 07:58:00'
category: 'interview'
cardImage: '@images/interview/design-pattern/main/main.png'
tags: ['interview', 'design-pattern']
selected: true
---

## [工厂模式](https://celestial-virid.vercel.app/posts/interview/design-pattern/factory-pattern)

### 介绍

- 工厂模式是用来创建对象的一种最常用的设计模式，不暴露创建对象的具体逻辑，而是将将逻辑封装在一个函数中，那么这个函数就可以被视为一个工厂

### 分类

- 简单工厂模式（Simple Factory）

- 工厂方法模式（Factory Method）

- 抽象工厂模式（Abstract Factory）

## [策略模式](https://celestial-virid.vercel.app/posts/interview/design-pattern/strategy-pattern)

### 介绍

- 策略模式（Strategy Pattern）指的是定义一系列的算法，把它们一个个封装起来，目的就是将算法的使用与算法的实现分离开来

### 优点

- 策略模式利用组合，委托等技术和思想，有效的避免很多if条件语句

- 策略模式提供了开放-封闭原则，使代码更容易理解和扩展

- 策略模式中的代码可以复用

## [单例模式](https://celestial-virid.vercel.app/posts/interview/design-pattern/single-pattern)

### 介绍

- 创建型模式，提供了一种创建对象的最佳方式，这种模式涉及到一个单一的类，该类负责创建自己的对象，同时确保只有单个对象被创建

## [设计模式](https://celestial-virid.vercel.app/posts/interview/design-pattern/design-pattern)

### 介绍

- 设计模式是对软件设计中普遍存在的各种问题所提出的解决方案

### 常见设计模式

- 单例模式

- 工厂模式

- 策略模式

- 代理模式

- 中介者模式

- 装饰者模式

## [代理模式](https://celestial-virid.vercel.app/posts/interview/design-pattern/proxy-pattern)

### 介绍

- 代理模式（Proxy Pattern）是为一个对象提供一个代用品或占位符，以便控制对它的访问

### 分类

- 缓存代理

  - 缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一致，则可以直接返回前面存储的运算结果

- 虚拟代理

  - 虚拟代理把一些开销很大的对象，延迟到真正需要它的时候才去创建

## [发布订阅、观察者模式](https://celestial-virid.vercel.app/posts/interview/design-pattern/observer-pattern)

### 观察者模式

### 发布订阅

### 区别

- 观察者模式：某公司给自己员工发月饼发粽子，是由公司的行政部门发送的，这件事不适合交给第三方，原因是“公司”和“员工”是一个整体

- 发布-订阅模式：某公司要给其他人发各种快递，因为“公司”和“其他人”是独立的，其唯一的桥梁是“快递”，所以这件事适合交给第三方快递公司解决
