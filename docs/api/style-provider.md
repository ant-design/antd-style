---
title: StyleProvider
description: 用于全局管理样式插入相关的配置
order: 2
group: 容器组件
demo:
  cols: 2
  tocDepth: 4
---

## 修改 container

指定 `container` 为 dom 节点，即可使得所有生成的样式（antd、antd-style）均插入到该节点下。

<code src="../demos/StyleProvider/customContainer.tsx"></code>

### 修改样式注入点

TBD

### 开启 speedy 极速模式

TBD

## API

继承 `ant-design/cssinjs` 的 [StyleProvider](https://github.com/ant-design/cssinjs#styleprovider) api ，其余 api 如下：

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
