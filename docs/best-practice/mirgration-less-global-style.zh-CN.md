---
title: CSS Modules 全局样式覆写迁移
group:
  title: 样式书写
  order: 0
---

# CSS Modules 全局样式覆写迁移

迁移过程中 CSS Modules 语法中使用到的 `:global` 怎么处理？

在 CSS Modules 中有部分场景需要通过 :global 去覆盖组件样式，迁移过程中这部分代码如何处理？

## 解决方案

优先使用 [codemod](/zh-CN/guide/migrate-less-codemod) 一键迁移，该 Codemod 会自动将 Css Modules 语法中的 :global 转换为 antd-style 中的语法。

如需手动调整，那么直接移除 :global 语法既可。

迁移前：

```less
.container {
  :global(.ant-btn-link) {
    padding: 0;
    font-size: 12px;
  }
}
```

迁移后：

```ts
const useStyles = createStyles(({ css }) => ({
  container: css`
    .ant-btn-link {
      padding: 0;
      font-size: 12px;
    }
  `,
}));
```

## 原理解析

css module 中的元素默认会添加 hash，`:global` 语法是为了避免给样式名添加 hash。而 antd-style 使用了 `emotion/css`
作为底层样式库，其中联合的样式并不会自动添加 hash，因此直接去除 :global 即可。

## 相关讨论

- [🧐[问题] 迁移过程中 less 语法中使用到的 :global 怎么处理](https://github.com/ant-design/antd-style/issues/72)
