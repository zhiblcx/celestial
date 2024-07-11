---
title: 'react 的常用组件'
description: 'react 的常用组件的使用'
pubDate: '2024-07-11 16:23:00'
category: 'base'
cardImage: '@images/base/react-common-component.jpg'
tags: ['base', 'react', 'components']
selected: true
---

## react 的常用组件

- [useState](#usestate)
- [useRef](#useref)
- [useMeno](#usemeno)
- [useEffect](#useeffect)
- [useContext](#usecontext)
- [useReducer](#usereducer)
- [useLayoutEffect](#uselayouteffect)
- [useTransition](#usetransition)
- [useCallback](#usecallback)

## useState

useState 是一个 React Hook，它允许你向组件添加一个 状态变量。

```jsx
const [state, setState] = useState(initialState)
```

返回

**useState** 返回一个由两个值组成的数组：

1. 当前的 state。在首次渲染时，它将与你传递的 initialState 相匹配。
2. set 函数，它可以让你将 state 更新为不同的值并触发重新渲染。

**举例：**

```jsx
import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div>count:{count}</div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        添加
      </button>
    </>
  )
}
```

## useRef

useRef 是一个 React Hook，它能帮助引用一个不需要渲染的值。

```jsx
const ref = useRef(initialValue)
```

注意

- 改变 **ref.current** 属性时，React 不会重新渲染组件。React 不知道它何时会发生改变，因为 ref 是一个普通的 JavaScript 对象。

**举例1：**

```jsx
import { useRef } from 'react'

export default function Home() {
  const count = useRef(0)
  return (
    <>
      <button
        onClick={() => {
          count.current = count.current + 1
          alert('you click ' + count.current + ' timers')
        }}
      >
        点击！
      </button>
    </>
  )
}
```

**举例2：**

```jsx
import { useRef, useState } from 'react'

export default function Home() {
  const [startTime, setStartTime] = useState(0)
  const [now, setNow] = useState(0)
  const intervalRef = useRef(0)

  function handlerStart() {
    setStartTime(Date.now())
    setNow(Date.now())

    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setNow(Date.now())
    }, 10)
  }

  function handlerStop() {
    clearInterval(intervalRef.current)
  }

  let secondPassed = 0
  if (startTime != 0 && now != 0) {
    secondPassed = (now - startTime) / 1000
  }
  return (
    <>
      <h1>Time passed: {secondPassed.toFixed(3)}</h1>
      <button onClick={handlerStart}>开始</button>
      <button onClick={handlerStop}>停止</button>
    </>
  )
}
```

## useMeno

useMemo 是一个 React Hook，它在每次重新渲染的时候能够缓存计算的结果。

```jsx
const cachedValue = useMemo(calculateValue, dependencies)
```

**参数**

- calculateValue: 要缓存计算的函数，没有任何参数的纯函数，返回任意类型，只会在首次渲染调用，在之后的渲染中，如果 dependencies 没有发生变化，react 将直接返回相同的值，否则调用 calculateValue 来获取新的值，然后缓存结果，以便下次使用。

- dependencies: 所有在 calculateValue 函数中使用的响应式变量组成的数组

**返回值**

- 在初次渲染时，useMemo 返回不带参数调用 calculateValue 的结果。

- 在接下来的渲染中，如果依赖项没有发生改变，它将返回上次缓存的值；否则将再次调用 calculateValue，并返回最新结果。

## useEffect

useEffect 是一个 React Hook，它允许你 将组件与外部系统同步。

```jsx
useEffect(setup, dependencies?)
```

## useContext

## useReducer

## useLayoutEffect

## useTransition

useTransition 是一个帮助你在不阻塞 UI 的情况下更新状态的 React Hook。

```jsx
const [isPending, startTransition] = useTransition()
```

**参数**

**useTransition** 不需要任何参数。

**返回值**

1. isPending，告诉你是否存在待处理的 transition。
2. startTransition 函数，你可以使用此方法将状态更新标记为 transition。

**举例：**

```jsx
import { useTransition } from 'react'

export default function Home() {
  const [isPending, startTransition] = useTransition()
  const [tab, setTab] = useState('about')
  function handlerTab(selectTab: string) {
    startTransition(() => {
      setTab(selectTab)
    })
  }
  return (
    <>
      <div>
        <Button onClick={() => handlerTab('about')}>about</Button>
        <Button onClick={() => handlerTab('posts')}>posts</Button>
      </div>
      <div>
        {isPending ? '加载中....' : ''}
        {Array(9999)
          .fill(tab)
          .map(item => (
            <div key={Math.random()}>{item}</div>
          ))}
      </div>
    </>
  )
}

```

## useCallback

useContext 是一个 React Hook，可以让你读取和订阅组件中的 context。

```jsx
const value = useContext(SomeContext)
```

**参数**

- SomeContext: 先前用 createContext 创建的 context。context 本身不包含信息，它只代表你可以提供或从组件中读取的信息类型。

createContext

使用 createContext 创建组件能够提供与读取的 上下文（context）。

```jsx
const SomeContext = createContext(defaultValue)
```

**返回值**

**useContext** 为调用组件返回 context 的值。它被确定为传递给树中调用组件上方最近的 **SomeContext.Provider** 的 value。如果没有这样的 provider，那么返回值将会是为创建该 context 传递给 createContext 的 defaultValue。返回的值始终是最新的。如果 context 发生变化，React 会自动重新渲染读取 context 的组件。

**举例:**

```jsx
import { createContext, useContext, useState } from 'react'

const CurrentUserContext = createContext(null)

export default function MyApp() {
  const [currentUser, setCurrentUser] = useState(null)
  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      <LoginButton />
    </CurrentUserContext.Provider>
  )
}

function LoginButton() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)

  if (currentUser !== null) {
    return <p>You logged in as {currentUser.name}.</p>
  }

  return (
    <button
      onClick={() => {
        setCurrentUser({ name: 'Advika' })
      }}
    >
      Log in as Advika
    </button>
  )
}
```
