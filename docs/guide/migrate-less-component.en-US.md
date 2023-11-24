---
title: Migrating Less Components
order: 2
group: Migrating from Less
---

# Migrating Component Code

The component demo below is from the ProCard's [Static component](https://github.com/ant-design/pro-components/blob/v1/packages/card/src/components/Statistic/index.less) in procomponents.

<code src="../demos/migration/ProComponentsStatic/less.tsx"></code>

## Migration Steps

### 1. Replace Entry Point

Change the style file from `index.less` to `style.ts`, and add the hooks `const { styles } = useStyles()` import. Combine the styles and the default container class in the JSX layer. This way, the JSX layer code is updated.

```diff
// index.tsx
- import './index.less';
+ import useStyles from './style.ts';


const Statistic: React.FC = () => {
+  const { styles, cx } = useStyles();

  //...

  return (
-      <div className={classString} style={style}>
+      <div className={cx(styles, classString)} style={style}>
  // The following code remains unchanged
  //...
  )}

```

### 2. Replace Style Code

Change the style code from less syntax to createStyles syntax. First, rename `index.less` to `style.ts`, then add the following at the top:

```diff
+ import { createStyles } from 'antd-style';

+ export const useStyles = createStyles(({css})=>{

    return css`
    `
})
```

Then place the original code inside the css function.

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

### 3. Adjust Hierarchy

Since we use css\`\` to provide scope, the nested level styles need to be adjusted as follows:

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

### 4. Replace Less Variables with Tokens and JS Variables

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

The effect after migration is shown below. It can be seen that after a relatively low migration cost, the new component writing method already supports the ability to respond to themes by default and gains all the dynamic capabilities after cssinjs transformation.

<code src="../demos/migration/ProComponentsStatic/CSSinJS.tsx"></code>

## New Component Writing Scheme

See: [Component Development](/guide/components-usage#BestPracticeRecommendations)
