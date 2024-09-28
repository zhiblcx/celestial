---
title: 'React系列'
description: 'React系列 ——面试题'
pubDate: '2024-09-22 20:41:00'
category: 'interview'
cardImage: '@images/interview/react/main/main.png'
tags: ['interview', 'react']
selected: true
---

# [React 系列](https://celestial-virid.vercel.app/posts/interview/react/main/)

## [React的理解](https://celestial-virid.vercel.app/posts/interview/react/react-understand)

### 介绍

- 构建用户界面的 JavaScript 库

- 遵循组件设计模式、声明式编程范式和函数式编程概念

- 使用 虚拟dom 来有效操作 dom，遵循从高阶组件到低阶组件的单向数据流

### 特性

- jsx 语法

- 单向数据绑定

- 虚拟 dom

- 声明式编程

  - 做什么，而不是如何做

  - 表达逻辑，而不是显示定义步骤

- Component

  - 函数式组件

  - 类组件

  - 特点

        - 可组合

        - 可重用

        - 可维护

### 优势

- 高效灵活

- 声明式的设计，简单使用

- 组件式开发，提高代码复用率

- 单向响应的数据流会比双向绑定的更安全，速度更快

## [真实DOM和虚拟DOM](https://celestial-virid.vercel.app/posts/interview/react/react-real-dom-virtual-dom)

### 介绍

- real DOM，真实DOM，意思为文档对象模型

- virtual DOM，本质上是以 JavaScript 对象形式存在的对 DOM 的描述

- 创建虚拟DOM目的就是为了更好的将虚拟的节点渲染到页面视图上

### 区别

- 虚拟DOM不会进行排版与重绘，而真实的DOM会频繁重排与重绘

- 虚拟DOM的总耗损是“虚拟DOM增删改+真实DOM差异的增删改+排版与重绘”，真实DOM的总耗损是“真实DOM完全增删改+排版与重绘”

### 优缺点

- 真实DOM

  - 优点

        - 易用

  - 缺点

        - 效率低，解析速度慢，内存占用量过高

        - 性能差：频繁操作真实DOM，易于导致重绘与回流

- 虚拟DOM

  - 优点

        - 简单方便

        - 使用虚拟DOM，有效避免真实DOM频繁更新，减少多次重绘与回流，提高性能

        - 跨平台

  - 缺点

        - 在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化

        - 首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算，速度比正常稍慢

## [React 生命周期](https://celestial-virid.vercel.app/posts/interview/react/react-life-cycle)

### 介绍

- react 组件从挂载到更新再到卸载的一个过程

### 流程

- 创建阶段

  - constructor

        - 初始化 state 状态

        - 在 this 上挂载方法

  - getDerivedStateFromProps

        - 组件创建和更新阶段，props或state变化时触发

        - 在 render 之前调用，参数为即将更新的props和上一个state

        - 可用于比较 props 和 state，添加限制条件避免无用 state 更新

        - 返回新对象更新 state，或者返回 null 无需更新

  - render

        - 类组件必须实现的方法，用于渲染 DOM 结构，可以访问组件 state 与 prop 属性

  - componentDidMount

        - 组件挂载到真实 DOM 节点后执行，其在 render方法之后执行

- 更新阶段

  - getDerivedStateFromProps

        - 同上

  - shouldComponentUpdate

        - 用于告知组件本身基于当前的props和state是否需要重新渲染组件，默认情况返回true

        - 到新的 props 或者 state 时都会调用，通过返回 true 或者 false 告知组件更新与否

  - render

        - 同上

  - getSnapshotBeforeUpdate

        - 该函数在 render 之后执行，执行之时 dom 元素还没更新

  - componentDidUpdate

        - 组件更新结束后触发

        - 根据前后的 props 和 state 的变化做相应的操作，如获取数据，修改 DOM 样式等

- 卸载阶段

  - componentWillUnmount

        - 此方法用于组件卸载前，清理一些注册是监听事件，或者取消订阅的网络请求等

        - 一旦一个组件实例被卸载，其不会被再次挂载，而只可能是被重新创建

## [state 和 props](https://celestial-virid.vercel.app/posts/interview/react/react-state-props)

### state

- 一个组件的显示形态可以由数据状态和外部参数所决定。state 就是数据状态

### props

- 单向数据流，主要作用是父组件向子组件传递数据

### 区别

- 相同点

  - 两者都是 JavaScript 对象

  - 两者都用于保存信息

  - props 和 state 都能触发渲染更新

- 不同点

  - props 是外部传递给组件的，而 state 是在组件内部被组件自己管理的，一般在 constructor 初始化

  - props 在组件内部不可修改，state 可以在组件内部修改

  - state 是多变的，可以修改的

