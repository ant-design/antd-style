---
title: createStaticStyles
description: Create static styles (high performance)
order: 1
sourceUrl: '{github}/blob/master/src/factories/createStaticStyles/index.ts'
group: Creating Styles
demo:
  tocDepth: 4
---

:::info{title=Recommended for High Performance}
When you only need CSS variables and don't require dynamic props, use `createStaticStyles` for optimal performance.
:::

<code src="../demos/api/createStaticStyles/default.tsx"></code>

## Introduction

`createStaticStyles` is a high-performance style creation function. The main differences from `createStyles` are:

- **Non-Hook**: Returns style object directly, not a React Hook
- **Zero Runtime Overhead**: Styles are computed once at module import
- **CSS Variables**: Uses antd's CSS variables through `cssVar`

## Basic Usage

```tsx | pure
import { createStaticStyles } from 'antd-style';

// Module-level definition, styles computed once at import
const styles = createStaticStyles(({ css, cssVar }) => ({
  container: css`
    padding: 16px;
    background: ${cssVar.colorBgContainer};
    border: 1px solid ${cssVar.colorBorder};
    border-radius: ${cssVar.borderRadius};
  `,
  title: css`
    font-size: 18px;
    color: ${cssVar.colorText};
  `,
}));

// Use directly in components, no Hook call needed
const MyComponent = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello</h1>
    </div>
  );
};
```

## Comparison with createStyles

| Feature                | createStyles | createStaticStyles     |
| ---------------------- | ------------ | ---------------------- |
| Return Value           | Hook         | Style Object           |
| token (JS values)      | ✅           | ❌                     |
| cssVar (CSS variables) | ✅           | ✅                     |
| customToken            | ✅           | ❌                     |
| stylish                | ✅           | ❌                     |
| responsive             | ✅ (dynamic) | ✅ (fixed breakpoints) |
| props parameter        | ✅           | ❌                     |
| isDarkMode             | ✅           | ❌                     |
| Hooks count            | 8+           | 0                      |
| Performance overhead   | High         | Near Zero              |

## API

### StaticStyleUtils

The parameter function of `createStaticStyles` receives a utility object with the following properties:

| Property   | Type                  | Description                                         |
| ---------- | --------------------- | --------------------------------------------------- |
| css        | `CssUtil`             | CSS template function, converts styles to className |
| cx         | `ClassNamesUtil`      | Merges multiple classNames                          |
| cssVar     | `CSSVarMap`           | antd CSS variable mapping                           |
| responsive | `StaticResponsiveMap` | Responsive breakpoint mapping                       |

### cssVar

CSS variable mapping object that converts antd tokens to corresponding CSS variable format.

```tsx | pure
import { cssVar } from 'antd-style';

// cssVar.colorPrimary => 'var(--ant-color-primary)'
// cssVar.colorBgContainer => 'var(--ant-color-bg-container)'
// cssVar.borderRadius => 'var(--ant-border-radius)'
```

### responsive

Fixed responsive breakpoint mapping:

```tsx | pure
import { responsive } from 'antd-style';

// responsive.xs => '@media (max-width: 479.98px)'
// responsive.sm => '@media (max-width: 575.98px)'
// responsive.md => '@media (max-width: 767.98px)'
// responsive.lg => '@media (max-width: 991.98px)'
// responsive.xl => '@media (max-width: 1199.98px)'
// responsive.xxl => '@media (min-width: 1200px)'
```

<code src="../demos/api/createStaticStyles/Responsive.tsx"></code>

## Usage Examples

### Responsive Layout

```tsx | pure
const styles = createStaticStyles(({ css, responsive }) => ({
  layout: css`
    display: flex;
    flex-direction: row;
    gap: 16px;

    ${responsive.md} {
      flex-direction: column;
    }

    ${responsive.sm} {
      padding: 8px;
    }
  `,
}));
```

### Merging classNames

```tsx | pure
const styles = createStaticStyles(({ css, cx }) => {
  const baseButton = css`
    padding: 8px 16px;
    border-radius: 4px;
  `;

  const primaryButton = css`
    background: blue;
    color: white;
  `;

  return {
    button: cx(baseButton, primaryButton),
  };
});
```

## Use Cases

### Recommended

1. **Pure UI Component Styles**: Components that don't depend on dynamic token values
2. **Layout Styles**: Spacing, border-radius, etc. using CSS variables
3. **High-frequency Rendering Components**: List items, table cells, and other performance-sensitive scenarios
4. **Many Components**: Pages with many styled components

### Not Recommended

1. Need custom tokens
2. Need JS-computed styles (e.g., `token.colorPrimary + '80'`)
3. Need dynamic styles based on props
4. Need stylish presets
5. Need `isDarkMode` for conditional logic

## Performance Notes

`createStaticStyles` has the following performance advantages over `createStyles`:

- **Zero Hooks Calls**: No Hook calls during component rendering
- **Module-level Caching**: Styles computed only once at module import
- **No useMemo Overhead**: No memoization computation needed

For performance-sensitive scenarios, consider using `createStaticStyles` first.
