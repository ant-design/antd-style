# RFC: createStaticStyles

## 背景

### 问题

当前 `createStyles` 在 hooks 调用时存在显著的性能开销，主要原因：

1. **复杂的 hooks 链条**：

   ```
   createStyles → useTheme() → useAntdTheme() → useAntdToken() → antd.theme.useToken()
                            → useAntdStylish() → useAntdToken() + useThemeMode()
                            → useContext(CustomThemeContext)
   ```

2. **多层 useMemo 级联依赖**：

   - TokenContainer 中有 4 层 useMemo 链式依赖
   - createStyles 内部有双层 useMemo 嵌套
   - 每层都依赖 `token`，而 token 对象引用容易变化

3. **useAntdToken 无缓存**：每次调用都返回新对象引用，触发下游 useMemo 重算

4. **响应式映射重复计算**：每个 createStyles 实例都重新创建响应式断点映射

### 核心洞察

很多场景下，开发者只需要使用 CSS 变量（cssVar）而不需要 JavaScript token 值：

```tsx
// 实际只用了 cssVar，但却触发了整个 token 计算链
const useStyles = createStyles(({ token, css }) => ({
  container: css`
    background: ${token.colorBgContainer}; // 其实可以用 var(--ant-color-bg-container)
  `,
}));
```

## 提案

### 新增 `createStaticStyles` API

一个轻量级的样式创建函数，仅提供 CSS 变量访问，不涉及 token 计算：

```tsx
import { createStaticStyles } from 'antd-style';

// 模块级别定义，样式在导入时计算一次
const styles = createStaticStyles(({ cssVar, css }) => ({
  container: css`
    background: ${cssVar.colorBgContainer}; // 输出 var(--ant-color-bg-container)
    color: ${cssVar.colorText};
    border-radius: ${cssVar.borderRadius};
  `,
}));

// 组件内直接使用，无需 hook
const Component = () => {
  return <div className={styles.container}>Hello</div>;
};
```

### API 设计

#### 函数签名

```typescript
type StaticStylesInput<T extends BaseReturnType> = (utils: StaticStyleUtils) => T;

interface StaticStyleUtils {
  css: CreateCssType;
  cx: ClassNamesUtil;
  cssVar: CSSVarMap; // antd CSS 变量映射（静态生成）
  responsive: ResponsiveMap; // 响应式断点（固定值）
}

// 直接返回样式对象，非 hook
function createStaticStyles<T extends BaseReturnType>(stylesFn: StaticStylesInput<T>): T;
```

#### 与 createStyles 对比

| 特性              | createStyles | createStaticStyles |
| ----------------- | ------------ | ------------------ |
| 返回值            | hook         | 样式对象           |
| token (JS 值)     | ✅           | ❌                 |
| cssVar (CSS 变量) | ✅           | ✅ (静态)          |
| customToken       | ✅           | ❌                 |
| stylish           | ✅           | ❌                 |
| responsive        | ✅ (动态)    | ✅ (固定断点)      |
| props 参数        | ✅           | ❌                 |
| isDarkMode        | ✅           | ❌                 |
| hooks 数量        | 8+           | 0                  |
| 性能开销          | 高           | 几乎为零           |

### 实现思路

#### 1. 静态生成 cssVar 映射

在模块加载时，使用 antd 的 `theme.getDesignToken()` 一次性生成 cssVar 映射：

```tsx
import { theme } from 'antd';

// camelCase 转 kebab-case
const toKebabCase = (str: string) => str.replace(/([A-Z])/g, '-$1').toLowerCase();

// 生成 cssVar 映射
const generateCSSVarMap = (prefix = 'ant') => {
  const token = theme.getDesignToken();
  const cssVar: Record<string, string> = {};

  for (const key of Object.keys(token)) {
    cssVar[key] = `var(--${prefix}-${toKebabCase(key)})`;
  }

  return cssVar;
};

// 模块级别缓存
export const cssVar = generateCSSVarMap();
```

#### 2. 固定响应式断点

```tsx
// 固定断点值（基于 antd 默认）
export const responsive = {
  xs: '@media (max-width: 479px)',
  sm: '@media (max-width: 575px)',
  md: '@media (max-width: 767px)',
  lg: '@media (max-width: 991px)',
  xl: '@media (max-width: 1199px)',
  xxl: '@media (min-width: 1200px)',
} as const;
```

#### 3. 纯函数实现

