---
title: 'JavaScript系列'
description: 'JavaScript系列 面试题'
pubDate: '2024-10-02 19:52:00'
category: 'interview'
cardImage: '@images/interview/javascript/main/main.png'
tags: ['interview']
selected: true
---

# JavaScript系列

## [作用域链](https://celestial-virid.vercel.app/posts/interview/javascript/js-scope-chain)

### 作用域

- 解释：变量和函数生成的区域或集合

- 全局作用域

- 函数作用域

- 块级作用域

### 词法作用域

- 变量在被创建时就已经确定

### 作用域链

## [原型与原型链](https://celestial-virid.vercel.app/posts/interview/javascript/js-prototype-chain)

### 原型

- prototype

### 原型链

- 原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链

## [继承](https://celestial-virid.vercel.app/posts/interview/javascript/js-extend)

### 解释：面向对象软件技术的一个概念

### 实现方式

- 不使用 Object.create()

  - 原型链继承

  - 构造函数继承

- 使用 Object.create()

  - 原型式继承

  - 寄生式继承

## [this 对象](https://celestial-virid.vercel.app/posts/interview/javascript/js-this-object-understand)

### 定义：函数运行时自动生成一个内部对象，只能在函数内部使用，总指向调用它的对象

### 绑定规则

- 默认规则

  - 全局对象

- 隐式规则

  - 函数还可以作为某个对象的方法调用，这时 this 就指这个上级对象

- new 规则

  - 通过构建函数 new 关键字生成一个实例对象，此时 this 指向这个实例对象

  - 特殊情况

        - new 过程遇到 return 一个对象，此时 this 指向为返回的对象

        - 如果返回一个简单类型的时候，则 this 指向实例对象

- 显示规则

  - apply()、call()、bind()是函数的一个方法，作用是改变函数的调用对象。

### 箭头函数

- 箭头函数的 this 指向所在对象所处于的环境。

### 优先级

- new绑定优先级 > 显示绑定优先级 > 隐式绑定优先级 > 默认绑定优先级

## [执行上下文与执行栈](https://celestial-virid.vercel.app/posts/interview/javascript/js-execution-stack)

### 执行上下文

- 执行上下文是一种对 Javascript 代码执行环境的抽象概念

- 全局执行上下文

- 函数执行上下文

### 生命周期

- 创建阶段

  - 词法环境

        - 全局环境

        - 函数环境

  - 变量环境

        - 变量环境也是一个词法环境

        - 词法环境和变量环境的区别在于前者用于存储函数声明和变量（ let 和 const ）绑定，而后者仅用于存储变量（ var ）绑定

- 执行阶段

- 回收阶段

### 执行栈

- 用于存储在代码执行期间创建的所有执行上下文

## [事件模型](https://celestial-virid.vercel.app/posts/interview/javascript/js-event-model)

### 事件与事件流

- 事件

  - 事件：HTML 文档或者浏览器中发生的一种交互操作，使得网页具备互动

- 事件流

  - 事件捕获阶段

        - 事件捕获是一种从上往下的传播方式

  - 处于目标阶段

        - 触发节点具体的元素

  - 事件冒泡阶段

        - 事件冒泡是一种从下往上的传播方式

### 事件模型

- 原始事件模型

  - 绑定方式

        - HTML 直接绑定

        - JS 绑定

  - 特性

        - 绑定速度快

        - 只支持冒泡，不支持捕获

- 标准事件模型

  - 三个过程

        - 事件捕获阶段

        - 事件处理阶段

        - 事件冒泡阶段

  - 特性

        - 可以处理多个事件处理器

        - 执行时机：useCapture为 true，就在捕获过程中执行，反之在冒泡过程中执行，默认为 false

- IE 事件模型

  - 两个过程

        - 事件处理阶段

        - 事件冒泡阶段

  - 事件绑定监听方式：attachEvent(eventType, handler)

  - 事件移除监听方式：detachEvent(eventType, handler)

## [typeof 与 instanceof](https://celestial-virid.vercel.app/posts/interview/javascript/js-typeof-instanceof)

### typeof

- 返回一个字符串，表示未经计算的操作数的类型

- 只能判断基础数据类型，虽然 typeof null 为 object

