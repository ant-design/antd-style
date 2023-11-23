---
title: Theme Switching
group: Quick Start
order: 2
demo:
  tocDepth: 4
---

# Theme Switching

Nowadays, the ability to switch between light and dark themes has gradually become a default feature on PCs, mobile phones, and other devices. Browsers also provide the ability to use media queries to help us quickly adapt to light themes. In Ant Design V5, we have implemented a more elegant runtime theme switching capability based on the Css in Js.

However, due to Ant Design's positioning as a basic component, it only provides basic APIs for theme capabilities and does not offer an out-of-the-box solution for application-level dynamic themes. Therefore, `antd-style` provides a complete application-level dynamic theme solution based on Ant Design's dynamic theme foundation.

## 1. Switching between Light and Dark Themes

By modifying the `appearance` props on the container component [ThemeProvider](/usage/theme-provider), you can achieve theme switching. This is also the simplest way to use dynamic themes.

```tsx | pure
import { ThemeProvider } from 'antd-style';

export default () => {
  return (
    // Automatically switch to dark mode
    <ThemeProvider appearance={'dark'}>
      <App />
    </ThemeProvider>
  );
};
```

<code src="../demos/guide/switch-theme/default.tsx"></code>

:::warning{title=If you are using static methods such as message}
In Ant Design V5, the static methods like message, notification, and modal do not respond to themes. It is recommended to use the hook versions of the static methods.

If you need to use these three static methods and also want them to respond to themes, please refer to [Static Method Theme Response](/case/static-method).
:::

## 2. Automatically Responding to System Themes

After introducing the above solution, attentive individuals should notice that this approach heavily relies on manual theme switching by users. However, the system-level theme switching on mobile phones and computers is generally automatically completed over time and usually does not require manual operation by users. Therefore, a modern theme switching capability should provide an "automatic" mode like macOS does.

![](https://gw.alipayobjects.com/zos/kitchen/bSG%26I1A8I/bianzu.png)

In `ThemeProvider`, we provide the `themeMode` prop. For scenarios that do not require manual control of themes, you can directly set `themeMode="auto"` to achieve automatic switching of system theme modes with one click.

```tsx | pure
import { ThemeProvider } from 'antd-style';

export default () => {
  return (
    <ThemeProvider themeMode={'auto'}>
      <App />
    </ThemeProvider>
  );
};
```

<code src="../demos/guide/switch-theme/AutoSwitch.tsx"></code>

:::info{title=What is the difference between appearance and themeMode?}
`appearance` describes the current appearance state of the application, while `themeMode` is used to describe the logic for controlling theme modes. Distinguishing between the two helps to achieve advanced theme capabilities.

See discussion: [#52](https://github.com/ant-design/antd-style/issues/52)
:::

## 3. Controlled Mode for Theme Switching

However, in many scenarios, we need to provide users with the autonomy to switch modes as they wish. We provide the `useThemeMode` hook, which is used to obtain the current theme mode and the capability to switch theme modes.

<code src="../demos/guide/switch-theme/GlobalSwitch"></code>

In addition to the `useThemeMode` hook, controlled mode can also be implemented through the `themeMode` prop.

<code src="../demos/guide/switch-theme/ControlledSwitch"></code>

:::warning

Note: It is currently not recommended to simultaneously control `themeMode` and `appearance`, as this may lead to unexpected issues. The linkage capability in this area will be enhanced in the future.

:::

## 4. Customizing Themes with Theme Configuration

Ant Design V5's ConfigProvider provides theme configuration, allowing you to pass in a custom theme object to customize the theme.

```tsx | pure
/**
 * Custom theme algorithm
 */
const customDarkAlgorithm = (seedToken, mapToken) => {
  const mergeToken = theme.darkAlgorithm(seedToken, mapToken);

  return {
    ...mergeToken,
    colorBgLayout: '#20252b',
    colorBgContainer: '#282c34',
    colorBgElevated: '#32363e',
  };
};

export default () => (
  <ThemeProvider
    themeMode={'dark'}
    // Supports passing in a method to dynamically respond to appearance
    theme={(appearance) =>
      appearance === 'dark'
        ? // Custom dark theme
          {
            token: { borderRadius: 2 },
            algorithm: [customDarkAlgorithm],
          }
        : // Use default values for light theme
          undefined
    }
  >
    <App />
  </ThemeProvider>
);
```

<code src="../demos/guide/switch-theme/AntdTheme"></code>

## API

Refer to the APIs related to theme switching: [ThemeProvider](/api/theme-provider#themeprovider-api)
