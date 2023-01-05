---
title: createGlobalStyle 全局样式
order: 10
group: 创建样式
---

# 全局样式

使用 `createGlobalStyle` 可以创建注入到全局的样式。 该方法的使用和 `styled-component` 基本没有区别，但实现上是基于 `@emotion/react` 和 `@emotion/serialize` 做的封装。

## 默认用法

<code src="../demos/globalStyles/default.tsx"></code>

## 结合 antd 的 token 使用

利用 antd v5 的 token 系统，我们可以自行组织实现一个在 Ant Design 中并不存在的 Button 样式。

<code src="../demos/globalStyles/AntdToken.tsx"></code>

:::warning

`<Global />` 需要套在 [`ThemeProvider`](/usage/theme-provider) 组件下，token 才能生效，否则是无效的。

:::

<code src="../demos/globalStyles/WithoutProvider.tsx"></code>
