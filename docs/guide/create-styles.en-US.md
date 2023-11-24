---
title: Writing Style
order: 1
group:
  title: Quick Start
  order: 0
demo:
  tocDepth: 4
---

# Writing Styles Using createStyles

The core API provided by antd-style is `createStyles`, which allows organizing styles using class names, similar to the writing style of CSS Modules.

:::success{title=Default Recommendation}
This is our first recommended writing style. It can be used to write application styles or override basic component styles.
:::

## Typical Example

A demo example containing basic usage, understanding this demo will enable you to use the `createStyles` method.

<code src="../demos/createStyles/default.tsx"></code>

## Detailed Introduction

`createStyles` provides several writing styles to meet development needs and improve the development experience for different scenarios.

### Style 1: No Dynamic Requirement

If there is no dynamic requirement, you can directly use `createStyles` to pass in a style object.

<code src="../demos/createStyles/SimpleObject.tsx"></code>

### Style 2: Using antd Tokens

The `createStyles` method can use antd tokens and custom tokens. In this case, the parameter of `createStyles` needs to be a function.

```ts
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => {
  const commonCard = css`
    border-radius: ${token.borderRadiusLG}px;
    padding: ${token.paddingLG}px;
  `;

  return {
    container: css`
      background-color: ${token.colorBgLayout};
      padding: 24px;
    `,

    primaryCard: css`
      ${commonCard};
      background: ${token.colorPrimary};
      color: ${token.colorTextLightSolid};
    `,

    defaultCard: css`
      ${commonCard};
      background: ${token.colorBgContainer};
      color: ${token.colorText};
    `,
  };
});
```

<code src="../demos/createStyles/AntdToken.tsx"></code>

### Style 3: Using External Props

The second parameter of the function can receive external props.

```tsx | pure
const useStyles = createStyles(({ token, css }, props: { id: string; open: boolean }) => {
  return {
    select: props.open
      ? css`
          border-color: ${token.colorSuccess};
        `
      : undefined,
  };
});

const Select = () => {
  // The parameter here will have type hints as { id: string; open: boolean }
  const styles = useStyles({ id: '1', open: true });

  return <div className={styles.select} />;
};
```

The following demo is an example of overriding the antd Select component with external input parameters.

<code src="../demos/createStyles/withProps.tsx"></code>

## Organizing Code Files

If the component styles are simple, they can be merged into one file. However, if the style file is large, it is strongly recommended to separate the style file into a `style.ts` file. As shown below:

<code src="../demos/createStyles/Command/index.tsx" ></code>

## Other Common CSS Syntax

### Keyframes

Supports two types of keyframes writing, using the `keyframes` method or the native CSS `@keyframes`.

<code src="../demos/createStyles/Keyframes.tsx" ></code>

## API

For detailed API documentation of the `createStyles` method, please refer to the [createStyles API documentation](/api/create-styles).
