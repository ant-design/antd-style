---
title: Less 应用手动迁移
order: 1
group: 从 Less 迁移
---

# 迁移 Less 应用

createStyle 可以非常简单地创建和书写样式代码，且能够获得智能提示与类型检测，对于书写新的样式来说完全足够。但是我们手中仍然存在大量的旧项目代码，如何快速地迁移到 antd-style 中？

## 应用代码迁移步骤

以 Ant Design Pro 中的 HeaderSearch 为例，和样式相关的核心代码如下：

<code src="../demos/migration/LessMode"></code>

### 1. 替换入口文件

将样式文件从 `index.less` 改为 `style.ts`，并添加 `const { styles } = useStyles()` 的 hooks 引入。这样，JSX 层的代码就改好了。

```diff
// index.tsx
- import styles from './index.less';
+ import useStyles from './style.ts';


const Login: React.FC = () => {
+  const { styles } = useStyles();

  // 下面的代码保持不变
  return (
  ..
```

### 2. 替换样式代码

将样式代码从 less 语法改为 createStyles 语法，首先重命名 `index.less` 为 `style.ts`，然后在顶部添加

```diff
+ import { createStyles } from 'antd-style';

+ export default createStyles(()=>({
```

接下来使用一些工具，可以帮助我们快速将 css 转成 CSS Object，例如：

- https://transform.tools/css-to-js ：Transform 的 css to JS 工具，嵌套可以正常处理，但是转换后会保留 '.' 前缀，仍然需要手动处理掉；
- https://staxmanade.com/CssToReact/ ： 这个可以直接直接转换成需要的目标样式，但似乎对 css 嵌套的支持不太理想；
- https://marketplace.visualstudio.com/items?itemName=rishabh-rathod.css-to-js&ssr=false#qna ：可以一键转换的 VSCode 插件，但对 less 变量兼容性不好；

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

并将嵌套的样式对象改成平级：

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

最后将色值替换为 antd 的 token

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

最终效果如下：

<code src="../demos/migration/CSSinJSMode"></code>

当完成迁移后，得益于 TS 良好的类型编程能力，在拥有动态化主题能力的同时，我们还获得了类名下钻跳转的能力，提升研发体验。

![](https://gw.alipayobjects.com/zos/kitchen/szcQ1qz3n/style.gif)
