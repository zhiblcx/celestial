---
title: 'checkbox'
description: '书籍的多选、单选'
pubDate: '2024-07-18 21:00:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/third.png'
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
  console.log('22')
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

原因是：我在父组件里面直接 **const currentBooks = books** 导致我只是创建了一个指向相同的新变量，也就是地址相同,而不是创建一个新的副本。

在 React 中，组件的重新渲染是基于 props 或 state 发生变化的时，React 会比较前后的两次值，并决定是否重新渲染，React 不会深度检查，只会比较引用是否相等，这里是引用了相同的地址所以不会触发子组件的重新渲染，导致点击 checkbox 并没有进行对应的选中或者是取消。

解决：**const currentBooks = Array.from(books)**，创建一个副本然后重新赋值，就可以触发子组件渲染了。
