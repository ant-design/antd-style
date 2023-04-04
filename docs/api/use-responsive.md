---
title: useResponsive
order: 4
group: Hooks
---

## 简介

获取响应式媒体查询的结果。基于 antd 的 [Grid.useBreakpoint](https://ant.design/components/grid-cn#components-grid-demo-usebreakpoint) 封装。

<code src="../demos/api/useResponsive"></code>

## 用法

```ts
import { useResponsive } from 'antd-style';

function Theme() {
  const { mobile } = useResponsive();

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
