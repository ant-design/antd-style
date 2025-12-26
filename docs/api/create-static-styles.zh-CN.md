---
title: createStaticStyles
description: 创建静态样式（高性能）
order: 1
sourceUrl: '{github}/blob/master/src/factories/createStaticStyles/index.ts'
group: 创建样式
demo:
  tocDepth: 4
---

:::info{title=高性能场景推荐}
当你只需要使用 CSS 变量且不需要动态 props 时，使用 `createStaticStyles` 可以获得极致的性能。
:::

<code src="../demos/api/createStaticStyles/default.tsx"></code>

## 简介

`createStaticStyles` 是一个高性能的样式创建函数，与 `createStyles` 的主要区别在于：

- **非 Hook**：直接返回样式对象，不是 React Hook
- **零运行时开销**：样式在模块导入时计算一次
- **使用 CSS 变量**：通过 `cssVar` 使用 antd 的 CSS 变量

## 基础用法

```tsx | pure
import { createStaticStyles } from 'antd-style';

// 模块级别定义，样式在导入时计算一次
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

// 组件内直接使用，无需调用 Hook
const MyComponent = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello</h1>
    </div>
  );
};
```

## 与 createStyles 对比

| 特性              | createStyles | createStaticStyles |
| ----------------- | ------------ | ------------------ |
| 返回值            | Hook         | 样式对象           |
| token (JS 值)     | ✅           | ❌                 |
| cssVar (CSS 变量) | ✅           | ✅                 |
| customToken       | ✅           | ❌                 |
| stylish           | ✅           | ❌                 |
| responsive        | ✅ (动态)    | ✅ (固定断点)      |
| props 参数        | ✅           | ❌                 |
| isDarkMode        | ✅           | ❌                 |
| Hooks 数量        | 8+           | 0                  |
| 性能开销          | 高           | 几乎为零           |

## API

### StaticStyleUtils

`createStaticStyles` 的参数函数接收一个工具对象，包含以下属性：

| 属性名     | 类型                  | 描述                                 |
| ---------- | --------------------- | ------------------------------------ |
| css        | `CssUtil`             | CSS 模板函数，将样式转换为 className |
| cx         | `ClassNamesUtil`      | 合并多个 className                   |
| cssVar     | `CSSVarMap`           | antd CSS 变量映射                    |
| responsive | `StaticResponsiveMap` | 响应式断点映射                       |

### cssVar

CSS 变量映射对象，将 antd token 转换为对应的 CSS 变量格式。

```tsx | pure
import { cssVar } from 'antd-style';

// cssVar.colorPrimary => 'var(--ant-color-primary)'
// cssVar.colorBgContainer => 'var(--ant-color-bg-container)'
// cssVar.borderRadius => 'var(--ant-border-radius)'
```

### responsive

固定的响应式断点映射：

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

## 使用示例

### 响应式布局

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

### 合并 className

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

## 适用场景

### 推荐使用

1. **纯 UI 组件样式**：不依赖动态 token 值的组件
2. **布局样式**：使用 CSS 变量的间距、圆角等
3. **高频渲染组件**：列表项、表格单元格等性能敏感场景
4. **大量组件**：页面中有大量使用样式的组件

### 不推荐使用

1. 需要自定义 token
2. 需要 JS 计算的样式（如 `token.colorPrimary + '80'`）
3. 需要 props 动态样式
4. 需要 stylish 预设样式
5. 需要 `isDarkMode` 进行条件判断

## 性能说明

`createStaticStyles` 相比 `createStyles` 有以下性能优势：

- **零 Hooks 调用**：组件渲染时不调用任何 Hook
- **模块级缓存**：样式只在模块导入时计算一次
- **无 useMemo 开销**：不需要记忆化计算

对于性能敏感的场景，建议优先考虑使用 `createStaticStyles`。
