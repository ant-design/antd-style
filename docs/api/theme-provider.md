---
title: ThemeProvider
description: 用于全局管理主题变量的容器。提供了一键切换亮暗色主题、自定义主题、应用级作用域样式的统一入口。
order: 1
group:
  title: 容器组件
  order: 1
demo:
  cols: 2
  tocDepth: 4
---

## 简介

用于全局管理主题变量的容器，该组件在封装 `ConfigProvider` 基础上，提供了一键切换亮暗色主题、自定义主题、应用级作用域样式的统一入口。同时在该容器下的 `useTheme` 方法可获得这一层容器中的 `theme` 对象。

ThemeProvider 本质上是一个 React Context 的数据容器，用于为子级应用提供主题消费的相关数据，因此：

- 集成了亮暗色主题切换的基础状态
- 支持自动相应系统主题；
- 提供 antd 静态对象实例的回调对象（该静态方法能正常响应主题）；
- 该组件不具有真实的 DOM 节点，因此无法通过节点样式来限制自定义样式的范围；

## 主题切换

ThemeProvider 默认集成亮暗色主题切换能力，通过 `appearance` props 即可快速完成亮暗色的主题切换。如需详细了解 `antd-style` 的主题切换能力，可以参阅 [主题切换](/guide/switch-theme) 这一部分。

<code src="../demos/ThemeProvider/SwitchTheme.tsx"></code>

## useTheme 用法

全局顶层包裹 ThemeProvider 后，使用 `useTheme` 获取 theme 对象，其中包含 antd v5 token 主题值、自定义主题、当前的主题外观等方法。 api 详见 [](api/use-theme-mode)

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

:::info{title=温馨提示}

`useTheme` 会查找最近一层的 `ThemeProvider` 组件中的 theme 值。如果存在多层嵌套，最里面的一层才会生效。

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

## Typescript 类型支持

通过给 `antd-style` 扩展 `CustomToken` 接口的类型定义，可以为 `useTheme` hooks 中增加相应的 token 类型定义。

同时，给 `ThemeProvider` 对象添加泛型，可以约束 `customToken` 的入参定义。

```tsx | pure
import { ThemeProvider, useTheme } from 'antd-style';

interface NewToken {
  customBrandColor: string;
}

// 通过给 antd-style 扩展 CustomToken 对象类型定义，可以为 useTheme 中增加相应的 token 对象
declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
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

:::info
由于 CustomToken 大概率是一个空 interface，如果在项目中有配置 ` @typescript-eslint/no-empty-interface` 的规则，就在代码格式化时导致接口定义被订正改为 type，而 type 是无法扩展的，会导致提示丢失（相关 issue: [#16](https://github.com/ant-design/antd-style/issues/16)）。因此解决方案为如上述示例代码一样，添加禁用规则。
:::

## 基础样式重置

在 dumi 文档中 a 节点的默认效果如下所示。

<code src="../demos/ThemeProvider/demo.tsx"></code>

而通过 antd App 组件的样式重置，可以保证不在 antd 组件中的原生标签（`<a>` 等）也能符合 antd 的默认样式（左下）。

<code src="../demos/ThemeProvider/WithApp.tsx"></code>
<code src="../demos/ThemeProvider/WithProvider.tsx"></code>

## 消费静态实例方法

v5 中由于 react 生命周期的问题移除了静态方法，因此如果使用 antd 默认导出的 message 等静态方法，会无法响应动态主题。因此 ThemeProvider 中提供了一个 `getStaticInstance` 接口，将响应动态主题的静态方法实例提供给外部使用。

```tsx | pure
/**
 * iframe: 240
 */
import { ThemeProvider } from 'antd-style';
import { MessageInstance } from 'antd/es/message/interface';

let message: MessageInstance;

export default () => {
  const showMessage = () => {
    message.success('Success!');
  };
  return (
    <ThemeProvider
      getStaticInstance={(instances) => {
        message = instances.message;
      }}
    >
      {/*... */}
    </ThemeProvider>
  );
};
```

<code src="../demos/ThemeProvider/staticMethod.tsx"></code>

## 添加容器作用域样式

如果需要只影响 ThemeProvider 下的样式，可以结合 antd 的 App 组件，利用它的 `className` 的 props 结合 `css` 或 [createStyles](/usage/create-styles) 方法，即可添加局部作用域样式。

<code src="../demos/ThemeProvider/AppGlobalStyle.tsx"></code>

:::info{title=全局样式作用域}
在 css-in-js 的世界中，局部作用域非常容易实现。因此应该尽量减少全局作用域的使用（实在不行才用全局作用域）。 这也是 antd v5 中推荐的用法。但如果仍然需全局作用域层面的样式注入，可以使用 [createGlobalStyles](/usage/global-styles) 来完成。
:::

## styled 集成

antd-style 通过 `styled` 方法提供了 styled-components 的 ThemeProvider 兼容能力，进而使用 antd-style 的 ThemeProvider 为 styled-components 或 emotion/styled 库提供主题消费。

```tsx | pure
export interface StyledConfig {
  ThemeProvider?: StyledThemeProvider;
  useTheme?: () => any;
}

export interface ThemeProviderProps {
  styled?: StyledConfig;
}
```

## API

| 名称               | 默认值                                 | 描述                                                                                  |
| ------------------ | -------------------------------------- | ------------------------------------------------------------------------------------- |
| customToken        | `undefined`                            | 自定义 token， 可在 antd v5 token 规范基础上扩展和新增自己需要的 token                |
| customStylish      | `undefined`                            | 自定义 Stylish 变量                                                                   |
| appearance         | `light`                                | 应用的展示外观主题，内置亮色和暗色两种，可以自行扩展                                  |
| defaultAppearance  |                                        |                                                                                       |
| onAppearanceChange | `(appearance:ThemeAppearance) => void` | 外观主题的回调                                                                        |
| themeMode          | `light`                                | 主题的展示模式，有三种配置：跟随系统、亮色、暗色 默认不开启自动模式，需要手动进行配置 |
| defaultThemeMode   | `n/a`                                  |                                                                                       |
