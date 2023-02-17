---
title: 集成 styled
order: 2
group:
  title: 进阶使用
  order: 2
demo:
  cols: 2
---

# 搭配 styled 消费

经过完整的调研与大量业务实践后，我们决定不在 `antd-style` 中内置 `styled` 的语法，而是为用户提供相应的主题兼容方案。

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

也就是说 `styled` 方法和 `ThemeProvider`（以及配套的`useTheme`）必须成对出现。 styled-components 的 styled 无法响应 @emotion/styled 的 ThemeProvider。

通过分别阅读二者的源码( [styled-components](https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/models/StyledComponent.ts)、[@emotion/styled](https://github.com/emotion-js/emotion/blob/main/packages/styled/src/base.js#LL117C53-L117C53) )，我们发现这些 styled 的实现都耦合了各自创建的 Context，使得想要外部传入 Context 变得不可能，这就使得如果使用 styled 来创建样式组件，每个组件的使用就必须要在外部套一层 ThemeProvider ，而不是像普通组件一样直接引入。

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

这也就意味如果想要自定义一个 ThemeContext 作为组件的全局主题，并在 styled 的写法中获取到，就必须要自己实现一个 styled 的方法。

在 [CSS in JS 写法对比](/guide/compare) 这一章节中，我们认为 styled 由于设计缺陷，在未来将会没落。所以在 antd-style 中将只会提供 styled 的 ThemeProvider 和 useTheme 的兼容方案。

## styled 的主题集成方案

### ThemeProvider

在 antd-style 的 ThemeProvider 中，我们提供了一个 styledThemeProvider 属性，用于接收外部 styled 的 ThemeProvider，进而让 styled 方法可以响应到 antd-style 的 ThemeProvider 内容。

```tsx | pure
import { ThemeProvider } from 'antd-style';
import { ThemeProvider as StyledThemeProvider, useTheme } from 'styled-components';

render(
  <ThemeProvider styled={{ ThemeProvider: StyledThemeProvider, useTheme: useTheme }}>
    <StyledButton />
  </ThemeProvider>,
);
```

<code src="../demos/guide/styled/StyledComponentsProps"></code>
<code src="../demos/guide/styled/EmotionStyledProps.tsx"></code>

### 全局注入: setupStyled

在 antd-style 中，我们提供了一个 `setupStyled` 方法，用于将外部 styled 的 ThemeProvider 和 useTheme 注入到 antd-style 的 ThemeProvider 里，进而让 styled 方法可以响应到 antd-style 的 ThemeProvider 内容。

```tsx | pure
import { setupStyled, ThemeProvider } from 'antd-style';
import { ThemeProvider as StyledThemeProvider, useTheme } from 'styled-components';

// 将 styled-components 的 ThemeProvider 和 useTheme 注入到 antd-style 的 ThemeProvider 中
setupStyled({
  ThemeProvider: StyledThemeProvider,
  useTheme,
});

render(
  <ThemeProvider>
    <StyledButton />
  </ThemeProvider>,
);
```