### instanceof

- 用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

- 只能判断引用数据类型

## [事件代理](https://celestial-virid.vercel.app/posts/interview/javascript/js-event-proxy)

### 介绍

- 把一个元素响应事件的函数委托到另一个元素

### 应用场景

- 元素的动态增加和删除

### 总结

- 优点

  - 减少整个页面所需的内存，提升整体性能

  - 动态绑定，减少重复工作

- 局限性

  - focus，blur 没有冒泡事件，无法进行事件委托

  - mousemove、mouseout 虽然有冒泡事件，但是对性能消耗高，不适合事件委托

## [new 操作符](https://celestial-virid.vercel.app/posts/interview/javascript/js-new)

### 介绍

- new 操作符用于创建一个给定构造函数的实例对象

- new 通过构造函数创建出来的实例可以访问到构造函数中的属性

- new 通过构造函数创建出来的实例可以访问到构造函数原型链中的属性

- 返回值

  - 简单数据类型：忽略

  - 复杂数据类型：正常处理

### 流程

- 创建一个新的对象 obj

- 将对象与构建函数通过原型链连接起来

- 将构建函数中的 this 绑定到新建的对象 obj 上

- 根据构建函数返回类型作判断，如果是原始值则被忽略，如果是返回对象，需要正常处理

## [ajax 原理](https://celestial-virid.vercel.app/posts/interview/javascript/js-ajax)

### 介绍

- AJAX 全称(Async Javascript and XML)
  即异步的 JavaScript 和 XML 是一种创建交互式网页应用的网页开发技术

### 实现过程

- 创建 Ajax 的核心对象 XMLHttpRequest 对象

- 通过 XMLHttpRequest 对象的 open() 方法与服务端建立连接

- 构建请求所需的数据内容，并通过XMLHttpRequest 对象的 send() 方法发送给服务器端

- 通过 XMLHttpRequest 对象提供的 onreadystatechange 事件监听服务器端你的通信状态

- 接受并处理服务端向客户端响应的数据结果

- 将处理结果更新到 HTML页面中

## [bind、call、apply 区别](https://celestial-virid.vercel.app/posts/interview/javascript/js-bindcallapply-different)

### 作用

- 改变函数运行时的 this 指向

### 区别

- apply

  - 第一个参数是 this 的指向
    第二个参数是函数接收的参数(必须为数组)
    当第一个参数为null或者undefined，默认指向window(在浏览器中)
    改变指向后立即执行

- call

  - 第一个参数是 this 的指向
    第二个参数是参数列表
    当第一个参数为null或者undefined，默认指向window(在浏览器中)
    改变指向后立即执行

- bind

  - 第一个参数是 this 的指向
    第二个参数是参数列表，可以分多次传入
    改变指向后不会立即执行

### 实现

- 修改 this 指向

- 动态传递参数

## [正则表达式](https://celestial-virid.vercel.app/posts/interview/javascript/js-regexp)

### 介绍

- 一种用来匹配字符串强有力的武器

- 设计思想是用一种描述性的语言定义一个规则，凡是符合规则的字符串，我们就认为它“匹配“，否则，该字符串就是不合法的

### 校验规则

- 贪婪模式

  - {n,m} 优先匹配m个，尽可能多的匹配

- 懒惰模式

  - 在贪婪量词后面加个问号，表示尽可能少的匹配

- 分组

  - ()是一组

### 校验方法

- str.match(regexp) 方法在字符串 str 中找到匹配 regexp 的字符

- str.matchAll(regexp) 返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器

- str.search(regexp) 返回第一个匹配项的位置，如果未找到，则返回 -1

- str.replace(regexp) 替换与正则表达式匹配的子串，并返回替换后的字符串。在不设置全局匹配g的时候，只替换第一个匹配成功的字符串片段

- str.split(regexp) 使用正则表达式（或子字符串）作为分隔符来分割字符串

- regexp.exec(str) 方法返回字符串 str 中的 regexp 匹配项，与以前的方法不同，它是在正则表达式而不是字符串上调用的

- regexp.test(str) 查找匹配项，然后返回 true/false 表示是否存在

### 应用场景

- 验证QQ合法性（5~15位、全是数字、不以0开头）

