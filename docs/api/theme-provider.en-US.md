---
title: ThemeProvider
description: A container for globally managing theme variables. It provides a unified entry point for one-click switching between light and dark themes, custom themes, and application-level scoped styles.
order: 1
group:
  title: Container Components
  order: 1
demo:
  cols: 2
  tocDepth: 4
---

## Introduction

ThemeProvider is a container for globally managing theme variables. Based on encapsulating the `ConfigProvider`, this component provides a unified entry point for one-click switching between light and dark themes, custom themes, and application-level scoped styles. At the same time, the `useTheme` method under this container can obtain the `theme` object within this layer.

ThemeProvider is essentially a React Context data container used to provide related theme consumption data for child applications. Therefore:

- It integrates the basic state of switching between light and dark themes
- Supports automatic response to system themes
- Provides a callback object for the antd static instance method (this static method can respond to themes normally)
- This component does not have a real DOM node, so it cannot limit the scope of custom styles through node styles

## Theme Switching

ThemeProvider integrates the ability to switch between light and dark themes by default, and you can quickly complete the switching between light and dark themes through the `appearance` props. For more details about the theme switching ability of `antd-style`, you can refer to [Theme Switching](/guide/switch-theme).

<code src="../demos/ThemeProvider/SwitchTheme.tsx"></code>

## Usage of useTheme

After wrapping the top-level with ThemeProvider, use `useTheme` to get the theme object, which includes antd v5 token theme values, custom themes, and current theme appearance methods. For detailed API, see [](api/use-theme-mode)

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

Example effect: <code src="../demos/ThemeProvider/default.tsx"></code>

:::info{title=Tips}

`useTheme` will look for the theme value in the nearest `ThemeProvider` component. If there are multiple nested layers, only the innermost layer will take effect.

:::

## Injecting Custom Token Themes

You can inject custom tokens through the `customToken` method of `ThemeProvider` and consume them through the `useTheme` method.

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

Example effect:

<code src="../demos/ThemeProvider/customToken.tsx"></code>

## Typescript Type Support

By extending the type definition of the `CustomToken` interface for `antd-style`, you can add corresponding token type definitions to the `useTheme` hooks.

At the same time, by adding generics to the `ThemeProvider` object, you can constrain the input parameter definition of `customToken`.

```tsx | pure
import { ThemeProvider, useTheme } from 'antd-style';

interface NewToken {
  customBrandColor: string;
}

// By extending the CustomToken object type definition for antd-style, you can add corresponding token objects to useTheme
declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomToken extends NewToken {}
}

const App = () => {
  const token = useTheme();
  return <div>{token.customBrandColor}</div>;
};

export default () => (
  // By adding generics to the ThemeProvider object, you can constrain the input parameter definition of customToken
  <ThemeProvider<NewToken> customToken={{ customBrandColor: '#c956df' }}>
    <App />
  </ThemeProvider>
);
```

:::info

Since `CustomToken` is most likely an empty interface, if the project has a rule to configure `@typescript-eslint/no-empty-interface`, the interface definition will be corrected to type during code formatting, and since type cannot be extended, it will cause loss of prompts (related issue: [#16](https://github.com/ant-design/antd-style/issues/16)). Therefore, the solution is to add a disabled rule as shown in the example code above.

:::

## Basic Style Reset

The default effect of the `a` node in the dumi document is as follows.

<code src="../demos/ThemeProvider/demo.tsx"></code>

By resetting the style of the antd App component, you can ensure that native tags (`<a>`, etc.) not in the antd component also conform to the default style of antd (bottom left).

<code src="../demos/ThemeProvider/WithApp.tsx"></code> <code src="../demos/ThemeProvider/WithProvider.tsx"></code>

## Consuming Static Instance Methods

In v5, due to the issue of react lifecycle, static methods were removed, so if you use the default exported static methods of antd such as message, they will not respond to dynamic themes. Therefore, ThemeProvider provides a `getStaticInstance` interface to provide the static method instance that responds to dynamic themes for external use.

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

## Adding Scoped Styles to the Container

If you need to affect only the styles under ThemeProvider, you can combine the `className` props of the antd App component with the `css` or [createStyles](/usage/create-styles) method to add local scoped styles.

<code src="../demos/ThemeProvider/AppGlobalStyle.tsx"></code>

:::info{title=Global Style Scope}

In the world of css-in-js, local scope is very easy to achieve. Therefore, global scope usage should be minimized as much as possible (use global scope only if necessary). This is also the recommended practice in antd v5. However, if you still need to inject styles at the global scope level, you can use [createGlobalStyles](/usage/global-styles) to achieve this.

:::

## Nested ThemeProvider

In some scenarios, we may need to nest another ThemeProvider within a ThemeProvider. In this case, it should be noted that the inner ThemeProvider will override the outer ThemeProvider.

<code src="../demos/ThemeProvider/nested-prefixCls.tsx"></code>

## Integration with styled

antd-style provides compatibility with styled-components' ThemeProvider through the `styled` method, and then uses antd-style's ThemeProvider to provide theme consumption for styled-components or the emotion/styled library.

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

| Name               | Default Value                          | Description                                                                                                                                             |
| ------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| customToken        | `undefined`                            | Custom tokens, can be extended and added to your own needs based on the antd v5 token specification                                                     |
| customStylish      | `undefined`                            | Custom Stylish variables                                                                                                                                |
| appearance         | `light`                                | The appearance theme of the application, built-in light and dark themes, can be extended by yourself                                                    |
| defaultAppearance  |                                        |                                                                                                                                                         |
| onAppearanceChange | `(appearance:ThemeAppearance) => void` | Callback for appearance theme                                                                                                                           |
| themeMode          | `light`                                | Theme display mode, with three configurations: follow system, light, dark. Automatic mode is not enabled by default and needs to be configured manually |
| defaultThemeMode   | null                                   | Default theme display mode                                                                                                                              |
| onThemeModeChange  | `(themeMode: ThemeMode) => void`       | Callback after theme mode is modified                                                                                                                   |
