---
title: StyleProvider
description: 用于全局管理样式插入相关的配置
order: 2
group: 容器组件
demo:
  tocDepth: 4
---

## 修改 container

指定 `container` 即可使得所有生成的样式（antd、antd-style）均插入到该节点下。

<code src="../demos/StyleProvider/customContainer.tsx"></code>

## 修改样式注入点

一般情况下不太需要用到，如果你需要兼容组件覆写样式的需求时，可以考虑设定组件样式的注入点，使得其在该节点之后注入。

<code src="../demos/StyleProvider/insertpoint.tsx"></code>

## 开启 speedy 极速模式

开启 emotion 的 speedy 模式。建议独立应用可以开启。

<code src="../demos/StyleProvider/speedy.tsx"></code>

:::info{title=Speedy 模式}

早期的 cssinjs 方案中，样式的插入是一个 style 标签对应一个样式，浏览器解析较慢，但便于修改与调试。

目前 emotion 默认使用现代化的 CSSOM api 插入样式，会把一堆 css 放到一个 <style></style> 标签里，插入后移除相应的内容。这种方式性能很好，支持万级别的样式插入。但与微应用（qiankun）兼容性较差。

antd-style 中默认关闭了 speedy 模式，如果需要，配置 `speedy` 为 `true` 即可。
:::

## API

继承 `ant-design/cssinjs` 的 [StyleProvider](https://github.com/ant-design/cssinjs#styleprovider) ，其余 API 如下：

| 属性名          | 类型                                   | 描述                                                                 |
| --------------- | -------------------------------------- | -------------------------------------------------------------------- |
| prefix          | `string`                               | emotion 样式前缀，默认值为 acss                                      |
| nonce           | `string`                               | 随机数，用于 CSP                                                     |
| stylisPlugins   | `StylisPlugin[]`                       | Stylis 插件数组                                                      |
| container       | `Element`                              | 渲染样式的容器                                                       |
| speedy          | `boolean`                              | 是否开启极速模式，极速模式下不会插入真实的样式 style，默认为 `false` |
| insertionPoint  | `HTMLElement`                          | 样式插入点，用于控制第一个样式的插入位置                             |
| getStyleManager | `(styleManager: StyleManager) => void` | 获取到 styleManager 实例的回调函数                                   |
| children        | `ReactNode`                            | 子组件                                                               |