## [事件循环](https://celestial-virid.vercel.app/posts/interview/javascript/js-event-loop)

### 介绍

- 同步任务：立即执行的任务，同步任务一般会直接进入到主线程中执行

- 异步任务：异步执行的任务，比如ajax网络请求，setTimeout定时函数等

- 同步任务进入主线程，即主执行栈，异步任务进入任务队列，主线程内的任务执行完毕为空，会去任务队列读取对应的任务，推入主线程执行。上述过程的不断重复就事件循环

### 宏任务与微任务

- 微任务

  - 一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前

  - 常见的微任务

        - Promise.then

        - MutaionObserver

        - Object.observe（已废弃；Proxy 对象替代）

        - process.nextTick（Node.js）

- 宏任务

  - 宏任务的时间粒度比较大，执行的时间间隔是不能精确控制的，对一些高实时性的需求就不太符合

  - 常见的宏任务

        - script (可以理解为外层同步代码)

        - setTimeout/setInterval

        - UI rendering/UI事件

        - postMessage、MessageChannel

        - setImmediate、I/O（Node.js）

### async 与 await

- async

  - 返回一个promise对象

- await

  - await 命令后面是一个 Promise对象，返回该对象的结果。如果不是 Promise对象，就直接返回对应的值

## [DOM常见操作](https://celestial-virid.vercel.app/posts/interview/javascript/js-dom)

### DOM

- 文档对象模型 (document object model) 是 HTML 和 XML 文档的编程接口

- 它提供了对文档的结构化的表述，并定义了一种方式可以使从程序中对该结构进行访问，从而改变文档的结构，样式和内容

### 操作

- 创建节点

  - createElemen

        - 创建新元素，接受一个参数，即要创建元素的标签名

  - createTextNod

        - 创建一个文本节点

  - createDocumentFragmen

        - 用来创建一个文档碎片，它表示一种轻量级的文档，主要是用来存储临时节点，然后把文档碎片的内容一次性添加到 DOM 中

  - createAttribut

        - 创建属性节点，可以是自定义属性

- 获取节点

  - document.getElementById('id属性值');

        - 返回拥有指定id的对象的引用

  - document.getElementsByClassName('class属性值');

        - 返回拥有指定class的对象集合

  - document.getElementsByTagName('标签名');

        - 返回拥有指定标签名的对象集合

  - document.getElementsByName('name属性值')

        - 返回拥有指定名称的对象结合

  - document/element.querySelector('CSS选择器')

        - 仅返回第一个匹配的元素

  - document/element.querySelectorAll('CSS选择器')

        - 返回所有匹配的元素

  - document.documentElement

        - 获取页面中的HTML标签

  - document.body

        - 获取页面中的BODY标签

  - document.all['']

        - 获取页面中的所有元素节点的对象集合型

- 更新节点

  - innerHTML

        - 不但可以修改一个DOM节点的文本内容，还可以直接通过HTML片段修改DOM节点内部的子树

  - innerText、textContent

        - 自动对字符串进行 HTML 编码，保证无法设置任何 HTML 标签

  - style

        - DOM 节点的 style 属性对应所有的 CSS，可以直接获取或设置。遇到 - 需要转化为驼峰命名

- 添加节点

  - innerHTML

  - appendChild

    - 把一个子节点添加到父节点的最后一个子节点

  - insertBefore

    - 把子节点插入到指定的位置
      parentElement.insertBefore(newElement, referenceElement)
      子节点会插入到referenceElement之前

  - setAttribute

    - 在指定元素中添加一个属性节点，如果元素中已有该属性改变属性值

- 删除节点

  - 删除一个节点，首先要获得该节点本身以及它的父节点，然后，调用父节点的 removeChild 把自己删掉

## [BOM对象](https://celestial-virid.vercel.app/posts/interview/javascript/js-bom)

### 介绍

- BOM (Browser Object Model)，浏览器对象模型，提供了独立于内容与浏览器窗口进行交互的对象

### window

### location

### navigator

### screen

### history

- history 对象主要用来操作浏览器 URL 的历史记录，可以通过参数向前，向后，或者向指定 URL 跳转

