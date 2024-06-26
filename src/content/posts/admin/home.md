---
title: "管理系统准备工作"
description: "关于管理系统需要准备些什么工作"
pubDate: "2024-06-25 20:48:00"
category: "admin"
cardImage: "@images/admin/home.png"
tags: ["admin",'router','axios']
selected: true
---

## axios配置

## 权限管理

**RBAC模型：**

前端实现路由权限主要是基于 RBAC 模型。
**RBAC**（Role-Based Access Control）即：基于角色的权限控制。通过角色关联用户，角色关联权限的方式间接赋予用户权限。

思路：路由分为**默认路由**，即所有人都能去访问这个路由；**动态路由**，用来放置有权限的路由(在路由元信息中添加)，我们最终根据用户的角色筛选出用户能访问的动态路由表。

纯前端实现：

**Vue：**

1. 我们在 src 目录下，创建一个router/index.js

```js
// 默认路由
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, name: 'login' },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  },
  {
    path: '/404',
    name: '/404',
    component: () => import('@/pages/404.vue')
  }
]

// 动态路由
const asyncRoutes = [
  {
    path: '/course_center',
    name: 'course_center',
    component: Layout,
    meta: { breadcrumb: '课程中心', roles: ['student'] },
    children: [
      {
        path: '',
        component: () => import('@/pages/student/CourseCenter.vue')
      }
    ]
  },
  {
    path: '/my_course',
    name: 'my_course',
    component: Layout,
    meta: { breadcrumb: '我的课程', roles: ['student'] },
    children: [
      {
        path: '',
        component: () => import('@/pages/student/MyCourse.vue')
      }
    ]
  }
]
```

2. 在 utils/sion.js 写权限验证

```js
/**
 * 判断用户是否有权限访问单个路由
 * roles: 判断的角色
 * route: 访问的路径
 */

export function hasPermission(roles, route) {
  if (route.meta && route.meta.roles)
    return roles.some(role => route.meta.roles.includes(role))
  else
    return true
}

/**
 * 筛选可访问的路由
 * roles: 判断的角色
 * routes: 所有的路由
 */

export function filterAsyncRoutes(roles, routes) {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children)
        tmp.children = filterAsyncRoutes(roles, tmp.children)

      res.push(tmp)
    }
  })
  return res
}
```

3. 在 router/permission.js下动态添加路由

```js
import router, { asyncRoutes } from '@/router'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { filterAsyncRoutes } from '@/utils/sion'
let hasAddedRoutes = false

const token = localStorage.getItem('token')
const roles = ['student']
const accessedRoutes = filterAsyncRoutes(roles, asyncRoutes)
accessedRoutes.forEach((route) => {
  router.addRoute(route)
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !token) {
    next({ path: '/login' })
    NProgress.done()
  }
  else {
    if (!hasAddedRoutes) {
      // 如果未添加过路由，则添加
      hasAddedRoutes = true // 添加完毕后，将变量设为true
      next({ ...to, replace: true })
    }
    else {
      next()
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})
```

注意：这里的动态添加不能写到路由守卫里面，刷新会出现404的错误

**React：**

<!-- sentry：错误收集库 -->

## 暗夜模式

## 适配移动端

## 国际化
