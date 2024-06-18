---
title: 自定义主题
order: 3
group: 快速上手
---

# 自定义主题

antd-style 结合业务研发的完整经验，提供了强大灵活的主题自定义能力，将以下三方面介绍：1) antd 主题定制、2) 自定义应用 Token 、3）自定义外观模式。

## 自定义 Ant Design 的主题

antd v5 的 ConfigProvider 提供了 theme 配置，可以传入自定义的 theme 对象来实现自定义主题。antd-style 的 ThemeProvider 在 ConfigProvider 基础上做了二次封装，为自定义主题提供了更加便捷的方式。

### 兼容 ConfigProvider 的 theme 用法

```tsx | pure
import { ThemeProvider } from 'antd-style';

render(
  <ThemeProvider
    // 可以和 CP 一样直接传入 theme 对象
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

### 函数写法方法

对于 antd 来说，为保证功能的原子性和可组合型，ConfigProvider 只会保存一种主题状态，因此如果需要支持常见的亮暗色主题切换，就需要应用层自行封装。

antd-style 作为应用层，定义了 `appearance` 字段，进而默认支持亮暗色主题切换。因此 theme 配置也支持传入函数分别设定不同外观模式下的主题。

```tsx | pure
import { ThemeProvider } from 'antd-style';

render(
  <ThemeProvider
    theme={(appearance) => {
      // 如果是暗色模式，就返回暗色主题
      if (appearance === 'dark') {
        return {
          token: {
            colorPrimary: 'red',
          },
        };
      }

      // 否则就返回默认主题
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

函数的入参为当前的主题外观，出参为 theme 对象。

```ts
theme: ThemeConfig | (appearance: Appearance) => ThemeConfig;
```

:::success{title=使用建议}
在实际的应用研发中，由于可能会存在主题配置较多的情况，因此建议将主题配置抽离到单独的文件中，然后统一成一个 `getAntdTheme` 导出使用。（[案例参考](https://github.com/arvinxx/dumi-theme-antd-style/blob/master/src/styles/antdTheme.ts)）
:::

## 自定义 Token

在设计之初， Ant Design 默认的 Token 体系并不是面向所有业务定制化的诉求而打造的，它只包含了 Ant Design 设计系统所必须的 token。在绝大多数业务场景中，我们往往需要自定义一些 Token ，以便于在应用中统一消费。可能你会觉得 Token 只有设计师才需要关心，但是实际上 Token 体系是应用规范的基础，大到一个渐变的样式，小到顶部导航栏的宽度，都可以收到 token 体系中统一管理与消费。

因此 antd-style 中提供了自定义 token 的能力，让应用层可以自定义自己的 token，并在 `createStyles` 、 `styled` 等样式方法中使用。

在 ThemeProvider 中，可以通过 `customToken` 字段传入自定义的 token。和 theme 的使用逻辑一样，你既可以传入一个对象，也可以传入一个函数。

```tsx | pure
import { ThemeProvider } from 'antd-style';

// 对象用法
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

函数的入参为我们内置的一些方法，但出参为 token 对象。在该方法入参中，你可以拿到当前的主题外观、antd 的 token 值，进而实现自定义 token 的主题继承效果。

```tsx | pure
export interface CustomTokenParams {
  appearance: ThemeAppearance;
  isDarkMode: boolean;
  token: AntdToken;
}

// 函数用法
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

关于自定义 Token API 的 demo、Typescript 类型定义集成 等详细介绍，可以查阅 [ThemeProvider - 注入自定义 Token 主题](/zh-CN/api/theme-provider#注入自定义-token-主题)。

:::success{title=应用案例}
antd-style 所使用的文档主题包，就自定义了主题包所需的一些自定义 Token，若感兴趣可以前往 [dumi-theme-antd-style](https://dumi-theme-antd-style.arvinx.app/components/dumi-site-provider#demo) 查看。
:::

## 自定义外观模式

此外，由于 `appearance` 可以受控使用，因此也可以自定义 Appearance 模式来扩展不同主题。

<code src="../demos/guide/custom-theme/CustomAppearance"></code>

:::warning
如果你需要自定义外观模式，建议不要将 `themeMode` 设为 `auto`，因为这样会导致外观模式受到系统主题切换的影响，可能会和你的预期不相符。
:::
