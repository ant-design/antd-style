---
title: 集成 styled
order: 10
group:
  title: 进阶使用
  order: 2
demo:
  cols: 2
---

# 搭配 styled 消费

经过详尽调研与大量业务实践后，我们决定不在 `antd-style` 中内置 `styled` 的方法，而是为 styled 的用户提供主题兼容方案。

:::info{title=温馨提示}
如果你对 styled 不太了解，建议先查阅 [styled-components](https://styled-components.com/) 了解它的使用方式
:::

## styled 的主题响应原理

先来看一个 styled 典型的主题消费方式：

```tsx | pure
import { styled } from 'styled-components';

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.primary};
`;

const App = () => {
  const [apperance] = useState('light');
  return (
    <ThemeProvider theme={{ primary: apperance === 'light' ? 'blue' : 'cyan' }}>
      <StyledButton>Click me</StyledButton>
    </ThemeProvider>
  );
};
```

可以看到，styled 的主题响应是通过 `ThemeProvider` 来提供的，它会将 theme 作为 props 传递给 StyledButton，进而实现主题的响应。在底层，无论是 styled-components 还是 @emotion/styled 的 ThemeProvider，都是通过 React 的 `Context` 来创建 Provider 容器和 hooks 方法。

也就是说 `styled` 方法和 `ThemeProvider`（以及配套的`useTheme`）必须成对出现。 styled-components 的 styled 无法响应 @emotion/styled 的 ThemeProvider， @emotion/styled 的 useTheme 也不能响应 styled-components 的 ThemeProvider。

通过分别阅读二者的源码( [styled-components](https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/models/StyledComponent.ts)、[@emotion/styled](https://github.com/emotion-js/emotion/blob/main/packages/styled/src/base.js#LL117C53-L117C53) )，我们发现这些 styled 的实现都耦合了各自创建的 Context，因此外部不能传入自定义的 Context。

这就使得如果使用 styled 来创建样式组件，每个组件的使用就必须要在外部套一层 ThemeProvider ，而不是像普通组件一样直接引入即可。

```tsx | pure
// 单独使用，样式会丢
render(<StyledButton />);

// 必须包裹一层 ThemeProvider ，才可正常使用
render(
  <ThemeProvider>
    <StyledButton />
  </ThemeProvider>,
);

// 或者给每个组件都单独定义一下 defaultProps
StyledButton.defaultProps = {
  theme: {
    primary: 'red',
  },
};
```

那这些麻烦操作的根源都在于 styled 使用的 ThemeProvider 不提供自定义 Context 注入。目前来看，styled-components 应该不会实现该特性（[issue](https://github.com/styled-components/styled-components/issues/3612)）。

这也就意味如果想要自定义一个 ThemeContext 作为组件的默认主题，并在 styled 的写法中获取到，就必须要自己实现自己的 styled 方法，但这对于绝大多数组件开发者来说并不现实。

在 [CSS in JS 写法对比](/guide/compare) 这一章节中，我们认为 styled 这个 api 由于设计缺陷，在未来将会没落。所以我们在 antd-style 中也将只提供 styled 的 ThemeProvider 和 useTheme 的兼容使用方案。

## styled 与 ThemeProvider 集成

在 antd-style 的 ThemeProvider 中，我们提供了一个 `styled` 的 props ，用于接收外部 styled 所对应的 ThemeContext ，进而让 styled 方法可以响应到 antd-style 中的 antd token 、 自定义 token 与主题状态。

```tsx | pure
import { ThemeProvider } from 'antd-style';
import { ThemeContext } from 'styled-components';

render(
  <ThemeProvider styled={{ ThemeContext }}>
    <StyledButton />
  </ThemeProvider>,
);
```

<code src="../demos/guide/styled/StyledComponentsProps"></code>
<code src="../demos/guide/styled/EmotionStyledProps.tsx"></code>

关于 ThemeProvider 的 styled API 文档，详见: [ThemeProvider - styled 集成配置](/api/theme-provider#styled-集成)

## 全局统一集成 styled

针对存在多个 ThemeProvider 的场景，我们提供了一个 `setupStyled` 方法，用于将外部 styled 的 ThemeContext 统一注入到 antd-style 的 ThemeProvider 里，进而让 styled 方法可以响应到任意一个 ThemeProvider。

```tsx | pure
import { setupStyled, ThemeProvider } from 'antd-style';
import { ThemeContext } from 'styled-components';

// 将 styled-components 的 ThemeContext 注入到 antd-style 的 ThemeProvider 中
setupStyled({ ThemeContext });

render(
  <ThemeProvider>
    <StyledButton />
  </ThemeProvider>,
);
```

<code src="../demos/guide/styled/SetupStyled/index.tsx"></code>

:::waring
请注意：setupStyled 需要在应用初始化前执行，否则不会生效。此外由于 setupStyled 会对 antd-style 的所有 ThemeProvider 生效，不建议在多个应用场景下使用，否则可能会污染其他应用的 ThemeProvider。
:::

## Typescript 类型定义支持

同 antd-style 的主题类型扩展一样，如果需要让各自的 styled 方法能够获取到 antd-style 的主题类型，需要在项目中全局补充 styled-components 或 @emotion/styled 的类型定义。

### 为 styled-components 注入主题类型

为 styled-components 的 styled 注入 antd-style 的主题类型。

```tsx | pure
import { Theme as AntdStyleTheme } from 'antd-style';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends AntdStyleTheme {}
}
```

### 为 @emotion/styled 注入主题类型

为 emotion 的 styled 注入主题类型时需要注意，需要声明的包是 `@emotion/react` 而不是 `@emotion/styled`。

```tsx | pure
import { Theme as AntdStyleTheme } from 'antd-style';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends AntdStyleTheme {}
}
```
