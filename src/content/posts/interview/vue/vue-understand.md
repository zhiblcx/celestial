---
title: 'vue系列 —— 对 vue 的理解'
description: '对 vue 的理解'
pubDate: '2024-09-06 19:05:00'
category: 'interview'
cardImage: '@images/interview/vue/vue-understand.png'
tags: ['interview', 'vue']
selected: true
---

## Vue 是什么

Vue.js 是一个用于构建用户界面的开源 JavaScript 框架，也是一个构建单页面应用的 web 应用框架

## Vue 核心特征

### 1. 数据驱动(MVVM)

**MVVM** 表示的是 **Model-View-ViewModel**

- Model：模型层，主要负责业务逻辑以及和服务器进行交互
- View：视图层，负责将数据模型转化为 UI 展现出来，可以理解为 html 页面
- ViewModel：视图模型层，用来连接 Model 和 View，是 Model 和 View 交互的桥梁

![''](@images/interview/vue/vue-understand/image.png)

### 2. 组件化

(1). 什么是组件化

把图形、非图形的各种逻辑抽象为一个统一的概念（组件）来实现开发的模式，在 **Vue** 中每一个 **.vue** 的文件都可以视为一个组件

(2). 组件化的优势

- 降低整个系统的耦合度，在保证接口的情况下，我们可以替换不同的组件快速完成需求，例如输入框，可以切换为日历、时间、范围等组件作具体的实现。

- 调试方便，由于整个系统都是由通过组件组合起来的，在出现问题的时候，可以用排除法直接移除组件，或者根据报错的组件快速定位问题，之所以能快速定位组件，是因为每个组件之间低耦合，职责单一，所以逻辑会比分析整个系统要简单

- 提高可维护性，由于每个组件的职责单一，并且组件在系统是被复用的，所以当有一个需求要修改时，我们只需要找到对应的组件进行修改，大大提高了可维护性。

### 3. 指令系统

解释：指令（Directives）是带有 v- 前缀的特殊属性作用：当表达式的值改变，将其产生连带的影响，响应式地作用于 DOM

**常用指令**

- 条件渲染指令 **v-if**
- 列表渲染指令 **v-for**
- 属性绑定指令 **v-bind**(简称为 **:** )
- 事件绑定指令 **v-on**(简写为 **@** )
- 双向数据绑定指令 **v-model**

## Vue 跟传统开发的区别

总结就是：

- Vue 所有的界面事件，都是只去操作数据的，Jquery 操作 DOM
- Vue 所有界面的变动，都是根据数据自动绑定出来的，Jquery 操作 DOM

## Vue 和 React 对比

### 相同点

- 都有组件化思想
- 都支持服务器端渲染
- 都有 Virtual DOM (虚拟dom)
- 数据驱动视图
- 都有支持 native 的方案：**Vue** 的 **weex**、**React** 的 **React native**
- 都有自己的构建工具：**Vue** 的 **vue-cli**、**React** 的 **create-react-app**

### 区别

- 数据流向的不同。**React** 从诞生开始就推崇单向数据流，而 **Vue** 是双向数据流
- 数据变化的实现原理不同。**React** 使用的是不可变数据，而 **Vue** 使用的是可变数据
- 组件化通信的不同。**react** 中我们通过使用回调函数来进行通信，而 **Vue** 中子组件向父组件传递消息有两种方式：事件和回调函数
- diff 算法不同。**react** 的 主要使用 diff 队列保存需要更新哪些 DOM，得到 patch 树，再统一操作批量更新 DOM，**Vue** 使用双向指针，边对比，边更新DOM

[文章来源](https://vue3js.cn/interview/vue/vue.html)
