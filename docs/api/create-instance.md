---
title: createInstance
description: 创建样式实例方法
sourceUrl: '{github}/blob/master/src/functions/createInstance.ts'
group:
  title: 高级设置
  order: 10
---

## 简介

使用 `createInstance` 可以创建另一组样式实例方法。对于应用样式方案来说这个方法基本用不到。但对于组件研发的场景则非常必要。

## 创建样式实例

为组件创建自己的样式实例，这样当使用组件库时可自动获得一套配置好默认值的样式方法。

```ts | pure
import { createInstance } from 'antd-style';

interface DefaultToken {
  accessColor: string;
}

const styleInstance = createInstance<DefaultToken>({
  // **** 样式生成相关 **** //

  key: 'abc', // 设定生成 hash 类名的前缀，结果为 .abc-xxxx
  speedy: false, // 目前的 cssinjs 方案中默认的 cssom 的插入方式与 qiankun 微应用兼容性都不太理想，所以建议关闭
  hashPriority: 'low', // 将生成 hash 的样式选择器设为 :where 选择器降低权重。这样可以让用户自定义的样式覆盖组件的样式

  // ***** 主题相关 ***** //
  // 配置默认传给 ThemeProvider 的 props，而该 Provider 同样可以被外部覆盖 props
  // 配置后的值也会成为相关方法消费的默认值，这样一来不需要包裹 ThemeProvider 即可消费到默认值

  prefixCls: 'tna', // 设定 antd 组件的 类名前缀，例如 Button 的类型将会是 .tna-btn
  customToken: {
    accessColor: '#12388f',
  },
});

export const {
  // **** 核心样式方法 **** //
  createStyles,
  createStylish,
  createGlobalStyle,

  // **** 基础样式方法 **** //
  cx,
  css,
  keyframes,
  injectGlobal,

  //****  样式表管理  **** //
  styleManager,

  // ****  数据容器   **** //
  useTheme,
  StyleProvider,
  ThemeProvider,
} = styleInstance;
```

## 指定 container

在创建时指定 container ，可以使得样式都在该容器处插入，在 iframe 等场景比较有用。

```ts
const { css, StyleProvider, createStyles } = createInstance({
  key: 'test',
  container: document.body,
});
```

<code src="../demos/api/createInstance/withContainer.tsx"></code>

如果你在组件库里用 `createInstance` 暴露出的 `createStyles` 定义好了样式，然后希望在不同的业务场景下指定不同的插入位置。

那么可以在业务应用使用时，在外部包一层 `StyleProvider` 并设置 `container` 来实现自定义位置的插入。

<code src="../demos/api/createInstance/withStyleProviderContainer.tsx"></code>

## 兼容 styled 主题方案

如果你使用 `styled-component` 且需要响应主题变化，都需要在组件外部包裹一个 `ThemeProvider`。这个时候，如果你的组件也需要响应主题变化，就需要在组件内部再包裹一个 `ThemeProvider`，通过在 createInstance 中传入 `styled` 的配置，即可让 `styled` 后的组件也响应自定义 Token。

```ts | pure
// styled-components 版本
import { createInstance } from 'antd-style';
import { ThemeContext } from 'styled-components';

const componentStyleIntanceWithSC = createInstance({
  // ...
  styled: { ThemeContext },
});
```

## API

| 属性名        | 类型                                      | 描述                                  |
| ------------- | ----------------------------------------- | ------------------------------------- |
| key           | `string`                                  | 生成的 CSS 关键词，默认为 `ant-css`。 |
| prefixCls     | `string`                                  | 默认的组件前缀。                      |
| speedy        | `boolean`                                 | 是否开启急速模式，默认为 `false`。    |
| container     | `Node`                                    | 渲染容器节点。                        |
| customToken   | `T`                                       | 默认的自定义 Token。                  |
| hashPriority  | `HashPriority`                            | 控制 CSS 类名生成的优先级。           |
| ThemeProvider | `Omit<ThemeProviderProps<T>, 'children'>` | 主题提供者。                          |
| styled        | `StyledConfig`                            | `styled-components` 配置项。          |
