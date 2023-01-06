---
title: ThemeProvider
order: 1
group:
  title: 容器组件
  order: 1
nav: 应用指南
---

# ThemeProvider

用于全局管理主题变量的容器，在该容器下的 `useTheme` 方法可获得容器中的 token 值。

## 默认用法

全局顶层包裹 ThemeProvider 后，使用 `useTheme` 获取 antd Token 主题值。

```tsx | pure
import { ThemeProvider, useTheme } from 'antd-style';

const App = () => {
  const theme = useTheme();

  return <div>{theme.colorPrimary}</div>;
};

export default () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};
```

实例效果：
<code src="../demos/ThemeProvider/default.tsx"></code>

:::warning

`useTheme` 只有放在 `ThemeProvider` 组件下，token 值才生效，否则是无效的，切记。

:::

## 注入自定义 Token 主题

通过 `ThemeProvider` 的 `customToken` 方法可以注入自定义 Token，并通过 `useTheme` 方法进行消费。

```tsx | pure
import { ThemeProvider } from 'antd-style';

const App = () => {
  const theme = useTheme();

  return <div>{theme.customBrandColor}</div>;
};

export default () => {
  return (
    <ThemeProvider customToken={{ customBrandColor: '#c956df' }}>
      <App />
    </ThemeProvider>
  );
};
```

实例效果：

<code src="../demos/ThemeProvider/customToken.tsx"></code>

### Typescript 类型支持

通过给 `antd-style` 扩展 `CustomToken` 接口的类型定义，可以为 `useTheme` hooks 中增加相应的 token 类型定义。

同时，给 `ThemeProvider` 对象添加泛型，可以约束 `customToken` 的入参定义。

```tsx | pure
import { ThemeProvider, useTheme } from 'antd-style';

interface NewToken {
  customBrandColor: string;
}

// 通过给 antd-style 扩展 CustomToken 对象类型定义，可以为 useTheme 中增加相应的 token 对象
declare module 'antd-style' {
  export interface CustomToken extends NewToken {}
}

const App = () => {
  const token = useTheme();
  return <div>{token.customBrandColor}</div>;
};

export default () => (
  // 给 ThemeProvider 对象添加泛型后可以约束 customToken 接口的入参定义
  <ThemeProvider<NewToken> customToken={{ customBrandColor: '#c956df' }}>
    <App />
  </ThemeProvider>
);
```

### ThemeProvider API

| 名称        | 默认值      | 描述                                                                                                     |
| ----------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| customToken | `undefined` | 自定义 token， 可在 antd v5 token 规范基础上扩展和新增自己需要的 token                                   |
| customTheme | `undefined` | 自定义主题变量， 注入后可以在 `useTheme` 中获取一些 token 以外的用在主题场景的信息，例如 `isDarkMode` 等 |
