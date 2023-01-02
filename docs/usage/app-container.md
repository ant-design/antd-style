---
title: AppContainer
order: 2
group: 容器组件
demo:
  cols: 2
---

# AppContainer

用于包裹应用的实例对象，基于 antd 的 [`App`](https://ant.design/components/app-cn) 组件 和 [`ThemeProvider`](/usage/theme-provider) 进行封装。

该组件提供一键切换亮暗色主题、自定义主题、全局覆盖样式的统一入口。

## 基础使用

### 基础样式重置

如果没有包裹，在 dumi 文档中 a 节点的默认效果右下所示，而通过 antd App 组件的样式重置，可以保障不在 antd 组件中的原生标签也能符合 antd 的默认样式：

<code src="../demos/AppContainer/default.tsx"></code>
<code src="../demos/AppContainer/WithoutProvider.tsx"></code>

## 与 ThemeProvider 的区别？

`ThemeProvider` 和 `AppContainer` 看起来都是给应用提供主题消费场景的容器组件，但是在定位和使用上还是有很大区别的：

### ThemeProvider

ThemeProvider 本质上是一个 类似 React Context 的数据容器，用于为子级应用提供主题消费的相关数据，因此：

- 该组件本身不具有主题切换的能力，需要配合外层组件进行使用；
- 该组件不具有真实的 DOM 节点，只有虚拟节点，因此无法通过节点样式来限制自定义样式的范围；

### AppContainer

AppContainer 在期望上是能作为应用的根节点的角色，因此：

- 基于 antd `<App />` 组件封装，因此会有真实的 DOM 节点，可以把样式覆盖范围扩展到到不在 antd 组件内部的原生节点（例如 `a` 节点）；
- 集成了亮暗色主题切换的基础状态；
