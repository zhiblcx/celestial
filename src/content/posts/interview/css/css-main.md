---
title: 'css系列'
description: '面试题'
pubDate: '2024-09-15 11:19:00'
category: 'interview'
cardImage: '@images/interview/css/main/css-main.png'
tags: ['interview']
selected: false
---

# CSS系列

## [盒子模型](https://celestial-virid.vercel.app/posts/interview/css/css-box-understand)

### 介绍

- 当对一个文档进行布局，浏览器渲染引擎会根据标准之一标准盒子模型将所有元素表示为一个一个矩形的盒子

- 一个盒子由四个部分组成：content、padding、border、margin

### 标准盒子模型

- 标准盒子模型，是浏览器默认的盒子模型

- 盒子总宽度 = width + padding + border + margin;

- 盒子总高度 = height + padding + border + margin

### 怪异盒子模型

- 盒子总宽度 = width + margin;

- 盒子总高度 = height + margin;

- width/height 包含了 padding和 border值

### box-sizing

- content-box

  - 与标准盒子模型表现一致

- border-box

  - 与怪异盒子模型表现一致

- inherit

  - 指定 box-sizing 属性的值，应该从父元素继承

## [选择器](https://celestial-virid.vercel.app/posts/interview/css/css-selector)

### 选择器

- 介绍

  - CSS选择器是CSS规则的第一部分

  - 它是元素和其他部分组合起来告诉浏览器哪个HTML 元素应当是被选为应用规则中的 CSS 属性值的方式

  - 选择器所选择的元素，叫做“选择器的对象”

- 常用选择器

  - id选择器（#box）

        - 选择id为box的元素

  - 类选择器（.one）

        - 选择类名为one的所有元素

  - 标签选择器（div）

        - 选择标签为div的所有元素

  - 后代选择器（#box div）

        - 选择id为box元素内部所有的div元素

  - 子选择器（.one>one_1）

        - 选择父元素为.one的所有.one_1的元素

  - 相邻同胞选择器（.one+.two）

        - 选择紧接在.one之后的所有.two元素

  - 群组选择器（div,p）

        - 选择div、p的所有元素

- 不常用选择器

  - 伪类选择器

  - 伪元素选择器

  - 属性选择器

- css3 新增的选择器

  - 层次选择器

  - 伪类选择器

  - 属性选择器

### 优先级

- 内联 > ID选择器 > 类选择器 > 标签选择器

### 继承属性

- 继承属性

  - 字体系列属性

  - 文本系列属性

  - 元素可见性

  - 表格布局属性

  - 列表属性

  - 引用

  - 光标属性

  - 特殊点

        - a 标签的字体颜色不能被继承

        - h1-h6 标签字体的大下也是不能被继承的

- 无继承属性

  - display

  - 文本属性：vertical-align、text-decoration

  - 盒子模型的属性：宽度、高度、内外边距、边框等

  - 背景属性：背景图片、颜色、位置等

  - 定位属性：浮动、清除浮动、定位 position等

  - 生成内容属性：content、counter-reset、counter-increment

  - 轮廓样式属性：outline-style、outline-width、outline-color、outline

  - 页面样式属性：size、page-break-before、page-break-after

## [em/px/rem/vh/vw](https://celestial-virid.vercel.app/posts/interview/css/css-em-px-rem-vh-vw)

### 计量单位

### 单位

- px

  - 像素

- em

  - 相对于当前对象内文本的字体尺寸

  - 默认 1em = 16px

  - em 会继承父级元素的字体大小

- rem

  - 相对根元素font-size的值

- vh

  - 窗口的高度

- vw

  - 窗口的宽度

## [设备像素、css像素、设备独立像素、dpr、ppi](https://celestial-virid.vercel.app/posts/interview/css/css-pixel)

### CSS像素

- 适用于 web 编程

- 单位 px

### 设备像素

- 物理像素

- 单位 pt

### 设备独立像素

- 分辨率就是设备独立像素（非严谨的说法）

### dpr

- 设备像素比

- 设备像素/设备独立像素

### ppi

- 表示每英寸所包含的像素点数目（像素密度）

- 数值越高，说明屏幕能以更高密度显示图像

## [隐藏页面元素](https://celestial-virid.vercel.app/posts/interview/css/css-hidden-element)

### 实现方式

- display:none

- visibility:hidden

