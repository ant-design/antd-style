---
title: 自定义 antd 组件样式
group: 主题定制
---

# 如何更加优雅地覆写 antd 组件样式？

## 基于 ConfigProvider 自定义

antd 在 V5 提供了全新的 theme 属性用于自定义，因此如果需要自定义组件样式，建议优先采用 CP 上的 theme 字段。

示例 demo 如下：

<code src="./demos/ConfigProviderOverride.tsx"></code>

:::info
更多基于 ConfigProvider 的主题定制能力，详见 [聊聊 Ant Design V5 的主题（上）：CSSinJS 动态主题的花活](https://www.yuque.com/antfe/featured/durxuu94nvgvgmzq#vFlnd)。
:::

antd-style 的 ThemeProvider 是基于 ConfigProvider 的业务层封装，提供业务友好的定制能力，查看：[自定义主题](/zh-CN/guide/custom-theme)

## 基本覆写

`createStyles` 方法存在一个 `prefixCls` 参数，使用该参数可以传入组件的前缀，这样一来，任何的样式覆写都可以随着 prefixCls 的变化而自动变化。

<code src="./demos/DefaultOverride"></code>

## 抬升权重覆写

在某些组件中，直接添加类名可能因为权重不够高，导致无法覆盖样式，此时可以通过 `&` 符号来抬升相应的权重。

<code src="./demos/OverrideWeight"></code>

## 多 classNames 场景覆写

classNames 是 antd V5 的一个重头戏: [[RFC] Semantic DOM Structure for all Components](https://github.com/ant-design/ant-design/discussions/40221)。
在过去，我们要做样式定义，需要找很多 dom 节点进行大量的样式覆写，而 antd 版本升级的过程中，有时候会对 dom 结构进行调整。这样一来，我们覆写的样式就会出现问题。

而 classNames 将为我们提供一个稳定的 dom 结构 API ，我们可以通过 classNames 传入的类名，将会文档指向对应的 dom 节点，进而大大降低 DOM 变化带来的 Breaking Change 风险，同时也让我们不必再 hack 式地找样式类名。

<code src="./demos/InputclassNames.tsx"></code>

## 相关讨论

- [样式权重问题](https://github.com/ant-design/antd-style/issues/24)