## [尾递归](https://celestial-virid.vercel.app/posts/interview/javascript/js-tail-recursion)

### 递归

- 在函数的定义中使用函数自身的方法

### 尾递归

- 在函数尾位置调用自身

### 应用场景

- 数组求和

- 数组扁平化

## [内存泄漏](https://celestial-virid.vercel.app/posts/interview/javascript/js-memory-leak)

### 介绍

- 由于疏忽或错误造成程序未能释放已经不再使用的内存

### 垃圾回收机制

- 垃圾收集器会定期（周期性）找出那些不在继续使用的变量，然后释放其内存

- 两种实现方式

  - 标记清除

  - 引用计数

### 常见内存泄漏情况

- 意外的全局变量

- 闭包

## [JavaScript本地存储](https://celestial-virid.vercel.app/posts/interview/javascript/js-local-storage)

### 方式

- cookie

  - 类型为「小型文本文件」，指某些网站为了辨别用户身份而储存在用户本地终端上的数据。

- sessionStorage

  - 会话存储

- localStorage

  - 本地存储

- indexedDB

  - 底层API，用户客户端存储大量的结构化数据

### 区别

- 存储大小

  - cookie 数据大小不能超过4k，sessionStorage 和 localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大

- 有效时间

  - localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据； sessionStorage 数据在当前浏览器窗口关闭后自动删除；cookie 设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭

- 数据与服务器之间的交互方式

  - cookie 的数据会自动的传递到服务器，服务器端也可以写 cookie 到客户端； sessionStorage 和localStorage 不会自动把数据发给服务器，仅在本地保存

### 应用场景

- 标记用户与跟踪用户行为的情况，推荐使用cookie

- 适合长期保存在本地的数据（令牌），推荐使用localStorage

- 敏感账号一次性登录，推荐使用sessionStorage

- 存储大量数据的情况、在线文档（富文本编辑器）保存编辑历史的情况，推荐使用indexedDB

## [函数式编程](https://celestial-virid.vercel.app/posts/interview/javascript/js-function-code)

### 介绍

- 函数式编程是一种"编程范式"（programming paradigm），一种编写程序的方法论

- 主要编程范式

  - 命令式编程

  - 声明式编程

  - 函数式编程

### 概念

- 纯函数

  - 无副作用的函数

  - 对给定的输入返还相同输出的函数，并且要求你所有的数据都是不可变的，即纯函数=无状态+数据不可变

- 高阶函数

  - 以函数作为输入或者输出的函数被称为高阶函数

- 柯里化

  - 把一个多参数函数转化成一个嵌套的一元函数的过程

- 组合与管道

  - 组合函数，目的是将多个函数组合成一个函数

### 优缺点

- 优点

  - 更好的管理状态：因为它的宗旨是无状态，或者说更少的状态，能最大化的减少这些未知、优化代码、减少出错情况

  - 更简单的复用：固定输入->固定输出，没有其他外部变量影响，并且无副作用。这样代码复用时，完全不需要考虑它的内部实现和外部影响

  - 更优雅的组合：往大的说，网页是由各个组件组成的。往小的说，一个函数也可能是由多个小函数组成的。更强的复用性，带来更强大的组合性

  - 隐性好处。减少代码量，提高维护性

- 缺点

  - 性能：函数式编程相对于指令式编程，性能绝对是一个短板，因为它往往会对一个方法进行过度包装，从而产生上下文切换的性能开销

  - 资源占用：在 JS 中为了实现对象状态的不可变，往往会创建新的对象，因此，它对垃圾回收所产生的压力远远超过其他编程方式

  - 递归陷阱：在函数式编程中，为了实现迭代，通常会采用递归操作

## [函数缓存](https://celestial-virid.vercel.app/posts/interview/javascript/js-function-cache)

### 介绍

- 将函数运算过的结果进行缓存

- 本质上就是用空间（缓存存储）换时间（计算过程）

- 常用于缓存数据计算结果和缓存对象

### 如何实现

- 把参数和对应的结果数据存在一个对象中，调用时判断参数对应的数据是否存在，存在就返回对应的结果数据，否则就返回计算结果