- opacity:0

- 设置height、width模型属性为0

- position:absolute

- clip-path

### 区别

- display:none

  - 不存在页面中，会重排，会重绘，不能触发自身事件

- visibility:hidden

  - 存在页面中，不会重排，会重绘，不能触发自身事

- opacity:0

  - 不存在页面中，不会重排，不一定重绘

## [BFC](https://celestial-virid.vercel.app/posts/interview/css/css-bfc)

### 介绍

- （Block Formatting Context），即块级格式化上下文

### 目的

- 形成一个相对于外界完全独立的空间，让内部的子元素不会影响到外部的元素

### 触发条件

- 根元素，即HTML元素

- 浮动元素：float 值为 left、right

- overflow值不为 visible，为 auto、scroll、hidden

- display的值为inline-block、inltable-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid

- position 的值为 absolute 或 fixed

### 应用场景

- 防止margin重叠（塌陷）

- 清除内部浮动

- 自适应多栏布局

## [水平垂直居中](https://celestial-virid.vercel.app/posts/interview/css/css-level-vertical-center)

### 居中元素（子元素）的宽高已知

- 利用定位+margin:负值

### 居中元素宽高未知

- 利用定位+margin:auto

- 利用定位+transform

- table布局

- flex弹性布局

- grid网格布局

## [两三栏布局](https://celestial-virid.vercel.app/posts/interview/css/css-two-three-columns)

### 两栏布局

- 使用左右浮动，为父元素添加BFC(overflow:hidden)，防止下方元素飞到上方内容来

- flex弹性布局

### 三栏布局

- 两边使用 float，中间使用 margin

- 两边使用 absolute，中间使用 margin

- 两边使用 float 和负 margin

- 使用 display: table 实现

- 使用 flex 实现

- grid 网格布局

## [flex弹性布局](https://celestial-virid.vercel.app/posts/interview/css/css-flexbox)

### 介绍

- Flexible Box 简称 flex，意为”弹性布局”，可以简便、完整、响应式地实现各种页面布局

### 属性

- 容器属性

  - flex-direction

        - 决定主轴的方向(即项目的排列方向)

  - flex-wrap

        - flex-wrap决定容器内项目是否可换行

  - flex-flow

        - flex-direction 属性和 flex-wrap 属性的简写形式，默认值为row nowrap

  - justify-content

        - 定义了项目在主轴上的对齐方式

  - align-items

        - 定义项目在交叉轴上如何对齐

  - align-content

        - 定义了多根轴线的对齐方式

- 容器成员属性

  - order

        - 定义项目的排列顺序。数值越小，排列越靠前，默认为 0

  - flex-grow

        - 定义项目的放大比例（容器宽度>元素总宽度时如何伸展），默认为0

  - flex-shrink

        - 定义了项目的缩小比例（容器宽度<元素总宽度时如何收缩），默认为1，如果空间不足，该项目将缩小

  - flex-basis

        - 设置的是元素在主轴上的初始尺寸

  - flex

        - flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto

  - align-self

        - 允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性

## [grid网格布局](https://celestial-virid.vercel.app/posts/interview/css/css-grid)

### 介绍

- Grid 布局即网格布局，是一个二维的布局方式

- 设置 display:grid/inline-grid 的元素就是网格布局容器

### 属性

- 容器属性

  - display 属性

        - display：grid 则该容器是一个块级元素

        - display: inline-grid 则容器元素为行内元素

  - grid-template-columns 属性，grid-template-rows 属性

        - 设置列宽，行高

  - grid-row-gap 属性， grid-column-gap 属性， grid-gap 属性

        - 分别设置行间距和列间距，grid-gap 属性是两者的简写形式

  - grid-template-areas 属性

        - 用于定义区域，一个区域由一个或者多个单元格组成

  - grid-auto-flow 属性

        - 划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。

  - justify-items 属性， align-items 属性， place-items 属性

        - justify-items 属性设置单元格内容的水平位置（左中右），align-items 属性设置单元格的垂直位置（上中下），place-items 属性是两者的简写形式

  - justify-content 属性， align-content 属性， place-content 属性

        - justify-content 属性是整个内容区域在容器里面的水平位置（左中右），align-content属性是整个内容区域的垂直位置（上中下），place-content 属性是两者的简写形式

  - grid-auto-columns 属性和 grid-auto-rows 属性

        - 指定隐式网格的宽高

