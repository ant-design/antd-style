---
title: CSSinJS 样式库性能对比
order: 100
group: 进阶使用
---

# CSS-in-JS 性能对比

## 基础渲染性能对比

```tsx | inline
import { FullscreenOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default () => (
  <a href="https://cssinjs-benchmark.arvinx.app/large-content" target={'_blank'}>
    <Button type={'primary'} icon={<FullscreenOutlined />}>
      点击全屏查看
    </Button>
  </a>
);
```

<code src="./demos/benchmark/large-content.tsx"></code>

## 动态值渲染性能对比

```tsx | inline
import { FullscreenOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default () => (
  <a href="https://cssinjs-benchmark.arvinx.app/dynamic-value" target={'_blank'}>
    <Button icon={<FullscreenOutlined />}>点击全屏查看</Button>
  </a>
);
```

<code src="./demos/benchmark/dynamic-value.tsx"></code>
