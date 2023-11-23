---
title: useThemeMode
order: 2
group:
  title: Hooks
  order: 3
---

## 简介

可以获取到 `ThemeProvider` 下的主题外观模式。

## 用法

```tsx
/**
 * inherit: true
 * defaultShowCode: true
 */
import { Divider, Typography } from 'antd';
import { useThemeMode } from 'antd-style';
import { Flexbox } from 'react-layout-kit';
const { Text } = Typography;

export default () => {
  const { themeMode, appearance, browserPrefers } = useThemeMode();

  return (
    <Flexbox horizontal align={'center'}>
      <Text type={'secondary'}>主题模式：</Text>
      {themeMode}
      <Divider type={'vertical'} />
      <Text type={'secondary'}>外观模式：</Text>
      {appearance}
      <Divider type={'vertical'} />
      <Text type={'secondary'}>浏览器外观：</Text>
      {browserPrefers}
    </Flexbox>
  );
};
```

## API

### Typescript

```ts
useThemeMode: () => ThemeContextState;
```

### ThemeContextState

| 参数           | 类型                                  | 默认值  | 说明           |
| -------------- | ------------------------------------- | ------- | -------------- |
| browserPrefers | [`BrowserPrefers`](#themeappearance)  | `light` | 浏览器外观     |
| themeMode      | [`ThemeMode`](#thememode)             | `light` | 主题模式       |
| appearance     | [`ThemeAppearance`](#themeappearance) | `light` | 显示外观       |
| isDarkMode     | `boolean`                             | `false` | 是否为暗色模式 |

### BrowserPrefers

浏览器外观，仅为 `dark` 或者 `light`。

### ThemeAppearance

外观模式，为 `dark` 或者 `light` 或自定义的字符串。

### ThemeMode

主题模式，可以是 `dark`、`light` 或者 `auto`。
