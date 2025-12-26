---
title: Performance - createStaticStyles
order: 0
group:
  title: Performance
  order: 0
---

# Performance: createStyles vs createStaticStyles

Choosing the right styling approach is crucial in high-performance scenarios. This article compares the performance differences between `createStyles` and `createStaticStyles` to help you make the best choice.

## Performance Comparison

<code src="./demos/Performance/Benchmark.tsx"></code>

## How It Works

### createStyles (Hook Mode)

```tsx | pure
const useStyles = createStyles(({ css, token }) => ({
  container: css`
    background: ${token.colorBgContainer};
  `,
}));

const Component = () => {
  const { styles } = useStyles(); // Called on every render
  return <div className={styles.container} />;
};
```

**Overhead per render:**

1. Call `useStyles` Hook
2. Execute `useContext` to get theme context (multiple times)
3. Execute `useMemo` to compute styles
4. Execute `useInsertionEffect` to insert styles
5. Return styles object

### createStaticStyles (Static Mode)

```tsx | pure
// Executed once at module load
const styles = createStaticStyles(({ css, cssVar }) => ({
  container: css`
    background: ${cssVar.colorBgContainer};
  `,
}));

const Component = () => {
  // Direct usage, no Hook calls
  return <div className={styles.container} />;
};
```

**Overhead per render:**

- Zero Hook calls
- Zero context lookups
- Direct reference to pre-computed className strings

## Performance Difference Sources

| Aspect            | createStyles | createStaticStyles |
| ----------------- | ------------ | ------------------ |
| Style computation | Every render | Module load (once) |
| Hook calls        | 8+           | 0                  |
| Context lookups   | Multiple     | 0                  |
| useMemo overhead  | Yes          | No                 |
| Theme response    | Real-time    | Via CSS variables  |
| GC pressure       | High         | Low                |

## Use Cases

### Recommended: createStaticStyles

- **List items**: Table rows, List items, virtual list items
- **High-frequency rendering**: Animation components, real-time dashboards
- **Many instances**: 100+ styled components on a page
- **Performance-sensitive**: Low-end devices, mobile

### Recommended: createStyles

- **Dynamic props needed**: Styles depend on component props
- **JS token values needed**: e.g., `token.colorPrimary + '80'`
- **isDarkMode needed**: Conditional logic based on dark mode
- **customToken needed**: Using custom tokens
- **stylish needed**: Using preset styles

## Migration Guide

Migrating from `createStyles` to `createStaticStyles` is straightforward:

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

**Key changes:**

1. `createStyles` → `createStaticStyles`
2. `token.xxx` → `cssVar.xxx` (CSS variables don't need `px` units)
3. `useStyles()` → Use `styles` directly
4. Remove `const { styles } = useStyles()`

## Hybrid Strategy

In real projects, you can mix both approaches based on the scenario:

```tsx | pure
import { createStaticStyles, createStyles } from 'antd-style';

// Static styles - for basic layouts
const staticStyles = createStaticStyles(({ css, cssVar }) => ({
  container: css`
    padding: ${cssVar.padding};
  `,
}));

// Dynamic styles - for scenarios requiring props
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

## Summary

| Metric      | createStyles           | createStaticStyles     |
| ----------- | ---------------------- | ---------------------- |
| Performance | Normal                 | Optimal                |
| Flexibility | High (dynamic support) | Medium (CSS vars only) |
| Usage       | Hook                   | Direct reference       |
| Theme       | JS Token (real-time)   | CSS variables          |
| Best for    | Dynamic, complex logic | High-perf, many comps  |

**Recommendation**: Use `createStaticStyles` by default, and only use `createStyles` when you need dynamic props or JS token calculations.
