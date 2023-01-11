---
title: useThemeMode
order: 2
group:
  title: Hooks
  order: 3
---

# useThemeMode

可以获取到 `ThemeProvider` 下的主题外观模式。

## 用法

```ts
import { useThemeMode } from 'antd-style';

function Theme() {
  const themeMode = useThemeMode();

  useEffect(() => {
    console.log(themeMode);
  }, [themeMode]);

  return null;
}
```

## API

### Typescript

```ts
useThemeMode: () => ThemeContextState;
```

### ThemeContextState

| 参数       | 类型                                  | 默认值  | 说明           |
| ---------- | ------------------------------------- | ------- | -------------- |
| themeMode  | [`ThemeMode`](#thememode)             | `light` | 主题模式       |
| appearance | [`ThemeAppearance`](#themeappearance) | `light` | 显示外观       |
| isDarkMode | `boolean`                             | `false` | 是否为暗色模式 |

### ThemeAppearance

外观模式，仅为 `dark` 或者 `light`。

### ThemeMode

主题模式，可以是 `dark`、`light` 或者 `auto`。
