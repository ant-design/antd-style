---
title: useTheme
order: 1
nav: API
group: Hooks
---

## 简介

配合容器组件进行使用（`ThemeProvider`），可以获取到容器下的主题信息。如果不添加 `ThemeProvider`，默认获取到的值为默认值。

当 `useTheme` 放在 `ThemeProvider` 组件下使用，可以获得 ThemeProvider 中的主题值。

<code src="../demos/api/useTheme.tsx"></code>

## 用法

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

### 返回值

| 参数       | 说明           | 类型                   | 默认值  |
| ---------- | -------------- | ---------------------- | ------- |
| themeMode  | 主题模式       | `dark  / light / auto` | `light` |
| appearance | 显示外观       | `dark  / light`        | `light` |
| isDarkMode | 是否为暗色模式 | `boolean`              | `false` |
