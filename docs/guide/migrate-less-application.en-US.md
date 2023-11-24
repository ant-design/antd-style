---
title: Manual Migration of Less Applications
order: 1
group: Migrating from Less
---

# Migrating Less Applications

createStyle can be used to create and write style code very simply, and it can provide intelligent prompts and type checking, which is completely sufficient for writing new styles. However, there are still a large amount of old project code in our hands. How can we quickly migrate to antd-style?

## Steps for Migrating Applications

Taking the HeaderSearch in Ant Design Pro as an example, the core code related to styles is as follows:

<code src="../demos/migration/LessMode"></code>

### 1. Replace the Entry File

Change the style file from `index.less` to `style.ts`, and add the hooks `const { styles } = useStyles()` import. This way, the JSX layer code is modified.

```diff
// index.tsx
- import styles from './index.less';
+ import useStyles from './style.ts';


const Login: React.FC = () => {
+  const { styles } = useStyles();

  // The following code remains unchanged
  return (
  ..
```

### 2. Replace the Style Code

Change the style code from less syntax to createStyles syntax. First, rename `index.less` to `style.ts`, and then add the following at the top:

```diff
+ import { createStyles } from 'antd-style';

+ export default createStyles(()=>({
```

Next, use some tools to help us quickly convert CSS to CSS Object, for example:

- <https://transform.tools/css-to-js>: Transform CSS to JS tool, which can handle nesting normally, but the converted result will retain the '.' prefix, which still needs to be manually removed;
- <https://staxmanade.com/CssToReact/>: This can directly convert to the target style needed, but it seems that the support for nested CSS is not ideal;
- <https://marketplace.visualstudio.com/items?itemName=rishabh-rathod.css-to-js&ssr=false#qna>: VSCode plugin that can convert with one click, but has poor compatibility with less variables;

```ts
// style.ts
import { createStyles } from 'antd-style';

export default createStyles(() => ({
  container: {
    background: '#f5f5f5',
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSearch: {
    display: 'inline-flex',
    alignItems: 'center',
    input: {
      width: '0',
      minWidth: '0',
      overflow: 'hidden',
      background: 'transparent',
      borderRadius: '0',
      transition: 'width 0.3s, margin-left 0.3s',
      input: { boxShadow: 'none !important' },
      '&.show': { width: '210px', marginLeft: '8px' },
    },
  },
}));
```

And change the nested style objects to be at the same level:

```ts
import { createStyles } from 'antd-style';

export default createStyles(() => ({
  container: {
    background: '#f5f5f5',
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSearch: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  input: {
    width: '0',
    minWidth: '0',
    overflow: 'hidden',
    background: 'transparent',
    borderRadius: '0',
    transition: 'width 0.3s, margin-left 0.3s',
    input: { boxShadow: 'none !important' },
  },
  show: { width: '210px', marginLeft: '8px' },
}));
```

Finally, replace the color values with antd's tokens

```diff
import { createStyles } from 'antd-style';

- export default createStyles(() => ({
+ export default createStyles(({ token }) => ({
  container: {
-    background: "#f5f5f5",
+    background: token.colorBgLayout,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSearch: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  input: {
    width: '0',
    minWidth: '0',
    overflow: 'hidden',
    background: 'transparent',
    borderRadius: '0',
    transition: 'width 0.3s, margin-left 0.3s',
    ':global(.ant-select-selection)': { background: 'transparent' },
    input: { boxShadow: 'none !important' },
  },
  show: { width: '210px', marginLeft: '8px' },
}));
```

The final effect is as follows:

<code src="../demos/migration/CSSinJSMode"></code>

After the migration is completed, thanks to the good type programming ability of TS, we not only have the ability to dynamically theme, but also have the ability to drill down into class names, improving the development experience.

![](https://gw.alipayobjects.com/zos/kitchen/szcQ1qz3n/style.gif)
