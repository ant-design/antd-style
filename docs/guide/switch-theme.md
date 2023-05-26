---
title: 主题切换
group: 快速上手
order: 2
demo:
  tocDepth: 4
---

# 主题切换

如今亮暗色主题切换的能力已经逐渐成为 PC、手机等默认支持得功能。浏览器也提供了媒体查询的能力来帮助我们快速适配亮色主题。在 Ant Design V5 中，基于 Css in Js 的能力我们实现了更加优雅的运行时主题切换能力。

但是由于 antd 作为基础组件的定位，在主题能力方面只提供了基础的 api ，并没有提供应用级开箱即用的方案。 所以 `antd-style` 在 antd 动态主题基础上，提供了一套完整的应用级动态主题方案。

## 1. 亮暗色主题切换

通过在容器组件 [ThemeProvider](/usage/theme-provider) 上修改 `apperance` props，即可实现主题切换，这是也是动态主题最简单的使用方式。

```tsx | pure
import { ThemeProvider } from 'antd-style';

export default () => {
  return (
    // 自动变为暗色模式
    <ThemeProvider apperance={'dark'}>
      <App />
    </ThemeProvider>
  );
};
```

<code src="../demos/guide/switch-theme/default.tsx"></code>

## 2. 自动响应系统主题

介绍完上述方案后，有心人应该会发现，这种方案会强依赖用户对主题的手动切换。但手机、电脑的系统级主题切换一般都是能跟随时间自动完成的，一般不需要用户手动操作。 因此一个现代化的主题切换能力，应该是像 macOS 这样，提供一个「自动」模式。
![](https://gw.alipayobjects.com/zos/kitchen/bSG%26I1A8I/bianzu.png)

在 `ThemeProvider` 中，我们提供了 `themeMode` 这个 props。对于不需要用户手动控制主题的场景，可以直接设置 `themeMode="auto"` 一键实现系统主题模式的自动切换。

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

## 3. 受控模式的主题切换

但在很多场景下， 我们需要给用户提供自助选择权，让用户自行切换需要的模式。我们提供了 useThemeMode 的 hooks，用于获取当前的主题模式，以及切换主题模式的能力。

<code src="../demos/guide/switch-theme/GlobalSwitch"></code>

除了 useThemeMode hooks 以外，也可以通过 `themeMode` 的受控来实现。

<code src="../demos/guide/switch-theme/ControlledSwitch"></code>

:::warning

注意：themeMode 和 appearance 目前暂不建议同时受控使用，不然可能会出现预料之外的问题。未来会增强此处的联动能力

:::

## 4. 结合 theme 配置进行主题自定义

antd v5 的 ConfigProvider 提供了 theme 配置，可以传入自定义的 theme 对象来实现自定义主题。

```tsx | pure
/**
 * 自定义主题算法
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
    // 支持传入方法，来动态响应外观
    theme={(appearance) =>
      appearance === 'dark'
        ? // 暗色自定义
          {
            token: { borderRadius: 2 },
            algorithm: [customDarkAlgorithm],
          }
        : // 亮色采用默认值
          undefined
    }
  >
    <App />
  </ThemeProvider>
);
```

<code src="../demos/guide/switch-theme/AntdTheme"></code>

## API

与主题切换相关的 API 查阅：[ThemeProvider](/api/theme-provider#themeprovider-api)
