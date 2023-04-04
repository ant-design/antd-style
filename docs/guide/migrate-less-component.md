---
title: Less 组件迁移
order: 2
group: 从 Less 迁移
---

# 组件代码迁移

下方的组件 Demo 来自 procomponents 中的 ProCard 的 [Static 组件](https://github.com/ant-design/pro-components/blob/v1/packages/card/src/components/Statistic/index.less)。

<code src="../demos/migration/ProComponentsStatic/less.tsx"></code>

## 迁移步骤

### 1. 替换入口

将样式文件从 `index.less` 改为 `style.ts`，并添加 `const { styles } = useStyles()` 的 hooks 引入，同时将 styles 的样式和默认的容器 className 组合在一起。这样，JSX 层的代码就改好了。

```diff
// index.tsx
- import './index.less';
+ import useStyles from './style.ts';


const Statistic: React.FC = () => {
+  const { styles } = useStyles();

  //...

  return (
-      <div className={classString} style={style}>
+      <div className={cx(styles, classString)} style={style}>
  // 下面的代码保持不变
  //...
  )}

```

### 2. 替换样式代码

将样式代码从 less 语法改为 createStyles 语法，首先重命名 `index.less` 为 `style.ts`，然后在顶部添加

```diff
+ import { createStyles } from 'antd-style';

+ export const useStyles = createStyles(({css})=>{

    return css`
    `
})
```

然后将原来的代码放到 css 函数里。

```diff
import { createStyles } from 'antd-style';

export const useStyles = createStyles(({css})=>{

    return css`
+    .@{pro-card-statistic-prefix-cls} {
+      // ...
+    }
    `
})
```

### 3. 调整层级

由于 我们使用了 css`` 来提供作用域，因此嵌套层级的样式需要微调一下层级，如下所示：

```diff
import { createStyles } from 'antd-style';

export const useStyles = createStyles(({css})=>{

    return css`
-    .@{pro-card-statistic-prefix-cls} {
+    & .@{pro-card-statistic-prefix-cls} {
      // ...
     }
+    .@{pro-card-statistic-prefix-cls} {
+      & + & {
+      // ...
+      }
+    }
    `
})
```

#### 4. less 变量替换为 token 与 js 变量

```diff
import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, prefixCls })=>{
    const prefix = `${prefixCls}-pro-card-statistic`;

    return css`
-    .@{pro-card-statistic-prefix-cls} {
+    & .${prefix} {
-         font-size: @font-size-base;
+         font-size: ${token.fontSize}px;
     }
-    .@{pro-card-statistic-prefix-cls} {
+    .${prefix} {
      & + & {

-      .@{ant-prefix}-statistic-title {
-        color: @text-color;
+      .${prefixCls}-statistic-title {
+        color: ${token.colorText};
      }


+    }
    `
})
```

迁移后效果如下所示。可以看到，在付出较低的迁移成本后，新的组件写法就已经默认支持了响应主题的能力，并获得 cssinjs 化后的所有动态能力。

<code src="../demos/migration/ProComponentsStatic/CSSinJS.tsx"></code>

## 新组件书写方案

详见：[组件研发](/guide/components-usage#最佳实践建议)