## [super()和super(props) 有什么区别](https://celestial-virid.vercel.app/posts/interview/react/react-super-superprops)

### ES6 类

- 通过 extends 关键字实现类继承

### 类组件

### 总结

## [setState执行机制](https://celestial-virid.vercel.app/posts/interview/react/react-setstate)

### 介绍

- 数据状态：state

- 修改 state 的值需要调用 setState 来改变，从而达到更新组件内部数据的作用

### 更新类型

- 同步更新

- 异步更新

- 小结

  - 在组件生命周期或 React 合成事件中，setState是异步

  - 在 setTimeout 或者原生 dom 事件中，setState 是同步

## [React事件机制](https://celestial-virid.vercel.app/posts/interview/react/react-event-mechanism)

### 介绍

- 事件机制包括事件的注册、事件的合成、事件冒泡、事件派发，事件机制在React 中称之为合成事件

- 合成事件

  - React 模拟原生 DOM 事件所有能力
    一个事件对象

- React 事件和原生事件的区别

  - 事件名称命名方式不同

  - 事件处理函数书写不同

### 执行顺序

- React 所有事件都挂载在 document 对象上

- 当真实 DOM 元素触发事件，会冒泡到 document 对象后，再处理 React 事件

- 所以会先执行原生事件，然后处理 React 事件

- 最后真正执行 document 上挂载的事件

### 总结

## [React事件绑定](https://celestial-virid.vercel.app/posts/interview/react/react-event-binding)

### 介绍

- 事件名用小驼峰书写

- 事件绑定的方法要用{}包住

### 如何绑定

- render方法中使用bind

- render方法中使用箭头函数

- constructor中bind

- 定义阶段使用箭头函数绑定

### 区别

- 编写方面，方法一和方法二过于简单，方法三过于冗余

- 性能方面，方法一和方法二在每次组件 render 的时候都会形成新的实例，性能欠缺

## [React 构建组件](https://celestial-virid.vercel.app/posts/interview/react/react-build-component)

### 介绍

- 组件就是把图形、非图形的各种逻辑均抽象为一个统一的概念（组件）来实现开发的模式

- 组件优势

  - 降低整个系统的耦合度

  - 调试方便

  - 提高可维护性

### 如何构建

- 函数式创建

- 通过 React.createClass 方法创建

- 继承 React.Component 创建

### 区别

- 无状态组件建立使用函数式组件

- 由于hooks 出现，都使用函数式组件

## [React 组件通信](https://celestial-virid.vercel.app/posts/interview/react/react-component-communication)

### 介绍

- 组件

- 通信

- 组件间通信即指组件通过某种方式来传递信息以达到某个目的

### 如何通信

- 父组件向子组件传递

- 子组件向父组件传递

- 兄弟组件之间的通信

- 父组件向后代组件传递

- 非关系组件传递

### 总结

- react 是单向数据流，不会改变接收的数据

- 当数据发生变化会使用新接收的值，不去改变已有的值

## [React 中的 key](https://celestial-virid.vercel.app/posts/interview/react/react-key)

### 介绍

- key 是用来帮助 React 识别哪些子元素已经在之前的渲染中存在、被修改或被移除的一个特殊字符串属性

- key 属性应该在指定列表中的每个子元素上使用，并且这个 key 值应该在同一个数组中保持唯一。

- 如果在列表中的子元素没有唯一的 key，React 在渲染时会给出警告

### 作用

- 提高更新性能

- 避免警告

### 总结

- key 应该是唯一的

- key不要使用随机值（随机数在下一次 render 时，会重新生成一个数字）

- 使用 index 作为 key值，对性能没有优化

## [受控组件和非受控组件](https://celestial-virid.vercel.app/posts/interview/react/react-controlled-notcontrolled-component)

### 受控组件

- 受我们控制的组件，组件的状态全程响应外部数据

- 一般需要一个初始状态和一个状态更新事件函数

### 非受控组件

- 就是不受我们控制的组件

## [高阶组件](https://celestial-virid.vercel.app/posts/interview/react/react-highter-order-component)

### 介绍

- 满足其一

  - 接受一个或多个函数作为输入

  - 输出一个函数

### 如何编写

### 应用场景

- 权限控制、日志记录、数据校验、异常处理、统计上报

## [React Hooks](https://celestial-virid.vercel.app/posts/interview/react/react-hooks)

### 介绍

- Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性

### 有哪些

- useState

- useEffect

- useTransition

- ...

### 解决什么

- 每调用 useHook 一次都会生成一份独立的状态

- 通过自定义 hook 能够更好的封装我们的功能

## [React引入css](https://celestial-virid.vercel.app/posts/interview/react/react-import-css)

### 遵循规则

