---
title: Extending Custom Token Type Definition
group:
  title: Theme Customization
  order: 1
---

# How to extend the CustomToken object type definition for antd-style?

## Solution

By extending the type definition of the `CustomToken` interface for `antd-style`, you can add corresponding token type definitions to the `useTheme` hooks.

At the same time, by adding generics to the `ThemeProvider` object, you can constrain the input definition of `customToken`.

```tsx | pure
import { ThemeProvider, useTheme } from 'antd-style';

interface NewToken {
  customBrandColor: string;
}

// By extending the type definition of the `CustomToken` interface for `antd-style`, you can add corresponding token type definitions to the `useTheme` hooks
declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomToken extends NewToken {}
}

const App = () => {
  const token = useTheme();
  return <div>{token.customBrandColor}</div>;
};

export default () => (
  // By adding generics to the `ThemeProvider` object, you can constrain the input definition of the `customToken` interface
  <ThemeProvider<NewToken> customToken={{ customBrandColor: '#c956df' }}>
    <App />
  </ThemeProvider>
);
```

:::info
Since `CustomToken` is likely an empty interface, if the project has configured the `@typescript-eslint/no-empty-interface` rule, the interface definition may be corrected to a type during code formatting, and types cannot be extended, resulting in loss of prompts (related issue: [#16](https://github.com/ant-design/antd-style/issues/16)). Therefore, the solution is to add a rule disabling as shown in the example code above.
:::

## Reference Code

- [dumi-theme-antd-style](https://github.com/arvinxx/dumi-theme-antd-style/blob/master/src/styles/customToken.ts)
- [Ant Design Official Website](https://github.com/ant-design/ant-design/blob/master/.dumi/theme/SiteThemeProvider.tsx)

## Related Discussions

- [🧐\[Question\] How to extend the CustomToken object type definition for antd-style](https://github.com/ant-design/antd-style/issues/16)
