---
title: Performance Comparison of CSS-in-JS Libraries
order: 100
group: Advanced Usage
---

# Performance Comparison of CSS-in-JS

## Basic Rendering Performance Comparison

```tsx | inline
import { FullscreenOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default () => (
  <a href="https://cssinjs-benchmark.arvinx.app/large-content" target={'_blank'}>
    <Button type={'primary'} icon={<FullscreenOutlined />}>
      Click to view in full screen
    </Button>
  </a>
);
```

<code src="./demos/benchmark/large-content.tsx"></code>

## Dynamic Value Rendering Performance Comparison

```tsx | inline
import { FullscreenOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default () => (
  <a href="https://cssinjs-benchmark.arvinx.app/dynamic-value" target={'_blank'}>
    <Button icon={<FullscreenOutlined />}>Click to view in full screen</Button>
  </a>
);
```

<code src="./demos/benchmark/dynamic-value.tsx"></code>