- 可以编写局部css，不会随意污染其他组件内的原生；

- 可以编写动态的css，可以获取当前组件的一些状态，根据状态的变化生成不同的css样式；

- 支持所有的css特性：伪类、动画、媒体查询等；

- 编写起来简洁方便、最好符合一贯的css风格特点

### 方式

- 在组件内直接使用

- 组件中引入 .css 文件

- 组件中引入 .module.css 文件

- CSS in JS

### 区别

- 在组件内直接使用，编写方便，但是容易造成代码混乱

- 组件中引入.css文件，作用域是全局的，样式会重叠

- 引入 .module.css 支持局部解决作用域问题，但是不方便动态修改样式

- 通过 css in js 可以满足大部分应用场景

## [React组件过渡动画](https://celestial-virid.vercel.app/posts/interview/react/react-component-transition)

### 介绍

- 组件在显示和消失过程中存在动画，可以很好的提高用户的体验

### 如何实现

- CSSTransition：在前端开发中，结合 CSS 来完成过渡动画效果

- SwitchTransition：两个组件显示和隐藏切换时，使用该组件

- TransitionGroup：将多个动画组件包裹在其中，一般用于列表中元素的动画

## [React Router的理解](https://celestial-virid.vercel.app/posts/interview/react/react-router-understand)

### 介绍

- 路由的本质就是页面的 URL 发生改变时，页面的显示结果可以根据 URL 的变化而变化，但是页面不会刷新

### 有哪些

- BrowserRouter、HashRouter

- Route

- Link、NavLink

- switch

- redirect

- hooks

  - useHistory

  - useParams

  - useLocation

### 参数传递

- 动态路由的方式

  - 动态路由的概念指的是路由中的路径并不会固定

- search传递参数

  - 在跳转的路径中添加了一些query参数

- to传入对象

## [React Router的模式](https://celestial-virid.vercel.app/posts/interview/react/react-router-mode)

### 两种模式

- hash 模式：在url后面加上#，如<http://127.0.0.1:5500/home/#/page1>

- history 模式：允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录

### 实现原理

- Router 组件主要做的是通过 BrowserRouter 传过来的当前值，通过 props 传进来的 path 与context 传进来的 pathname 进行匹配，然后决定是否执行渲染组件

## [immutable的理解](https://celestial-virid.vercel.app/posts/interview/react/react-immutable)

### 介绍

- 不可改变的，即一旦创建，就不能更改的数据

- 对 immutable 对象的任何增删改都会返回一个新的 immutable 对象

- immutable 实现原理是 持久化数据结构

  - 用一种数据结构来保存数据

  - 当数据被修改时，会返回一个对象，新对象尽量利用之前的数据结构而不会对内存造成浪费

### 如何使用

- 下载 immutable.js 包

- 主要数据类型

  - map

  - list

  - set

- 主要方法

  - fromJS():将一个js数据转换成immutable类型的数据

  - toJS()：将一个Immutable数据转换为JS类型的数据

  - is()：对两个对象进行比较

  - get(key)：对数据或对象取值

  - getIn([]) ：对嵌套对象或数组取值，传参为数组，表示位置

### 如何应用

- 使用 immutable 可以给 React 带来性能优化，主要体现在减少渲染的次数

- 避免了重复渲染

## [React render方法的原理](https://celestial-virid.vercel.app/posts/interview/react/react-render)

### 原理

- render 在类组件指 render 方法

- render 在函数组件指函数组件本身

- 在 render 过程中，React 将新调用的 render 函数返回的树与旧版本的树进行比较，这一步是决定如何更新 DOM 的必要步骤，然后进行 diff 比较，更新 DOM 树

### 执行时机

- 类组件调用 setState 修改状态

- 函数组件通过useState hook修改状态

- 类组件重新渲染

  - 类组件只要触发了 setState 方法就一定触发 render 函数的执行

- 函数组件重新渲染

  - 函数组件使用了 setState 更改状态不一定导致重新 render

### 总结

- setState 会引起类组件重新渲染，而 useState 在函数组件中更新状态时，仅在状态实际变化时触发重新渲染。

- 当组件的 props 改变时，并不一定会触发render 方法的执行，但若这些 props 来源于祖先组件的 state，祖先组件的 state 更新会导致子组件重新渲染。

## [React 渲染效率](https://celestial-virid.vercel.app/posts/interview/react/react-import-component-efficiency)

### 介绍

- 避免不必要的渲染，是业务中常见的优化手段之一

### 如何做

- 类组件，父组件触发render,子组件一定触发render

  - shouldComponentUpdate

        - 对比 state 和 props，确定是否要渲染

  - PureComponent

        - 与shouldComponentUpdate原理基本一致，浅比较

  - 在 React 中，不建议使用深层次结构的数据

