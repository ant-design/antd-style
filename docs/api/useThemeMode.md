---
title: useThemeMode
order: 2
---

# useThemeMode

可以获取到 `AppContainer` 或者 `ThemeProvider` 下的主题外观模式。

## 用法

```ts
import ReactFlow, { useThemeMode } from 'antd-style';

function Theme() {
  const themeMode = useThemeMode();

  useEffect(() => {
    console.log(themeMode);
  }, [themeMode]);

  return null;
}
```

## Typescript

```ts
useThemeMode = () => ThemeContextState;
```

### 返回值

| 参数       | 说明           | 类型                   | 默认值  |
| ---------- | -------------- | ---------------------- | ------- |
| themeMode  | 主题模式       | `dark  / light / auto` | `light` |
| appearance | 显示外观       | `dark  / light`        | `light` |
| isDarkMode | 是否为暗色模式 | `boolean`              | `false` |
