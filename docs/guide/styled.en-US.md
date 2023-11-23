---
title: Integrated styled
order: 10
group:
  title: Advanced Usage
  order: 2
demo:
  cols: 2
---

# Consuming styled with Integration

After thorough research and extensive business practice, we have decided not to embed the `styled` method in `antd-style`, but to provide a theme compatibility solution for users of styled.

:::info{title=Friendly Reminder}
If you are not familiar with styled, it is recommended to first refer to [styled-components](https://styled-components.com/) to understand its usage.
:::

## The principle of theme response in styled

Let's take a look at a typical way of consuming themes in styled:

```tsx | pure
import { styled } from 'styled-components';

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.primary};
`;

const App = () => {
  const [appearance] = useState('light');
  return (
    <ThemeProvider theme={{ primary: appearance === 'light' ? 'blue' : 'cyan' }}>
      <StyledButton>Click me</StyledButton>
    </ThemeProvider>
  );
};
```

It can be seen that the theme response of styled is provided through `ThemeProvider`, which will pass the theme as props to `StyledButton`, thereby achieving theme response. At the underlying level, whether it's styled-components or @emotion/styled's ThemeProvider, they both create Provider containers and hooks methods through React's `Context`.

In other words, the `styled` method and `ThemeProvider` (along with the accompanying `useTheme`) must appear in pairs. styled-components' styled cannot respond to @emotion/styled's ThemeProvider, and @emotion/styled's useTheme cannot respond to styled-components' ThemeProvider.

By reading the source code of both ( [styled-components](https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/models/StyledComponent.ts) and [@emotion/styled](https://github.com/emotion-js/emotion/blob/main/packages/styled/src/base.js#LL117C53-L117C53) ), we found that the implementation of these styled methods is coupled with their own created Context, so custom Context cannot be passed in from the outside.

This means that if you want to create styled components and use them, each component must be wrapped in a ThemeProvider externally, instead of being directly imported like regular components.

```tsx | pure
// When used alone, the style will be lost
render(<StyledButton />);

// Must be wrapped in a ThemeProvider to be used normally
render(
  <ThemeProvider>
    <StyledButton />
  </ThemeProvider>,
);

// Or define defaultProps for each component separately
StyledButton.defaultProps = {
  theme: {
    primary: 'red',
  },
};
```

The root cause of these cumbersome operations lies in the fact that the ThemeProvider used by styled does not provide custom Context injection. At present, it seems that styled-components is unlikely to implement this feature ([issue](https://github.com/styled-components/styled-components/issues/3612)).

This also means that if you want to customize a ThemeContext as the default theme for components and access it in the styled syntax, you must implement your own styled method, which is not practical for most component developers.

In the chapter [Comparison of CSS in JS Syntax](/guide/compare), we believe that due to design flaws, the styled API will decline in the future. Therefore, in antd-style, we will only provide a compatible usage solution for styled's ThemeProvider and useTheme.

## Integration of styled and ThemeProvider

In antd-style's ThemeProvider, we provide a `styled` prop, which is used to receive the external ThemeContext corresponding to styled, so that the styled method can respond to antd-style's antd token, custom token, and theme state.

```tsx | pure
import { ThemeProvider } from 'antd-style';
import { ThemeContext } from 'styled-components';

render(
  <ThemeProvider styled={{ ThemeContext }}>
    <StyledButton />
  </ThemeProvider>,
);
```

<code src="../demos/guide/styled/StyledComponentsProps"></code> <code src="../demos/guide/styled/EmotionStyledProps.tsx"></code>

For the documentation of the styled API in ThemeProvider, please refer to: [ThemeProvider - styled integration configuration](/api/theme-provider#styled-integration)

## Globally unified integration of styled

For scenarios where there are multiple ThemeProviders, we provide a `setupStyled` method to uniformly inject the external styled ThemeContext into antd-style's ThemeProvider, so that the styled method can respond to any ThemeProvider.

```tsx | pure
import { setupStyled, ThemeProvider } from 'antd-style';
import { ThemeContext } from 'styled-components';

// Inject the styled-components' ThemeContext into antd-style's ThemeProvider
setupStyled({ ThemeContext });

render(
  <ThemeProvider>
    <StyledButton />
  </ThemeProvider>,
);
```

<code src="../demos/guide/styled/SetupStyled/index.tsx"></code>

:::warning
Please note: setupStyled needs to be executed before the application is initialized, otherwise it will not take effect. In addition, since setupStyled will affect all ThemeProviders in antd-style, it is not recommended to use it in multiple application scenarios, as it may contaminate other applications' ThemeProviders.
:::

## Typescript type definition support

Similar to the extension of the main theme type in antd-style, if you want your own styled methods to be able to access the main theme type of antd-style, you need to globally supplement the type definitions of styled-components or @emotion/styled in the project.

### Injecting main theme type for styled-components

Inject the main theme type of antd-style into styled-components' styled.

```tsx | pure
import { Theme as AntdStyleTheme } from 'antd-style';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends AntdStyleTheme {}
}
```

### Injecting main theme type for @emotion/styled

When injecting the main theme type for emotion's styled, it is important to note that the package to be declared is `@emotion/react` rather than `@emotion/styled`.

```tsx | pure
import { Theme as AntdStyleTheme } from 'antd-style';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends AntdStyleTheme {}
}
```
