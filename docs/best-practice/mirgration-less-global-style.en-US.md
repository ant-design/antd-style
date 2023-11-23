---
title: CSS Modules Global Style Override Migration
group:
  title: Writing Style
  order: 0
---

# CSS Modules Global Style Override Migration

How to handle the usage of `:global` in CSS Modules syntax during migration?

In CSS Modules, there are scenarios where the `:global` is used to override component styles. How should this part of the code be handled during migration?

## Solution

Preferably, use [codemod](/guide/migrate-less-codemod) for one-click migration. This Codemod will automatically convert the `:global` in CSS Modules syntax to the syntax in antd-style.

If manual adjustment is needed, simply remove the `:global` syntax.

Before migration:

```less
.container {
  :global(.ant-btn-link) {
    padding: 0;
    font-size: 12px;
  }
}
```

After migration:

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

## Principle Analysis

Elements in CSS modules are by default given a hash. The `:global` syntax is used to avoid adding a hash to the style name. However, antd-style uses `emotion/css` as the underlying style library, where combined styles do not automatically add a hash. Therefore, simply removing `:global` is sufficient.

## Related Discussions

- [🧐\[Issue\] How to handle the usage of :global in less syntax during migration](https://github.com/ant-design/antd-style/issues/72)
