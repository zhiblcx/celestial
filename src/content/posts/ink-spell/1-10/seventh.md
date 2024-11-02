---
title: '解决CRLF与LF冲突'
description: 'vscode解决windows换行CRLF与LF冲突'
pubDate: '2024-07-24 21:53:00'
category: 'ink-spell'
cardImage: '@images/ink-spell/main/1-10/seventh.jpg'
tags: ['ink-spell', 'LF', 'CRLF']
selected: false
---

## vscode 解决 windows 换行CRLF与LF冲突

首先安装 **EditorConfig for VS Code** 插件

![](@images/ink-spell/seventh/image.png)

然后在项目根目录下创建一个 `.editorconfig` 文件，内容如下：

```init
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```