- 项目属性

  - grid-column-start 属性、grid-column-end 属性、grid-row-start 属性以及 grid-row-end 属性

        - 指定网格项目所在的四个边框，分别定位在哪根网格线，从而指定项目的位置

  - grid-area 属性

        - 指定项目放在哪一个区域

         - 与 grid-template-areas 搭配使用

  - justify-self 属性、align-self 属性以及 place-self 属性

        - 与 justify-items 用法一样但是用于单个项目

## [CSS预处理器](https://celestial-virid.vercel.app/posts/interview/css/css-preprocessor)

### 介绍

- 扩充了 Css 语言，增加了诸如变量、混合（mixin）、函数等功能，让 Css 更易维护、方便

### css预处理器

- 三大优秀的预处理器

  - sass

  - less

  - stylus

- 区别

  - 变量

        - less声明的变量必须以@开头，后面紧跟变量名和变量值，而且变量名和变量值需要使用冒号:分隔开，sass 类似

        - stylus声明的变量没有任何的限定，可以使用$开头，结尾的分号;可有可无，但变量与变量值之间需要使用=

  - 作用域

        - sass中不存在全局变量

        - less 和 stylus 有全局变量

  - 混入

        - 在 less 中，混合的用法是指将定义好的 ClassA中引入另一个已经定义的 Class，也能使用够传递参数，参数变量为@声明

        - Sass 声明 mixins 时需要使用 @mixinn，后面紧跟 mixin 的名，也可以设置参数，参数名为变量$声明的形式

        - stylus 中的混合和前两款 Css 预处理器语言的混合略有不同，他可以不使用任何符号，就是直接声明Mixins名，然后在定义参数和默认值之间用等号（=）来连接

  - 嵌套

        - Sass 和 Stylus 可以用没有大括号的方式书写

        - less 需要大括号

  - 代码模块化

## [支持小于12px的文字](https://celestial-virid.vercel.app/posts/interview/css/css-support-small-text)

### 背景

- Chrome 中文版浏览器会默认设定页面的最小字号是12px，英文版没有限制

### 解决方案

- zoom

  - 有兼容问题

- -webkit-transform:scale()

  - 大部分现代浏览器支持

- -webkit-text-size-adjust:none

  - 只对英文和数字有效

## [画三角形](https://celestial-virid.vercel.app/posts/interview/css/css-triangle)

### 实现过程

### 原理分析

- 利用边框特性

## [视觉滚差](https://celestial-virid.vercel.app/posts/interview/css/css-parallax-scroll)

### 介绍

- 视差滚动（Parallax Scrolling）是指多层背景以不同的速度移动，形成立体的运动效果，带来非常出色的视觉体验

### 实现方式

- background-attachment

  - 作用是设置背景图像是否固定或者随着页面的其余部分滚动

  - scroll：默认值，背景图像会随着页面其余部分的滚动而移动

  - fixed：当页面的其余部分滚动时，背景图像不会移动

  - inherit：继承父元素background-attachment属性的值

- transform:translate3D

## [单行/多行文本溢出](https://celestial-virid.vercel.app/posts/interview/css/css-text-overflow)

### 单行文本溢出

- text-overflow：ellipsis 规定当文本溢出时，显示省略符号来代表被修剪的文本

- white-space：nowrap 设置文字在一行显示，不能换行

- overflow：hidden 文字长度超出限定宽度，则隐藏超出的内容

### 多行文本溢出

- 基于高度截断

  - 伪元素 + 定位

- 基于行数截断

  - -webkit-line-clamp: 2：用来限制在一个块元素显示的文本的行数，为了实现该效果，它需要组合其他的WebKit属性）

  - display: -webkit-box：和1结合使用，将对象作为弹性伸缩盒子模型显示

  - -webkit-box-orient: vertical：和1结合使用 ，设置或检索伸缩盒对象的子元素的排列方式

  - overflow: hidden：文本溢出限定的宽度就隐藏内容

  - text-overflow: ellipsis：多行文本的情况下，用省略号“…”隐藏溢出范围的文本

## [css性能优化](https://celestial-virid.vercel.app/posts/interview/css/css-optimize)

### 前言

- 作为页面渲染和内容展现的重要环节，css影响着用户对整个网站的第一体验

### 实现方式

- 内联首屏关键CSS

