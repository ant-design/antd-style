---
title: useResponsive
order: 4
group: Hooks
---

## Introduction

Get the result of responsive media queries. It is encapsulated based on antd's [Grid.useBreakpoint](https://ant.design/components/grid) .

## Usage

```tsx | pure
import { useResponsive } from 'antd-style';

function Theme() {
  const { mobile } = useResponsive();

  // Use JavaScript to distinguish between mobile and desktop
  return mobile ? <div>mobile</div> : <div>desktop</div>;
}
```

## Example

<code src="../demos/api/useResponsive/default.tsx"></code>

## Custom Breakpoints

Customize responsive breakpoints by passing in antd's breakpoint configuration.

<code src="../demos/api/useResponsive/custom.tsx"></code>
