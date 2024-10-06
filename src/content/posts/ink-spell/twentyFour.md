---
title: '瀑布式布局'
description: '瀑布式布局'
pubDate: '2024-10-05 07:17:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/twentyFour.png'
tags: ['ink-spell']
selected: false
---

## 前言

瀑布式布局（Waterfall Layout）是一种常见的网页布局方式，它将内容以多列的形式排列，每一列的内容高度不固定，但宽度相同。这种布局方式可以有效地利用屏幕空间，使内容更加紧凑和美观。

## HTML 布局

首先，我们需要构建基本的 HTML 结构。每个图片或卡片都将被放置在一个带有 .box 类的<div>中，而这些<div>又会被包含在一个父级容器#container内。这样的结构有助于后续通过 CSS 和 JavaScript 来控制每个项目的样式和位置。

```html
<!doctype html>
<html lang="zh-Ch">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>瀑布流布局示例</title>
  </head>
  <body>
    <div id="container">
      <div class="box">
        <div class="box-img">
          <img src="./1.webp" alt="Image 1" />
        </div>
      </div>
      // 此处省略更多不同高度的照片
    </div>
    <script src="./index.js"></script>
  </body>
</html>
```

## CSS 样式

接下来是设置 CSS 样式。这里我们使用了float: left; 来让图片或卡片水平排列，同时设置了padding和border来增加美观性。为了确保所有元素都能正确显示，我们还重置了全局的padding和margin。

> 这里的浮动也可以用绝对定位来实现

```css
* {
  padding: 0;
  margin: 0;
}
#container {
  position: relative;
}
.box {
  float: left;
}
.box-img {
  width: 150px;
  padding: 5px;
  border: 1px solid #2eec48;
}
img {
  width: 100%;
}
```

## JavaScript 功能实现

我们使用 JavaScript 来动态计算每个图片或卡片的位置，实现瀑布流效果。关键在于计算每行可以容纳多少个元素（基于屏幕宽度），然后根据这个数字调整每个元素的位置。

### 逻辑

- 获取父容器和子元素：使用 **document.getElementById** 获取父容器，使用 **getChildElement** 获取所有子元素。
- 计算每行可容纳的子元素数量：通过屏幕宽度和子元素宽度计算每行能容纳的子元素数量。
- 初始化高度数组：用于记录每一列的高度。
- 遍历所有子元素：
  - 对于前 num 个子元素，直接记录它们的高度。
  - 对于剩余的子元素，找到当前最矮的一列，将子元素放置在该列的底部，并更新该列的高度

```javascript
function imgLocation(parent, content) {
  // 获取父容器
  var cparent = document.getElementById(parent)
  // 获取所有子元素（class 为 content 的元素）
  var ccontent = getChildElement(cparent, content)
  // 获取每个子元素的宽度
  var imgWidth = ccontent[0].offsetWidth
  // 计算每行能容纳的子元素数量
  var num = Math.floor(document.documentElement.clientWidth / imgWidth)
  // 设置父容器的宽度，使其刚好容纳所有子元素，避免溢出。
  cparent.style.width = `${imgWidth * num}px`
  // 初始化高度数组
  var BoxHeightArr = []
  // 遍历所有子元素
  for (var i = 0; i < ccontent.length; i++) {
    if (i < num) {
      // 存储每一列的高度的数组
      BoxHeightArr[i] = ccontent[i].offsetHeight
    } else {
      // 找到当前最矮的一列的高度
      var minHeight = Math.min.apply(null, BoxHeightArr)
      // 找到最矮一列的索引
      var minIndex = BoxHeightArr.indexOf(minHeight)
      // 将子元素的位置设置为绝对定位
      ccontent[i].style.position = 'absolute'
      // 设置子元素的 top属性，使其位于最矮一列的底部
      ccontent[i].style.top = minHeight + 'px'
      // 设置子元素的 left属性，使其水平位置与最矮一列对齐
      ccontent[i].style.left = ccontent[minIndex].offsetLeft + 'px'
      // 更新最矮一列的高度，加上当前子元素的高度
      BoxHeightArr[minIndex] += ccontent[i].offsetHeight
    }
  }
}

function getChildElement(parent, child) {
  // 获取 parent中所有的 child
  var childArr = []
  var allChild = parent.getElementsByTagName('*')
  // 筛选出来所有的 box
  for (var i = 0; i < allChild.length; i++) {
    if (allChild[i].className == child) {
      childArr.push(allChild[i])
    }
  }
  return childArr
}
```