- 异步加载CSS

- 资源压缩

- 合理使用选择器

- 减少使用昂贵的属性

- 不要使用@import

### 实现性能考虑方式

- 选择器嵌套

- 属性特性

- 减少http

- css代码加载顺序

## [响应式设计](https://celestial-virid.vercel.app/posts/interview/css/css-responsive-layout)

### 介绍

- 响应式网站设计（Responsive Web design）是一种网络页面设计布局，页面的设计与开发应当根据用户行为以及设备环境(系统平台、屏幕尺寸、屏幕定向等)进行相应的响应和调整

### 实现方式

- 媒体查询

- 百分比

- vw/vh

- rem

### 总结

- 优点

  - 面对不同分辨率设备灵活性强

  - 能够快捷解决多设备显示适应问题

- 缺点

  - 仅适用布局、信息、框架并不复杂的部门类型网站

  - 兼容各种设备工作量大，效率低下

  - ...

## [回流重绘](https://celestial-virid.vercel.app/posts/interview/css/css-reflux-redraw)

### 介绍

- 回流：布局引擎会根据各种样式计算每个盒子在页面上的大小与位置

- 重绘：当计算好盒模型的位置、大小及其他属性后，浏览器根据每个盒子特性进行绘制

### 如何触发

- 回流触发时机

  - 添加或删除可见的DOM元素

  - 元素的位置发生变化

  - 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）

  - 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代

  - 页面一开始渲染的时候（这避免不了）

  - 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）

  - js 获取特定的值

        - offsetTop

        - scrollTop

        - ...

- 重绘触发时机

  - 颜色的修改

  - 文本方向的修改

  - 阴影的修改

### 如何减少

- 避免使用内联样式

- 避免使用 table 布局

- 使用复杂动画，对元素使用position:absolute，尽可能脱离文档流

- 离线操作

  - 将其从页面上去掉，然后再进行后续操作

## [CSS3动画](https://celestial-virid.vercel.app/posts/interview/css/css3-animation)

### 介绍

- 即指元素从一种样式逐渐过渡为另一种样式的过程

### 实现方式

- transition 实现渐变动画

- transform 转变动画

- animation 实现自定义动画

## [CSS3新增特性](https://celestial-virid.vercel.app/posts/interview/css/css3-newly-added-features)

### 介绍

- css 即层叠样式表（Cascading Style Sheets）的简称，是一种标记语言，由浏览器解释执行用来使页面变得更美观

### 选择器

- 层次选择器

  - element1~element2

- 属性选择器

  - [attribute^=value]

  - [attribute$=value]

  - [attribute*=value]

- 伪类选择器

  - :first-of-type

  - :last-of-type

  - ...

### 新增样式

- 边框

  - border-radius：创建圆角边框

  - box-shadow：为元素添加阴影

  - border-image：使用图片来绘制边框

- 背景

  - background-clip

        - 用于确定背景画区

  - background-origin

        - 用于控制背景图片以边框(border)或边距(padding)对齐。

  - background-size

        - 常用来调整背景图片的大小

        - contain; 缩小图片以适合元素（维持像素长宽比）

        - cover; 扩展元素以填补元素（维持像素长宽比）

  - background-break

        - 元素可以被分成几个独立的盒子（如使内联元素span跨越多行），background-break 属性用来控制背景怎样在这些不同的盒子中显示

- 文字

  - word-wrap

        - normal：使用浏览器默认的换行

        - break-all：允许在单词内换行

  - text-overflow

        - 设置或检索当当前行超过指定容器的边界时如何显示

        - clip：修剪文本

        - ellipsis：显示省略符号来代表被修剪的文本

  - text-shadow

  - text-decoration

        - text-fill-color: 设置文字内部填充颜色

        - text-stroke-color: 设置文字边界填充颜色

        - text-stroke-width: 设置文字边界宽度

- 颜色

  - rgba

        - rgb为颜色值，a为透明度

  - hsla

        - h为色相，s为饱和度，l为亮度，a为透明度

- transition 过渡

  - transition： CSS属性，花费时间，效果曲线(默认ease)，延迟时间(默认0)

- transform 转换

  - transform属性允许你旋转，缩放，倾斜或平移给定元素

- animation 动画

- 渐变

  - linear-gradient：线性渐变

  - radial-gradient：径向渐变

- flex 布局

- grid 布局
