---
title: useTheme
order: 1
nav: API 手册
---

# useTheme

配合容器组件进行使用（`ThemeProvider` 使用 `AppContainer`），可以获取到容器下的主题信息。如果不添加 `ThemeProvider`，默认获取到的值为：

当 `useTheme` 放在 `ThemeProvider`或 `AppContainer` 组件下使用，才可以获得动态的主题值。

<code src="../demos/api/useTheme.tsx"></code>
