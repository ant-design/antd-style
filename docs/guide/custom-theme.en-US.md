---
title: Custom Theme
order: 3
group: Quick Start
---

# Custom Theme

antd-style, combined with complete experience in business development, provides powerful and flexible theme customization capabilities, which will be introduced in the following three aspects: 1) antd theme customization, 2) custom application token, 3) custom appearance mode.

## Customize Ant Design Theme

The ConfigProvider of antd v5 provides the theme configuration, which can pass in a custom theme object to achieve custom themes. The ThemeProvider of antd-style provides a more convenient way for custom themes based on ConfigProvider.

### Compatible usage of ConfigProvider theme

```tsx | pure
import { ThemeProvider } from 'antd-style';

render(
  <ThemeProvider
    // Can directly pass in the theme object like CP
    theme={{
      token: {
        colorPrimary: '#ffff00',
      },
    }}
  >
    <App />
  </ThemeProvider>,
);
```

### Function writing method

For antd, to ensure the atomicity and composability of functions, ConfigProvider only saves one theme state. Therefore, if you need to support common light and dark theme switching, you need to encapsulate it at the application layer.

As an application layer, antd-style defines the `appearance` field, and thus supports light and dark theme switching by default. Therefore, the theme configuration also supports passing in a function to set different themes under different appearance modes.

```tsx | pure
import { ThemeProvider } from 'antd-style';

render(
  <ThemeProvider
    theme={(appearance) => {
      // If it is a dark mode, return the dark theme
      if (appearance === 'dark') {
        return {
          token: {
            colorPrimary: 'red',
          },
        };
      }

      // Otherwise, return the default theme
      return {
        token: {
          colorPrimary: 'blue',
        },
      };
    }}
  >
    <App />
  </ThemeProvider>,
);
```

The input parameter of the function is the current theme appearance, and the output is the theme object.

```ts
theme: ThemeConfig | (appearance: Appearance) => ThemeConfig;
```

:::success{title=Usage Suggestions}
In actual application development, due to the possibility of multiple theme configurations, it is recommended to extract the theme configuration into a separate file, and then uniformly export and use it as `getAntdTheme`. ([Example reference](https://github.com/arvinxx/dumi-theme-antd-style/blob/master/src/styles/antdTheme.ts))
:::

## Custom Token

At the beginning of the design, the default Token system of Ant Design was not created for all business customization demands, it only contains the tokens necessary for the Ant Design design system. In most business scenarios, we often need to customize some tokens to be uniformly consumed in the application. You may think that only designers need to care about tokens, but in fact, the token system is the foundation of application specifications, from a gradient style to the width of the top navigation bar, all can be uniformly managed and consumed in the token system.

Therefore, antd-style provides the ability to customize tokens, allowing the application layer to customize its own tokens and use them in `createStyles`, `styled`, and other style methods.

In the ThemeProvider, you can pass in custom tokens through the `customToken` field. Similar to the usage logic of theme, you can pass in an object or a function.

```tsx | pure
import { ThemeProvider } from 'antd-style';

// Object usage
export default () => (
  <ThemeProvider
    customToken={{
      customColor: '#1232f',
      headerHeight: 64,
    }}
  >
    <App />
  </ThemeProvider>
);
```

The input parameter of the function is some of our built-in methods, but the output is the token object. In this method's input parameter, you can get the current theme appearance, antd's token value, and thus achieve the inheritance effect of custom token themes.

```tsx | pure
export interface CustomTokenParams {
  appearance: ThemeAppearance;
  isDarkMode: boolean;
  token: AntdToken;
}

// Function usage
export default () => (
  <ThemeProvider
    customToken={({ token, isDarkMode }) => ({
      customColor: isDarkMode ? token.colorWarning : token.colorPrimary,
      headerHeight: 64,
    })}
  >
    <App />
  </ThemeProvider>
);
```

For detailed introductions on the demo of custom Token API, TypeScript type definition integration, etc., please refer to [ThemeProvider - Inject Custom Token Theme](/api/theme-provider#inject-custom-token-theme).

:::success{title=Application Example}
The document theme package used by antd-style has customized some custom tokens required by the theme package. If interested, you can go to [dumi-theme-antd-style](https://dumi-theme-antd-style.arvinx.app/components/dumi-site-provider#demo) to view.
:::

## Custom Appearance Mode

In addition, since `appearance` can be controlled and used, it is also possible to customize the Appearance mode to extend different themes.

<code src="../demos/guide/custom-theme/CustomAppearance"></code>

:::warning
If you need to customize the Appearance mode, it is not recommended to set `themeMode` to `auto`, as this will cause the Appearance mode to be affected by system theme switching, which may not meet your expectations.
:::
