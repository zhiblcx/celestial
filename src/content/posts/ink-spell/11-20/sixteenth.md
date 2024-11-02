---
title: 'dnd-kit 实现移动书架'
description: '利用 dnd-kit 实现用户移动书架'
pubDate: '2024-08-11 20:11:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/sixteenth.jpg'
tags: ['ink-spell', 'dnd-kit']
selected: false
---

## 高阶组件

高阶组件 (HOC) 是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

简而言之，**高阶组件是参数为组件，返回值为新组件的函数**。

```tsx
export function SortableItem({ item, MoveItem }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li ref={setNodeRef} style={style} {...attributes} className="relative">
      <MoveItem move={listeners} />
    </li>
  )
}
```

```tsx
<SortableItem
  item={menu}
  id={menu.id}
  key={menu.id}
  MoveItem={(props) => (
    <Navigation
      value={menu.label}
      label={`/bookshelf/${menu.id}`}
      Icon={BookHeart}
      Move={Move}
      move={props.move}
    />
  )}
></SortableItem>
```

MoveItem 函数作为一个高阶组件，接受一个函数作为参数，并返回一个新的组件，这个新的组件是 Navigation 组件，它接受一系列属性，并将 props.move 传递给 Move 属性。

主要是把 listeners 绑定在了 Navigation Move 图标上，达到通过移动 Move 图标，去移动书架。所以这里只呈现关于 dnd-kit 的代码，详情请看[dnd-kit官网](https://docs.dndkit.com/presets/sortable#drag-overlay)

```tsx
<Sortable originItems={bookShelfMenu} setOriginItems={setBookShelfMenu}>
  <ul className="mb-6 mt-2 space-y-2 overflow-hidden whitespace-nowrap transition-all">
    {bookShelfMenu.map(
      (menu: {
        id: number
        label: string
        allFlag: boolean
        position: number
      }) =>
        !menu.allFlag ? (
          <SortableItem
            item={menu}
            id={menu.id}
            key={menu.id}
            MoveItem={(props) => (
              <Navigation
                value={menu.label}
                label={`/bookshelf/${menu.id}`}
                Icon={BookHeart}
                Move={Move}
                move={props.move}
              />
            )}
          ></SortableItem>
        ) : null
    )}
  </ul>
</Sortable>
```

```tsx
import { request } from '@/shared/API'
import { BookShelfType } from '@/shared/types/bookshelf'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import lodash from 'lodash'

interface SortableProps {
  originItems: BookShelfType[]
  setOriginItems: React.Dispatch<React.SetStateAction<BookShelfType[]>>
  children: JSX.Element
}

interface SortableItemProps {
  item: PositionProps
  id: number
  MoveItem: React.ComponentType<any>
}

interface PositionProps {
  position: number
  id: number
}

export function SortableItem({ item, MoveItem }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li ref={setNodeRef} style={style} {...attributes} className="relative">
      <MoveItem move={listeners} />
    </li>
  )
}

function Sortable({ originItems, setOriginItems, children }: SortableProps) {
  let sensors = useSensors()
  if (window.innerWidth >= 400) {
    sensors = useSensors(useSensor(PointerSensor))
  } else {
    sensors = useSensors(useSensor(TouchSensor))
  }

  const { mutate } = useMutation({
    mutationFn: (data: BookShelfType & { bookShelfName: string }) =>
      request.put(`bookshelf/${data.id}`, data),
    onSuccess: (data) => {
      showMessage(data)
    },
  })

  const showMessage = lodash.throttle((data) => {
    message.success(data.data.message)
  }, 1000 * 10)

  const downloadFiledebounce = lodash.debounce((updatedItems) => {
    updatedItems.map((item: BookShelfType, index: number) => {
      if (item.position === index + 1) {
        return
      } else {
        item.position = index + 1
        mutate({ ...item, bookShelfName: item.label })
      }
    })
  }, 3000)

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={originItems}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  )

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active.id !== over?.id) {
      setOriginItems((items) => {
        const oldIndex = items.findIndex((item) => active.id === item.id)
        const newIndex = items.findIndex((item) => over?.id === item.id)
        const updatedItems = arrayMove(items, oldIndex, newIndex)

        downloadFiledebounce(updatedItems)

        return updatedItems
      })
    }
  }
}

export default Sortable
```