```tsx
import { serializeStyles } from '@emotion/serialize';

// 模块级别初始化
const cssVar = generateCSSVarMap();
const cx = classNames; // 简单的 classnames 合并

// css 函数：将模板字符串转为 className
const css = (template: TemplateStringsArray, ...args: any[]) => {
  const serialized = serializeStyles([template, ...args]);
  // 注入样式到 DOM 并返回 className
  return injectAndGetClassName(serialized);
};

// createStaticStyles 实现
const createStaticStyles = <T extends BaseReturnType>(
  stylesFn: (utils: StaticStyleUtils) => T,
): T => {
  // 调用时立即计算并返回样式对象
  return stylesFn({ css, cx, cssVar, responsive });
};
```

#### 4. 核心优势

- **非 hook**：组件内直接使用，无 hook 调用
- **零运行时开销**：样式在模块导入时计算一次
- **完全静态**：不依赖任何 React context 或 antd hook

## 使用场景

### 适合 createStaticStyles

1. **纯 UI 组件样式**：不依赖动态 token 值

   ```tsx
   const styles = createStaticStyles(({ css, cssVar }) => ({
     card: css`
       background: ${cssVar.colorBgContainer};
       border: 1px solid ${cssVar.colorBorder};
     `,
   }));

   const Card = () => <div className={styles.card}>...</div>;
   ```

2. **布局样式**：使用 CSS 变量做间距、圆角等

   ```tsx
   const styles = createStaticStyles(({ css, cssVar }) => ({
     layout: css`
       padding: ${cssVar.padding};
       gap: ${cssVar.marginSM};
     `,
   }));
   ```

3. **高频渲染组件**：列表项、表格单元格等

   ```tsx
   const styles = createStaticStyles(({ css, cssVar }) => ({
     item: css`
       border-bottom: 1px solid ${cssVar.colorBorderSecondary};
     `,
   }));

   // 列表项组件，无 hook 开销
   const ListItem = ({ data }) => <div className={styles.item}>{data}</div>;
   ```

### 不适合 createStaticStyles

1. **需要自定义 token**
2. **需要 JS 计算的样式**（如 `color: token.colorPrimary + '80'`）
3. **需要 props 动态样式**
4. **需要 stylish 预设样式**

## 决策记录

### 1. cssVar 的来源 ✅

**决策：静态生成**

使用 antd 的 `theme.getDesignToken()` 获取 token keys，然后静态转换为 CSS 变量格式：

```tsx
import { theme } from 'antd';

// 生成静态 cssVar 映射
const token = theme.getDesignToken();
const cssVar = generateCSSVarMap(token, 'ant');
// { colorPrimary: 'var(--ant-color-primary)', ... }
```

转换规则：`camelCase` → `kebab-case`

- `colorPrimary` → `var(--ant-color-primary)`
- `colorBgContainer` → `var(--ant-color-bg-container)`
- `borderRadius` → `var(--ant-border-radius)`

### 2. 是否支持 props 参数 ✅

**决策：不支持**

保持静态特性，不接受运行时参数。

### 3. responsive 支持 ✅

**决策：支持，使用固定断点**

使用 antd 默认断点值静态生成：

```tsx
// 固定断点（基于 antd 默认值）
const responsive = {
  xs: '@media (max-width: 479px)',
  sm: '@media (max-width: 575px)',
  md: '@media (max-width: 767px)',
  lg: '@media (max-width: 991px)',
  xl: '@media (max-width: 1199px)',
  xxl: '@media (min-width: 1200px)',
};

// 使用
const useStyles = createStaticStyles(({ css, responsive }) => ({
  container: css`
    display: flex;
    ${responsive.md} {
      flex-direction: column;
    }
  `,
}));
```

### 4. 命名 ✅

**决策：`createStaticStyles`**

### 5. isDarkMode ✅

**决策：不提供**

由于样式是静态生成的，不应包含运行时状态。CSS 变量本身会随主题切换而变化，无需额外处理。

## 性能预期

| 指标           | createStyles | createStaticStyles | 提升     |
| -------------- | ------------ | ------------------ | -------- |
| hooks 调用次数 | 8+           | 0                  | 100% ↓   |
| useMemo 层数   | 5-6          | 0                  | 100% ↓   |
| 样式计算时机   | 每次渲染     | 模块导入时         | -        |
| 组件渲染开销   | 高           | 几乎为零           | 显著提升 |

## 实现计划

1. **Phase 1**：基础实现

   - [ ] 创建 `generateCSSVarMap` 工具函数
   - [ ] 创建固定 `responsive` 映射
   - [ ] 实现 `createStaticStyles` 核心逻辑
   - [ ] 导出到 index

2. **Phase 2**：测试

   - [ ] 单元测试
   - [ ] 性能基准测试对比

3. **Phase 3**：文档与发布
   - [ ] 使用文档
   - [ ] 发布 minor 版本

## 参考

- [Emotion CSS 性能优化](https://emotion.sh/docs/best-practices)
- [antd CSS Variables 文档](https://ant.design/docs/react/css-variables)
