---
title: CSS in JS 写法对比
order: 2
group: 基础知识
---

# CSS in JS 写法对比

由于 CSS in JS 的写法过多，所以我们需要给出一种最佳实践的写法，能兼容 V5 的 Token System、自定义主题、较低的研发心智和良好的扩展性。而本文会从各个角度来聊聊不同写法之间的差异。并给出 `antd-style` 最推荐的方式。

### 基础：原有的 V4 CSS Modules

我们先来回顾一下在之前（antd v4）的写法，这是我们与 CSS in JS 写法的对比基础。

大部分应用一旦使用 antd，一般都会搭配 less 和 css modules 来书写样式。页面书写的样式方案如下：

```less | pure
// style.less
@import '~antd/es/style/themes/default';

.list {
  border: 1px solid @primary-color;
  border-radius: 2px;
  box-shadow: 0 8px 20px @shadow-color;
}
```

```tsx | pure
// index.tsx
import styles from './style.less';

const App = ({ list }) => {
  return <List dataSource={list} className={styles.list} />;
};
```

### 1. styled 写法

styled 的写法从体感上，基本上完全是另一套代码。 开发者需要重新学习 styled 的基础语法和相关的使用方式。并且如果使用 antd v4 的旧项目，要迁移到这种写法几乎是不可能的。

在实际项目研发上，我们经历比较痛的地方有两个。

一是组件样式的覆写，如果需要对 antd 这种。

```tsx | pure

```

从优势上来说， styled 的写法可以保证每一个样式都标准的 React 组件，且样式与样式之间的组合比较方便。

### 2. V5 CSS IN JS 对象模式

这种 JS 对象的模式应该是现在 antd 内部组件库的使用方式。但我觉得业务里不会想这么去写的。有点别扭

```typescript
// style.ts
import { createStyles } from 'antd-style';

export default createStyles((token) => ({
  list:{
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: 2,
    boxShadow: `0 8px 20px ${token.colorShadow}`,
  }
});
```

```tsx | pure
// index.tsx
import useStyles from './style';

const App = ({ list }) => {
  const { styles } = useStyles();
  return <List dataSource={list} className={styles.list} />;
};
```

### 4. V5 CSS in JS（纯消费 Token 的方案）

这个是 期贤 说他在自己实践的方案。只要 antd 给 token 就好了，从灵活性上来说是不错的。但旧业务升级新业务，采用这种方式要全部重构，成本会非常高。

```tsx | pure
import { css } from '@emotion/css';
import { useToken } from 'antd';

const buttonStyle = (token)=>css`
    border: 1px solid  ${token.colorPrimary};
    border-radius: 2px;
    box-shadow: 0 8px 20px ${token.colorShadow}`;
  `;

const App: FC = ({list}) => {
  const token = useToken();
  return (
    <List
      className={buttonStyle(token)}
      dataSource={list}
    />
  );
};
```

简单评估了下，供参考：

|          | V5 CSS Modules | V5 CSS in JS（对象模式） | V5 CSS in JS（字符串模式） | V5 CSS in JS（纯 token ） |
| -------- | -------------- | ------------------------ | -------------------------- | ------------------------- |
| 升级成本 | 低             | 高                       | 中                         | 高                        |
| 熟悉度   | 高             | 低                       | 高                         | 中                        |

最推荐的方案确定以后，antd token 在设计侧的消费模式才能确定下来。（即在 kitchen 里提供给开发 token 的代码模式）
