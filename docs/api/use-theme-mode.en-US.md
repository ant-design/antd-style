---
title: useThemeMode
order: 2
group:
  title: Hooks
  order: 3
---

## Introduction

Obtain the theme appearance mode under `ThemeProvider`.

## Usage

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
      <Text type={'secondary'}>Theme Mode:</Text>
      {themeMode}
      <Divider type={'vertical'} />
      <Text type={'secondary'}>Appearance Mode:</Text>
      {appearance}
      <Divider type={'vertical'} />
      <Text type={'secondary'}>Browser Appearance:</Text>
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

| Parameter      | Type                                  | Default | Description             |
| -------------- | ------------------------------------- | ------- | ----------------------- |
| browserPrefers | [`BrowserPrefers`](#themeappearance)  | `light` | Browser appearance      |
| themeMode      | [`ThemeMode`](#thememode)             | `light` | Theme mode              |
| appearance     | [`ThemeAppearance`](#themeappearance) | `light` | Display appearance      |
| isDarkMode     | `boolean`                             | `false` | Whether it is dark mode |

### BrowserPrefers

Browser appearance, only `dark` or `light`.

### ThemeAppearance

Appearance mode, can be `dark`, `light`, or a custom string.

### ThemeMode

Theme mode, can be `dark`, `light`, or `auto`.
