---
title: CSSinJS 样式库性能对比
order: 100
group: 进阶使用
---

# CSS-in-JS 性能对比

## 单次渲染性能对比

```tsx | inline
import { FullscreenOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default () => (
  <a href="/~demos/docs-guide-performance-comparsion-demo-benchmark" target={'_blank'}>
    <Button type={'primary'} icon={<FullscreenOutlined />}>
      点击全屏查看
    </Button>
  </a>
);
```

<code src="./demos/benchmark/index.tsx"></code>
