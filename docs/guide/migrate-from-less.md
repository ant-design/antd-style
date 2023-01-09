---
title: 从 Less 迁移
order: 3
group: 快速上手
---

# 从 Less 迁移到 CSS in JS

createStyle 可以非常简单地创建和书写样式代码，且能够获得智能提示与类型检测，对于书写新的样式来说完全足够。但是我们手中仍然存在大量的旧项目代码，如何快速地迁移到 antd-style 中？

以 Ant Design Pro 中的 HeaderSearch 为例，和样式相关的核心代码如下：

```tsx | pure
// index.tsx
import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input, InputRef } from 'antd';
import { FC, useRef, useState } from 'react';

import classNames from 'classnames';

import styles from './index.less';

const HeaderSearch: FC = () => {
  const [searchMode, setSearchMode] = useState(false);

  const inputRef = useRef<InputRef | null>(null);

  const inputClass = classNames(styles.input, searchMode ? styles.show : '');

  return (
    <div className={styles.container}>
      <div
        className={styles.headerSearch}
        onClick={() => {
          setSearchMode(true);
          inputRef.current?.focus();
        }}
      >
        <SearchOutlined
          key="Icon"
          style={{
            cursor: 'pointer',
          }}
        />
        <AutoComplete key="AutoComplete" className={inputClass}>
          <Input
            ref={inputRef}
            size="small"
            onBlur={() => {
              setSearchMode(false);
            }}
          />
        </AutoComplete>
      </div>
    </div>
  );
};

export default HeaderSearch;
```

相应的 less 文件为：

```less
// index.less
.headerSearch {
  display: inline-flex;
  align-items: center;

  .input {
    width: 0;
    min-width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    transition: width 0.3s, margin-left 0.3s;

    :global(.ant-select-selection) {
      background: transparent;
    }

    input {
      box-shadow: none !important;
    }

    &.show {
      width: 210px;
      margin-left: 8px;
    }
  }
}
```

[//]: # '<code src="../demos/migration/LessMode"></code>'

## 替换步骤

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

借助一些工具，我们可以非常高效地完成代码的替换：

将样式代码从 less 语法改为 createStyle 语法，首先重命名 `index.less` 为 `style.ts`，然后在顶部添加

```diff
+ import { createStyles } from 'antd-style';

+ export default createStyles(()=>({
```

接下来使用一些工具，可以帮助我们快速将 css 转成 CSS Object，例如：

- https://transform.tools/css-to-js
- https://staxmanade.com/CssToReact/
- VSCode 插件：https://marketplace.visualstudio.com/items?itemName=rishabh-rathod.css-to-js&ssr=false#qna

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
      ':global(.ant-select-selection)': { background: 'transparent' },
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
    ':global(.ant-select-selection)': { background: 'transparent' },
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
