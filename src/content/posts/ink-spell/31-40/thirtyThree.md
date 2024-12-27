---
title: '暗夜模式跟随系统'
description: '暗夜模式跟随系统(时间与主题)'
pubDate: '2024-12-04 20:44:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/31-40/thirtyThree.png'
tags: ['ink-spell']
selected: false
---

## 跟随系统主题

![''](@images/ink-spell/thirtyThree/image.png)

如上图，根据个性化的颜色主题，来设置网站的暗夜模式。

监听 **window.matchMedia('(prefers-color-scheme: dark)')** 的改变

用户点击了应用模式的暗

![''](@images/ink-spell/thirtyThree/image3.png)

用户点击了应用模式的亮

![''](@images/ink-spell/thirtyThree/image4.png)

观察到 **window.matchMedia('(prefers-color-scheme: dark)').matches** 这个值

- false 为白天模式
- true 为暗夜模式

代码如下：

```js
// 跟随系统主题
function syncWithSystemTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const systemTheme = prefersDark ? ThemeEnum.DARK : ThemeEnum.LIGHT
  changeTheme(systemTheme)
}

// 监听系统主题变化
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (_) => {
    syncWithSystemTheme()
  })
```

## 跟随系统时间

**ink-spell admin实现了该方法**

实现思想：

首先设置一个时间段，两个时间点，第一个为开始时间，第二个为结束时间，比如下面的代码是早上六点到晚上七点，包括六点不包括七点为白天时间，其余就是晚上时间。如下图，红色的为晚上，黑色的为白天。

![''](@images/ink-spell/thirtyThree/image2.png)

然后计算当前时间与设定的时间段，确定是否使用白天或夜间模式。如果当前是白天模式，将设置一个定时器，计算到下一个模式切换的时间，并在到达时间时自动切换到夜间模式。这个过程确保只有一个定时器在执行，这样减少了内存占用。

实现代码：

```js
export const useThemeStore = defineStore('theme', () => {
  const theme = ref<ThemeEnum>(ThemeUtils.getTheme() as ThemeEnum ?? ThemeEnum.LIGHT)
  const currentTheme = ref(ThemeEnum.LIGHT)
  let timer: NodeJS.Timeout | null = null
  const startTime = "6:00"
  const endTime = "19:00"

  function changeTheme(state: ThemeEnum) {
    if (state === ThemeEnum.SYSTEM) {
      currentTheme.value = syncThemeBasedOnTime()
    } else {
      currentTheme.value = state
    }
    ThemeUtils.changeTheme(currentTheme.value)
    ThemeUtils.setTheme(state)
    theme.value = state
  }

  // 跟随系统时间
  function syncThemeBasedOnTime(): ThemeEnum {
    // 当前时间
    const {
      currentHour, currentMinute,
      startTimeHour, startTimeMinute,
      endTimeHour, endTimeMinute
    } = getTimeComponents(startTime, endTime)
    // 如果当前时间在 endTimer(包括) - startTimeHour(不包括) 之间暗夜模式
    let result
    if (currentHour < startTimeHour ||
      (currentHour === startTimeHour && currentMinute < startTimeMinute) ||
      currentHour > endTimeHour ||
      (currentHour === endTimeHour && currentMinute >= endTimeMinute)
    ) {
      result = ThemeEnum.DARK
    } else {
      result = ThemeEnum.LIGHT
    }
    setupTimer()
    return result
  }

  // 设置定时器
  function setupTimer() {
    // 当前时间
    let nextCheckTime = 0
    let greeting = () => window.$message.success("星星点点，夜深了，愿你有个好梦", {
      icon: renderIcon(BlingIcon)
    })
    // 如果当前时间在 startTime(包括) - endTime(不包括) 之间，则设置下一个时间点 startTime 为白天模式
    const {
      currentHour, currentMinute,
      startTimeHour, startTimeMinute,
      endTimeHour, endTimeMinute
    } = getTimeComponents(startTime, endTime)
    if (currentHour < startTimeHour ||
      (currentHour === startTimeHour && currentMinute < startTimeMinute) ||
      currentHour > endTimeHour ||
      (currentHour === endTimeHour && currentMinute >= endTimeMinute)) {
      const tomorrow = TransformTimeUtils.getSpecificTimeInFuture({ n: 1, hour: startTimeHour, minute: startTimeMinute })
      nextCheckTime = TransformTimeUtils.compareTimerDiff(dayjs(tomorrow), dayjs(), 'second')
      greeting = () => window.$message.success("早安！新的一天开始了，愿你充满活力", {
        icon: renderIcon(LeafIcon)
      })
    } else {
      const today = TransformTimeUtils.getSpecificTimeInFuture({ n: 0, hour: endTimeHour, minute: endTimeMinute })
      nextCheckTime = TransformTimeUtils.compareTimerDiff(dayjs(today), dayjs(), 'second')
    }

    if (timer === null) {
      timer = setTimeout(() => {
        changeTheme(ThemeEnum.SYSTEM)
        greeting()
        if (timer != null) {
          clearTimeout(timer)
        }
        timer = null
      }, nextCheckTime * 1000)
    }
  }

  // 封装获取当前时间和特定时间的小时和分钟的函数
  function getTimeComponents(startTime: string, endTime: string) {
    const currentHour = TransformTimeUtils.getHour();
    const currentMinute = TransformTimeUtils.getMinute();
    const startTimeHour = parseInt(startTime.split(":")[0]);
    const startTimeMinute = parseInt(startTime.split(":")[1]);
    const endTimeHour = parseInt(endTime.split(":")[0]);
    const endTimeMinute = parseInt(endTime.split(":")[1]);

    return {
      currentHour,
      currentMinute,
      startTimeHour,
      startTimeMinute,
      endTimeHour,
      endTimeMinute,
    };
  }

  changeTheme(theme.value)
  return { theme, changeTheme, currentTheme }
})
```

## 参考文章

[在 WEB 端实现亮/暗主题跟随系统功能](https://sanonz.github.io/2020/to-build-dark-and-light-theme-with-web/)