- 三种方式实现

  - 闭包

        - 函数 + 函数体内可访问的变量总和

  - 高阶函数

        - 通过接收其他函数作为参数或返回其他函数的函数

  - 柯里化

        - 把接受多个参数的函数转换成接受一个单一参数的函数

### 应用场景

- 对于昂贵的函数调用，执行复杂计算的函数

- 对于具有有限且高度重复输入范围的函数

- 对于具有重复输入值的递归函数

- 对于纯函数，即每次使用特定输入调用时返回相同输出的函数

## [JavaScript精度丢失](https://celestial-virid.vercel.app/posts/interview/javascript/js-precision-lost)

### 场景复现

- 0.1 + 0.2 === 0.3 // false

### 浮点数

- “浮点数”是一种表示数字的标准，整数也可以用浮点数的格式来存储

### 问题分析

- 计算机存储双精度浮点数需要先把十进制数转换为二进制的科学记数法的形式，然后计算机以自己的规则{符号位+(指数位+指数偏移量的二进制)+小数部分}存储二进制的科学记数法

- 因为存储时有位数限制（64位），并且某些十进制的浮点数在转换为二进制数时会出现无限循环，会造成二进制的舍入操作(0舍1入)，当再转换为十进制时就造成了计算误差

### 解决方案

- 使用 toPrecision 凑整并 parseFloat 转成数字后再显示

- 对于运算类操作，如 +-\*/，就不能使用 toPrecision 了。正确的做法是把小数转成整数后再运算。

- 使用第三方库，如Math.js、BigDecimal.js

## [防抖和节流](https://celestial-virid.vercel.app/posts/interview/javascript/js-debounce-throttle)

### 介绍

- 节流

  - n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效

- 防抖

  - n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时

### 区别

- 相同点

  - 都可以通过使用 setTimeout 实现

  - 目的都是，降低回调执行频率。节省计算资源

- 不同点

  - 函数防抖，在一段连续操作结束后，处理回调，利用 clearTimeout 和 setTimeout 实现。函数节流，在一段连续操作中，每一段时间只执行一次，频率较高的事件中使用来提高性能

  - 函数防抖关注一定时间连续触发的事件，只在最后执行一次，而函数节流一段时间内只执行一次

### 应用场景

- 节流

  - 搜索框，搜索联想功能

  - 滚动加载，加载更多或滚到底部监听

- 防抖

  - 搜索框搜索输入。只需用户最后一次输入完，再发送请求

  - 手机号、邮箱验证输入检测

  - 窗口大小resize。只需窗口调整完成后，计算窗口大小。防止重复渲染。

## [元素是否在可视区域](https://celestial-virid.vercel.app/posts/interview/javascript/js-visible-area)

### 用途

- 图片的懒加载

- 列表的无限滚动

- 计算广告元素的曝光情况

- 可点击链接的预加载

### 实现方式

- offsetTop、scrollTop

- getBoundingClientRect

- Intersection Observer

### 应用场景

- 创建了一个十万个节点的长列表，当节点滚入到视窗中时，背景就会从红色变为黄色

## [断点续传](https://celestial-virid.vercel.app/posts/interview/javascript/js-resume-upload-from-breakpoint)

### 介绍

- 分片上传

  - 将所要上传的文件，按照一定的大小，将整个文件分隔成多个数据块（Part）来进行分片上传

- 断点续传

  - 在下载或上传时，将下载或上传任务人为的划分为几个部分

### 实现思路

- 分片上传

  - 将需要上传的文件按照一定的分割规则，分割成相同大小的数据块；

  - 初始化一个分片上传任务，返回本次分片上传唯一标识；

  - 按照一定的策略（串行或并行）发送各个分片数据块；

  - 发送完成后，服务端根据判断数据上传是否完整，如果完整，则进行数据块合成得到原始文件

- 断点续传

  - 服务器端返回，告知从哪开始

  - 浏览器端自行处理

### 使用场景

- 大文件加速上传

  - 当文件大小超过预期大小时，使用分片上传可实现并行上传多个 Part， 以加快上传速度

- 网络环境较差

  - 建议使用分片上传。当出现上传失败的时候，仅需重传失败的 Part

- 流式上传

  - 可以在需要上传的文件大小还不确定的情况下开始上传。这种场景在视频监控等行业应用中比较常见