## 在 ink-spell 中使用

**waterfallLayout.ts**

```js
// 瀑布式布局
export function cardLocation(
  parent: React.MutableRefObject<null>,
  grantParent: React.MutableRefObject<null>,
  subtract = 300
) {
  if (parent.current && grantParent.current && (parent.current as HTMLElement).children.length > 0) {
    const child = (parent.current as HTMLElement).children
    const num = Math.floor((window.innerWidth - subtract) / (child[0] as HTMLElement).offsetWidth)
    const currentGrantParent = grantParent.current as HTMLElement
    currentGrantParent.style.width = num * (child[0] as HTMLElement).offsetWidth + 'px'
    const boxHeightArr: number[] = []
    for (let i = 0; i < child.length; i++) {
      const currentChild = child[i] as HTMLElement
      if (i < num) {
        // 第一行
        currentChild.style.position = 'absolute'
        currentChild.style.top = 0 + 'px'
        currentChild.style.left = i * (child[0] as HTMLElement).offsetWidth + 'px'
        boxHeightArr.push((child[i] as HTMLElement).offsetHeight)
      } else {
        // 其他行
        // 找到最短的那一行
        const minHeight = Math.min(...boxHeightArr)
        const minIndex = boxHeightArr.indexOf(minHeight)

        // 摆放卡片
        currentChild.style.position = 'absolute'
        currentChild.style.top = minHeight + 'px'
        currentChild.style.left = (child[minIndex] as HTMLElement).offsetLeft + 'px'
        boxHeightArr[minIndex] = minHeight + currentChild.offsetHeight
      }
    }
    return true
  }
  return false
}
```

React 中使用 **waterfallLayout.ts**

```jsx
import { downloadBookShelfNotesMutation } from '@/features/bookshelf'
import { selectBookByBookShelfIdQuery } from '@/features/bookshelf/query'
import EmptyPage from '@/shared/components/EmptyPage'
import { Book } from '@/shared/types/book'
import { UrlUtils } from '@/shared/utils/UrlUtils'
import { cardLocation } from '@/shared/utils/waterfallLayout'
import { createLazyFileRoute } from '@tanstack/react-router'
import { FloatButton } from 'antd'
import { motion } from 'framer-motion'

export const Route = createLazyFileRoute('/_base/bookshelf/show/$bookShelfId')({
  component: () => <Page />
})

interface pageType {
  bookShelfId: string
}

function Page() {
  const { bookShelfId }: pageType = Route.useParams()
  const id = UrlUtils.decodeUrlById(bookShelfId)
  const { data: query, isSuccess, isPending } = selectBookByBookShelfIdQuery(id)
  const [data, setData] = useState([])
  const noteParent = useRef(null)
  const noteGrantParent = useRef(null)
  const [fallLayout, setFallLayout] = useState(false)
  const { mutate } = downloadBookShelfNotesMutation()

  useEffect(() => {
    const handleResize = () => {
      cardLocation(noteParent, noteGrantParent)
    }
    setFallLayout(cardLocation(noteParent, noteGrantParent))

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [window.innerWidth, noteParent.current, noteGrantParent.current])

  useEffect(() => {
    if (isSuccess) {
      setData(query?.data.data)
    }
  }, [isSuccess])

  return (
    <>
      {isPending ? (
        <Skeleton
          className="p-5"
          active
          paragraph={{ rows: 10 }}
        />
      ) : data.length === 0 && fallLayout ? (
        <EmptyPage name="暂时没有书籍，请先导入书籍哦~" />
      ) : (
        <motion.div
          ref={noteGrantParent}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ height: 'calc(100% - 80px)' }}
          className="scroll absolute h-full overflow-hidden overflow-y-scroll"
        >
          <div
            className="relative"
            ref={noteParent}
          >
            {data.map((item: Book) => (
              <div
                className="p-2"
                key={item.id}
              >
                <Card
                  title={item.name}
                  className="w-[325px]"
                >
                  <div className="space-y-1">
                    <div>作者名：{item.author || '暂无'}</div>
                    <div>主角：{item.protagonist || '暂无'}</div>
                    <div>描述：{item.description || '暂无'}</div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          <FloatButton
            type="primary"
            onClick={() => mutate(parseInt(id))}
          />
        </motion.div>
      )}
    </>
  )
}
```

[参考文献](https://juejin.cn/post/7416554802253185060)