- 函数组件

  - useMemo

        - 缓存组件渲染，避免不必要的更新

### 总结

- 尽量拆分组件，粒度变小，减少子组件不必要的渲染

## [React diff](https://celestial-virid.vercel.app/posts/interview/react/react-diff)

### 介绍

- diff 算法就是更高效的对比新旧 virtual DOM 找出真正的 DOM 的变化之处

### 原理

- tree 层级

  - DOM 节点跨层级的操作不做优化，只会对相同层级的节点进行比较

- conponent 层级

  - 如果是同一个类的组件，则会继续往下 diff 运算，如果不是一个类的组件，那么直接删除这个组件下的所有子节点，创建新的

- element 层级

  - 对于比较同一层级的节点们，每个节点在对应的层级用唯一的 key 作为标识

### 注意事项

- 由于 dom 节点的移动操作开销是比较昂贵的，没有 key 的情况下要比有 key 的性能更好

## [Fiber架构](https://celestial-virid.vercel.app/posts/interview/react/react-fiber)

### 问题

- JavaScript引擎 和 页面渲染引擎 两个线程是互斥的，当其中一个线程执行时，另一个线程只能挂起等待

### 是什么

- 从架构角度来看

  - React fiber是 react 核心算法的重写

- 从编码角度来看

  - Fiber 是 React 内部所定义的一种数据结构

- 主要操作

  - 为每个增加了优先级，优先级高的可以中断优先级低的任务

  - 增加了异步任务，调用 requestIdleCallback api ，浏览器空闲的时候执行

  - dom diff 树变成了链表，一个 dom 对应两个fiber（一个链表），对应两个队列，这都是为找到被中断的任务，重新执行

### 如何解决

- 中断与恢复，恢复后也可以复用之前的状态，并给不同的任务赋予不同的优先级

## [Jsx转化真实的DOM](https://celestial-virid.vercel.app/posts/interview/react/react-jsx-transition-dom)

### 介绍

- react 通过将组件编写的 JSX 映射到屏幕，以及组件中的状态发生了变化之后 React 会将这些「变化」更新到屏幕上

- jsx 通过 babel 转换为 React.createElement

- 在转化过程中

  - 当首字母为小写时，其被认定为原生 DOM 标签，createElement 的第一个变量被编译为字符串

  - 当首字母为大写时，其被认定为自定义组件，createElement 的第一个变量被编译为对象

### 过程

- 原生标签节点

- 文本节点

- 函数组件

- 类组件

## [React 性能优化手段](https://celestial-virid.vercel.app/posts/interview/react/react-performance-optimization)

### 介绍

- 避免不必要的渲染

- 避免使用内联函数

- 使用 React Fragments 避免额外标记

- 使用 Immutable

  - 减少渲染次数

- 懒加载组件

  - 减少初始包大小

- 事件绑定方式

- 服务端渲染

### 如何做

- 代码层面

- 工程层面

- 框架机制层面

## [React 捕获异常](https://celestial-virid.vercel.app/posts/interview/react/react-capture-error)

### 介绍

- 错误在我们日常编写代码是非常常见的

### 如何做

- 错误边界是一种 React 组件，这种组件可以捕获发生在其子组件树任何位置的 JavaScript 错误，并打印这些错误，同时展示降级 UI，而并不会渲染那些发生崩溃的子组件树

- 形成错误边界组件的两个条件

  - 使用了 static getDerivedStateFromError()

  - 使用了 componentDidCatch()

- 无法捕获异常

  - 事件处理

  - 异步代码

  - 服务端渲染

  - 自身抛出来的错误

- 对于错误边界无法捕获的异常，如事件处理过程中发生问题并不会捕获到，是因为其不会在渲染期间触发，并不会导致渲染时候问题，可以使用 try...catch... 语法

## [React 服务器端渲染](https://celestial-virid.vercel.app/posts/interview/react/react-service-rendering)

### 介绍

- 指由服务侧完成页面的 HTML 结构拼接的页面处理技术，发送到浏览器，然后为其绑定状态与事件，成为完全可交互页面的过程

- 解决两个问题

  - SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面

  - 加速首屏加载，解决首屏白屏问题

### 如何做

- 手动搭建一个 SSR 框架

- 使用成熟的SSR 框架，如 Next.JS

### 原理

- node server 接收客户端请求，得到 url 路径，去已有的路由表找对应组件，拿到请求数据，将数据作为 props 、comtext 或者 store 传入组件

- 基于 React 内置的服务器端渲染方法renderToString() 把组件渲染成 html 注入浏览器

- 浏览器开始渲染和节点对比，完成事件绑定和交互