## [上拉加载，下拉刷新](https://celestial-virid.vercel.app/posts/interview/javascript/js-refresh-reload)

### 实现原理

- 上拉加载的本质是页面触底，或者快要触底时的动作

- 下拉刷新的本质是页面本身置于顶部时，用户下拉时需要触发的动作

## [单点登录](https://celestial-virid.vercel.app/posts/interview/javascript/js-single-point-click)

### 介绍

- 单点登录（Single Sign On），简称为 SSO，是目前比较流行的企业业务整合的解决方案之一

- SSO的定义是在多个应用系统中，用户只需要登录一次就可以访问所有相互信任的应用系统

### 如何实现

- 同域名下的单点登录

- 不同域名下的单点登录(一)

  - 用户统一在认证中心进行登录，登录成功后，认证中心记录用户的登录状态，并将 token 写入 Cookie（注意这个 Cookie是认证中心的，应用系统是访问不到的）

- 不同域名下的单点登录(二)

  - 可以选择将 Session ID （或 Token ）保存到浏览器的 LocalStorage 中，让前端在每次向后端发送请求时，主动将 LocalStorage 的数据传递给服务端

### 流程

## [web常见攻击方式](https://celestial-virid.vercel.app/posts/interview/javascript/js-web-common-attack)

### 介绍

- 针对用户上网行为或网站服务器等设备进行攻击的行为

### XSS

- 介绍

  - XSS，跨站脚本攻击，允许攻击者将恶意代码植入到提供给其它用户使用的页面中

- 分类

  - 存储型

  - 反射型

  - DOM 型

- XSS的预防

### CSRF

- CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求

- 特点

  - 攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生

  - 攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据

  - 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”

  - 跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪

### SQL注入

- Sql 注入攻击，是通过将恶意的 Sql查询或添加语句插入到应用的输入参数中，再在后台 Sql服务器上解析执行进行的攻击

- 流程

  - 找出SQL漏洞的注入点

  - 判断数据库的类型以及版本

  - 猜解用户名和密码

  - 利用工具查找Web后台管理入口

  - 入侵和破坏

- 预防

  - 严格检查输入变量的类型和格式

  - 过滤和转义特殊字符

  - 对访问数据库的Web应用程序采用Web应用防火墙

## [数组常见的方法](https://celestial-virid.vercel.app/posts/interview/javascript/js-array-common)

### 操作方法

- 增

  - push()

        - push()方法接收任意数量的参数，并将它们添加到数组末尾，返回数组的最新长度

  - unshift()

        - unshift()在数组开头添加任意多个值，然后返回新的数组长度

  - splice()

        - 传入三个参数，分别是开始位置、0（要删除的元素数量）、插入的元素，返回空数组

  - concat()

        - 首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组，不会影响原始数组

- 删

  - pop()

        - pop() 方法用于删除数组的最后一项，同时减少数组的length 值，返回被删除的项

  - shift()

        - shift()方法用于删除数组的第一项，同时减少数组的length 值，返回被删除的项

  - splice()

        - 传入两个参数，分别是开始位置，删除元素的数量，返回包含删除元素的数组

  - slice()

        - slice() 用于创建一个包含原有数组中一个或多个元素的新数组，不会影响原始数组

- 查

  - indexOf()

        - 返回要查找的元素在数组中的位置，如果没找到则返回 -1

  - includes()

        - 返回要查找的元素在数组中的位置，找到返回true，否则false

  - find()

        - 返回第一个匹配的元素

- 改

  - splice()

### 排序方法

- reverse()

  - 顾名思义，将数组元素方向反转

- sort()

  - sort()方法接受一个比较函数，用于判断哪个值应该排在前面

### 转换方法

- join()

  - join() 方法接收一个参数，即字符串分隔符，返回包含所有项的字符串

### 迭代方法

- some()

  - 对数组每一项都运行传入的测试函数，如果至少有1个元素返回 true ，则这个方法返回 true

- every()

  - 对数组每一项都运行传入的测试函数，如果所有元素都返回 true ，则这个方法返回 true

- forEach()

  - 对数组每一项都运行传入的函数，没有返回值

- filter()

  - 对数组每一项都运行传入的函数，函数返回 true 的项会组成数组之后返回

