---
title: 扩展自定义 Token 类型定义
group:
  title: 主题定制
  order: 1
---

# 如何给 antd-style 扩展 CustomToken 对象类型定义？

## 解决思路

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

## 参考代码

- [dumi-theme-antd-style](https://github.com/arvinxx/dumi-theme-antd-style/blob/master/src/styles/customToken.ts)
- [Ant Design 官网](https://github.com/ant-design/ant-design/blob/master/.dumi/theme/SiteThemeProvider.tsx)

## 相关讨论

- [🧐[问题] 请问一下如何给 antd-style 扩展 CustomToken 对象类型定义](https://github.com/ant-design/antd-style/issues/16)
