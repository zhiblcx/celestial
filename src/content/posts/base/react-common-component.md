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

**参数**

- **setup:** 处理 Effect 的函数。setup 函数选择性返回一个 清理（cleanup） 函数。当组件被添加到 DOM 的时候，React 将运行 setup 函数。在每次依赖项变更重新渲染后，React 将首先使用旧值运行 cleanup 函数（如果你提供了该函数），然后使用新值运行 setup 函数。在组件从 DOM 中移除后，React 将最后一次运行 cleanup 函数。
- **可选 dependencies:** setup 代码中引用的所有响应式值的列表。响应式值包括 props、state 以及所有直接在组件内部声明的变量和函数。如果你的代码检查工具 配置了 React，那么它将验证是否每个响应式值都被正确地指定为一个依赖项。依赖项列表的元素数量必须是固定的，并且必须像 [dep1, dep2, dep3] 这样内联编写。React 将使用 Object.is 来比较每个依赖项和它先前的值。如果省略此参数，则在每次重新渲染组件之后，将重新运行 Effect 函数。如果你想了解更多，请参见 传递依赖数组、空数组和不传递依赖项之间的区别。

**返回值**

useEffect 返回 undefined。

## useContext

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

## useReducer

useReducer 是一个 React Hook，它允许你向组件里面添加一个 reducer。

```tsx
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

**参数**

- **reducer:** 用于更新 state 的纯函数。参数为 state 和 action，返回值是更新后的 state。state 与 action 可以是任意合法值。
- **initialArg:** 用于初始化 state 的任意值。初始值的计算逻辑取决于接下来的 init 参数。
- **可选参数 init:** 用于计算初始值的函数。如果存在，使用 init(initialArg) 的执行结果作为初始值，否则使用 initialArg。

**返回值**

useReducer 返回一个由两个值组成的数组：

1. 当前的 state。初次渲染时，它是 init(initialArg) 或 initialArg （如果没有 init 函数）。
2. dispatch 函数。用于更新 state 并触发组件的重新渲染。

**举例**

![](@images/base/react-common-component/image.gif)

```tsx
interface State {
  age: number
}

interface Action {
  type: string
}

export default function Exception1() {
  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'ADD':
        return {
          age: state.age + 1,
        }
      case 'SUB':
        return {
          age: state.age - 1,
        }
    }
    return state
  }

  const [state, dispatch] = useReducer(reducer, { age: 12 })

  return (
    <>
      <Button
        onClick={() => {
          dispatch({ type: 'ADD' })
        }}
      >
        +
      </Button>
      <Button
        onClick={() => {
          dispatch({ type: 'SUB' })
        }}
      >
        -
      </Button>
      <p>Hello! you are {state.age}</p>
    </>
  )
}
```

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

useCallback 是一个允许你在多次渲染中缓存函数的 React Hook。

```tsx
const cachedFn = useCallback(fn, dependencies)
```

**参数**

- **fn:** 想要缓存的函数。此函数可以接受任何参数并且返回任何值。React 将会在初次渲染而非调用时返回该函数。当进行下一次渲染时，如果 dependencies 相比于上一次渲染时没有改变，那么 React 将会返回相同的函数。否则，React 将返回在最新一次渲染中传入的函数，并且将其缓存以便之后使用。React 不会调用此函数，而是返回此函数。你可以自己决定何时调用以及是否调用。
- **dependencies:** 有关是否更新 fn 的所有响应式值的一个列表。响应式值包括 props、state，和所有在你组件内部直接声明的变量和函数。如果你的代码检查工具 配置了 React，那么它将校验每一个正确指定为依赖的响应式值。依赖列表必须具有确切数量的项，并且必须像 [dep1, dep2, dep3] 这样编写。React 使用 Object.is 比较每一个依赖和它的之前的值。

**返回值**

在初次渲染时，useCallback 返回你已经传入的 fn 函数

在之后的渲染中, 如果依赖没有改变，useCallback 返回上一次渲染中缓存的 fn 函数；否则返回这一次渲染传入的 fn。

> 注意

- **useCallback** 是一个 Hook，所以应该在 组件的顶层 或自定义 Hook 中调用。你不应在循环或者条件语句中调用它。如果你需要这样做，请新建一个组件，并将 state 移入其中。
- 除非有特定的理由，React 将不会丢弃已缓存的函数。例如，在开发中，当编辑组件文件时，React 会丢弃缓存。在生产和开发环境中，如果你的组件在初次挂载中暂停，React 将会丢弃缓存。在未来，React 可能会增加更多利用了丢弃缓存机制的特性。例如，如果 React 未来内置了对虚拟列表的支持，那么在滚动超出虚拟化表视口的项目时，抛弃缓存是有意义的。如果你依赖 useCallback 作为一个性能优化途径，那么这些对你会有帮助。否则请考虑使用 state 变量 或 ref。

**举例**
