---
title: useResponsive
order: 4
group: Hooks
---

## 简介

获取响应式媒体查询的结果。基于 antd 的 [Grid.useBreakpoint](https://ant.design/components/grid-cn#components-grid-demo-usebreakpoint) 封装。

## 用法

```tsx | pure
import { useResponsive } from 'antd-style';

function Theme() {
  const { mobile } = useResponsive();

  // 使用 js 来区分显示移动端
  return mobile ? <div>mobile</div> : <div>desktop</div>;
}
```

## 示例

<code src="../demos/api/useResponsive/default.tsx"></code>

## 自定义断点

通过传入 antd 的断点配置，来自定义响应断点。

<code src="../demos/api/useResponsive/custom.tsx"></code>
