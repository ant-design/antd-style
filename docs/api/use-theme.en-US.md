---
title: useTheme
order: 1
group: Hooks
---

## Introduction

When used in conjunction with container components (`ThemeProvider`), it can obtain the theme information under the container. If `ThemeProvider` is not added, the default value is obtained.

When `useTheme` is used under the `ThemeProvider` component, the theme value in the ThemeProvider can be obtained.

<code src="../demos/api/useTheme.tsx"></code>

## Usage

```ts
import { useTheme } from 'antd-style';

function Theme() {
  const theme = useTheme();

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return null;
}
```

## Typescript

```ts
useTheme = () => Theme;
```

### Return Value

| Parameter  | Description | Type                   | Default |
| ---------- | ----------- | ---------------------- | ------- |
| themeMode  | Theme mode  | `dark  / light / auto` | `light` |
| appearance | Display     | `dark  / light`        | `light` |
| isDarkMode | Dark mode   | `boolean`              | `false` |
