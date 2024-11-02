---
title: 'checkbox'
description: '书籍的单选、多选、删除，添加到其他书架'
pubDate: '2024-07-18 21:00:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/1-10/third.png'
tags: ['ink-spell', 'checkbox']
selected: false
---

## 父子传值

这里遇到了一个父组件向子组件传函数，在子组件点击 Checkbox 之后，父组件的数值已经改变，但是子组件的并没有触发重新渲染

父组件：

```tsx
function Page() {
  const [books, setBooks] = useState(
    inkmock.map((item) => ({ ...item, checked: false }))
  )
  return (
    <div className="flex flex-wrap min-[375px]:justify-center md:justify-start">
      {books.map((item, index) => {
        return (
          <InkCard
            onClick={() => {
              const currentBooks = books
              currentBooks[index].checked = !item.checked
              setBooks(currentBooks)
            }}
            ink={item}
            customClassName="mr-4 mb-3 mt-3"
            key={item.id}
          />
        )
      })}
    </div>
  )
}
```

子组件:

```tsx
export default function InkCard({
  ink,
  customClassName,
  onClick,
}: InkCardProps) {
  function getImageUrl(name: string) {
    return new URL(`../../../assets/images/${name}`, import.meta.url).href
  }

  return (
    <div
      className={clsx(
        customClassName,
        'dark:bg-gray-800 bg-gray-200 card md:w-[180px] min-[375px]:w-[130px] h-[250px] shadow-lg rounded-2xl relative overflow-hidden flex flex-col items-center relative'
      )}
    >
      <Checkbox
        onClick={onClick}
        className="absolute right-3 top-2 z-50 checkbox"
        checked={ink.checked}
      />
      <div className="photo w-[100%] h-[100%] overflow-hidden">
        <img
          src={getImageUrl(ink.ink_img)}
          className="object-cover w-[100%] h-[100%]"
        />
      </div>
      <p className="absolute text-xl bottom-3 w-[90%] text-center truncate ink-name roboto text-white">
        {ink.ink_name ? `${ink.ink_name}` : ''}
      </p>
      <p className="roboto mt-[130px] text-sm">
        {ink.protagonist
          ? `
      ${ink.protagonist[0]}|${ink.protagonist[1]}`
          : '未知'}
      </p>
      <p className="w-[80%] border-2 border-b-zinc-300"></p>
      <p className="roboto w-[80%] mt-2 text-sm overflow-hidden line-clamp-4">
        {ink.detail === undefined ? '' : ink.detail}
      </p>
    </div>
  )
}
```

原因：我在父组件里面直接 **const currentBooks = books** 导致我只是创建了一个指向相同的新变量，也就是地址相同,而不是创建一个新的副本。

在 React 中，组件的重新渲染是基于 props 或 state 发生变化的时，React 会比较前后的两次值，并决定是否重新渲染，React 不会深度检查，只会比较引用是否相等，这里是引用了相同的地址所以不会触发子组件的重新渲染，导致点击 checkbox 并没有进行对应的选中或者是取消。

解决：**const currentBooks = Array.from(books)**，创建一个副本然后重新赋值，就可以触发子组件渲染了。

## 操作信息存储到store

这里 **allSelectFlag** 可能为三个值，一个是全选，一个是全部都不选，还有一个是部分选择，为了方便，定义了一个枚举类型如下：

```ts
export enum AllSelectFlag {
  ALL_SELECT_FLAG = 0,
  NOT_ALL_SELECT_FLAG = 1,
  PARTIAL_SELECT_FLAG = -1,
}
```

然后把一些操作存储到 store 以便其他组件进行对应的响应

```ts
import { create } from 'zustand'
import { AllSelectFlag } from '@/shared/enums'

type ActionBook = {
  deleteFlag: boolean
  allSelectFlag: AllSelectFlag
  addSheftFlag: boolean
  cancelFlag: boolean
  updateDeleteFlag: (flag: boolean) => void
  updateAllSelectFlag: (flag: AllSelectFlag) => void
  updateAddSheftFlag: (flag: boolean) => void
  updateCancelFlag: (flag: boolean) => void
}

export const useActionBook = create<ActionBook>()((set) => ({
  deleteFlag: false,
  allSelectFlag: AllSelectFlag.NOT_ALL_SELECT_FLAG,
  addSheftFlag: false,
  cancelFlag: true,

  updateDeleteFlag: (flag: boolean) => {
    set({ deleteFlag: flag })
  },

  updateAllSelectFlag: (flag: AllSelectFlag) => {
    set({ allSelectFlag: flag })
  },

  updateAddSheftFlag: (flag: boolean) => {
    set({ addSheftFlag: flag })
  },

  updateCancelFlag: (flag: boolean) => {
    set({ cancelFlag: flag })
  },
}))
```

这样就可以在每个地方都知道用户进行了什么操作，大大的方便了后续的操作。

比如我们在 **Footer** 组件中选择了全选，这样改变了 allSelectFlag 的值，这样就会触发其他组件，然后让他所有的 checkbox 都选中。

删除，添加到其他书架操作也是如此。
