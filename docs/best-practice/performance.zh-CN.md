---
title: 性能对比：createStaticStyles
order: 0
group:
  title: 性能优化
  order: 3
---

# 性能优化：createStyles vs createStaticStyles

在高性能场景下，选择合适的样式方案至关重要。本文将对比 `createStyles` 和 `createStaticStyles` 的性能差异，帮助你做出最佳选择。

## 性能对比

<code src="./demos/Performance/Benchmark.tsx"></code>

## 原理分析

### createStyles（Hook 模式）

```tsx | pure
const useStyles = createStyles(({ css, token }) => ({
  container: css`
    background: ${token.colorBgContainer};
  `,
}));

const Component = () => {
  const { styles } = useStyles(); // 每次渲染都会调用
  return <div className={styles.container} />;
};
```

**每次渲染时的开销：**

1. 调用 `useStyles` Hook
2. 执行 `useContext` 获取主题上下文（多次）
3. 执行 `useMemo` 计算样式
4. 执行 `useInsertionEffect` 插入样式
5. 返回 styles 对象

### createStaticStyles（静态模式）

```tsx | pure
// 模块加载时执行一次
const styles = createStaticStyles(({ css, cssVar }) => ({
  container: css`
    background: ${cssVar.colorBgContainer};
  `,
}));

const Component = () => {
  // 直接使用，无任何 Hook 调用
  return <div className={styles.container} />;
};
```

**渲染时的开销：**

- 零 Hook 调用
- 零上下文查找
- 直接引用已计算的 className 字符串

## 性能差异来源

| 环节         | createStyles | createStaticStyles |
| ------------ | ------------ | ------------------ |
| 样式计算时机 | 每次渲染     | 模块加载时（一次） |
| Hook 调用    | 8+ 次        | 0 次               |
| Context 查找 | 多次         | 0 次               |
| useMemo 开销 | 有           | 无                 |
| 主题响应     | 实时         | 通过 CSS 变量      |
| GC 压力      | 高           | 低                 |

## 适用场景

### 推荐使用 createStaticStyles

- **列表项组件**：如 Table 行、List 项、虚拟列表项
- **高频渲染组件**：动画组件、实时更新的 Dashboard
- **大量实例**：页面中有 100+ 个使用样式的组件
- **性能敏感场景**：低端设备、移动端

### 推荐使用 createStyles

- **需要动态 props**：样式依赖组件 props
- **需要 JS token 值**：如 `token.colorPrimary + '80'`
- **需要 isDarkMode**：基于暗色模式的条件判断
- **需要 customToken**：使用自定义 Token
- **需要 stylish**：使用预设样式

## 迁移指南

从 `createStyles` 迁移到 `createStaticStyles` 非常简单：

### Before

```tsx | pure
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, token }) => ({
  card: css`
    padding: ${token.paddingLG}px;
    background: ${token.colorBgContainer};
    border-radius: ${token.borderRadiusLG}px;
  `,
}));

const Card = () => {
  const { styles } = useStyles();
  return <div className={styles.card}>...</div>;
};
```

### After

```tsx | pure
import { createStaticStyles } from 'antd-style';

const styles = createStaticStyles(({ css, cssVar }) => ({
  card: css`
    padding: ${cssVar.paddingLG};
    background: ${cssVar.colorBgContainer};
    border-radius: ${cssVar.borderRadiusLG};
  `,
}));

const Card = () => {
  return <div className={styles.card}>...</div>;
};
```

**关键变化：**

1. `createStyles` → `createStaticStyles`
2. `token.xxx` → `cssVar.xxx`（CSS 变量无需 `px` 单位）
3. `useStyles()` → 直接使用 `styles`
4. 移除 `const { styles } = useStyles()`

## 混合使用策略

在实际项目中，可以根据场景混合使用两种方案：

```tsx | pure
import { createStaticStyles, createStyles } from 'antd-style';

// 静态样式 - 用于基础布局
const staticStyles = createStaticStyles(({ css, cssVar }) => ({
  container: css`
    padding: ${cssVar.padding};
  `,
}));

// 动态样式 - 用于需要 props 的场景
const useDynamicStyles = createStyles(({ css, token }, { active }: { active: boolean }) => ({
  item: css`
    background: ${active ? token.colorPrimary : token.colorBgContainer};
  `,
}));

const Component = ({ active }) => {
  const { styles } = useDynamicStyles({ active });

  return (
    <div className={staticStyles.container}>
      <div className={styles.item}>...</div>
    </div>
  );
};
```

## 总结

| 指标     | createStyles       | createStaticStyles |
| -------- | ------------------ | ------------------ |
| 性能     | 一般               | 极致               |
| 灵活性   | 高（支持动态）     | 中（仅 CSS 变量）  |
| 使用方式 | Hook               | 直接引用           |
| 主题响应 | JS Token（实时）   | CSS 变量           |
| 适用场景 | 动态样式、复杂逻辑 | 高性能、大量组件   |

**建议**：默认使用 `createStaticStyles`，仅在需要动态 props 或 JS token 计算时使用 `createStyles`。