- map()

  - 对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组

## [字符串的常用方法](https://celestial-virid.vercel.app/posts/interview/javascript/js-string-common)

### 操作方法

- 增

  - concat

        - 用于将一个或多个字符串拼接成一个新字符串

- 删

  - slice()

  - substr()

  - substring()

- 查

  - chatAt()

  - indexOf()

  - startWith()

  - includes()

- 改

  - trim()、trimLeft()、trimRight()

  - repeat()

  - padStart()、padEnd()

  - toLowerCase()、 toUpperCase()

### 转换方法

- split

  - 把字符串按照指定的分割符，拆分成数组中的每一项

### 模板匹配方法

- match()

  - 接收一个参数，可以是一个正则表达式字符串，也可以是一个 RegExp 对象，返回数组

- search()

  - 接收一个参数，可以是一个正则表达式字符串，也可以是一个 RegExp 对象，找到则返回匹配索引，否则返回 -1

- replace()

  - 接收两个参数，第一个参数为匹配的内容，第二个参数为替换的元素（可用函数）

## [数据类型](https://celestial-virid.vercel.app/posts/interview/javascript/js-data-type)

### 前言

- 基本类型

- 复杂类型

### 基本类型

- Number

- String

- Boolean

- Undefined

- null

- symbol

  - Symbol （符号）是原始值，且符号实例是唯一、不可变的。符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险

### 引用类型

- Object

- Array

- Function

- ...

### 存储区别

- 基本数据类型存储在栈中

- 引用类型的对象存储于堆中

## [类型转换机制](https://celestial-virid.vercel.app/posts/interview/javascript/js-type-transform-mechanism)

### 概述

- 强制转换（显示转换）

- 自动转换（隐式转换）

### 显示转换

### 隐式转换

- 自动转换为布尔值

- 自动转换成字符串

- 自动转换成数值

## [== 和 === 的区别](https://celestial-virid.vercel.app/posts/interview/javascript/js-two-equal-three-equal)

### 等于操作符

- 等于操作符用两个等于号（ == ）表示，如果操作数相等，则会返回 true

- 两个都为简单类型，字符串和布尔值都会转换成数值，再比较

- 简单类型与引用类型比较，对象转化成其原始类型的值，再比较

- 两个都为引用类型，则比较它们是否指向同一个对象

- null 和 undefined 相等

- 存在 NaN 则返回 false

### 全等操作符

- let result1 = (null === null) //true

- let result2 = (undefined === undefined) //true

### 区别

- 相等操作符（==）会做类型转换，再进行值的比较，全等运算符不会做类型转换

## [浅拷贝和深拷贝](https://celestial-virid.vercel.app/posts/interview/javascript/js-copy-difference)

### 数据类型存储

- 基本类型

- 引用类型

### 浅拷贝

- 创建新的数据，这个数据有着原始数据属性值的一份精确拷贝

- 如果属性是基本类型，拷贝的就是基本类型的值。如果属性是引用类型，拷贝的就是内存地址

- 即浅拷贝是拷贝一层，深层次的引用类型则共享内存地址

- 实现方法

  - Object.assign

  - Array.prototype.slice(), Array.prototype.concat()

  - 使用拓展运算符实现的复制

### 深拷贝

- 深拷贝开辟一个新的栈，两个对象属完成相同，但是对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性

- 实现方法

  - \_.cloneDeep()

  - jQuery.extend()

  - JSON.stringify()

  - 手写循环递归

### 区别

- 浅拷贝是拷贝一层，属性为对象时，浅拷贝是复制，两个对象指向同一个地址

- 深拷贝是递归拷贝深层次，属性为对象时，深拷贝是新开栈，两个对象指向不同的地址

## [闭包的理解](https://celestial-virid.vercel.app/posts/interview/javascript/js-closure)

### 介绍

- 一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）

- 闭包让你可以在一个内层函数中访问到其外层函数的作用域

### 使用场景

- 创建私有变量

- 延长变量的生命周期

### 注意事项

- 如果不是某些特定任务需要使用闭包，在其它函数中创建函数是不明智的，因为闭包在处理速度和内存消耗方面对脚本性能具有负面影响
