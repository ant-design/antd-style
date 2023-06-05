---
title: 样式创建
order: 1
group:
  title: 快速上手
  order: 0
demo:
  tocDepth: 4
---

# 使用 createStyles 类名组织样式

antd-style 提供的核心 api 就是 `createStyles` ，该方法可以使用 className 组织样式，更加接近 CSS Modules 的写法。

:::success{title=默认推荐}
这是 antd-style 第一推荐的使用方式。应用样式书写或者对基础组件做样式覆写，都可以使用这种写法。
:::

## 典型示例

一个包含基础用法的 demo 示例，看懂了这个 demo 就会使用 `createStyles` 方法了。

<code src="../demos/createStyles/default.tsx"></code>

## 详细介绍

`createStyles` 针对不同的使用场景，提供了若干种写法来满足研发诉求，并且提升研发体验。

### 写法一：不需要动态性

如果不需要动态性，可以直接用 `createStyles` 传入一个样式对象。

示例：

<code src="../demos/createStyles/SimpleObject.tsx"></code>

### 写法二：结合 antd 的 token 使用

和其他 `antd-style` 的方法一样，`createStyles` 方法可以使用 antd 的 token 和自定义 token。此时 `createStyles` 的入参需要变成函数。

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

示例：

<code src="../demos/createStyles/AntdToken.tsx"></code>

### 写法三：结合外部传入 props

`createStyles` 的第一个参数如果是函数，那么该函数的第二个参数可以指定外部的 props。

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
  // 此处的入参会带有类型提示为 { id: string; open: boolean }
  const styles = useStyles({ id: '1', open: true });

  return <div className={styles.select} />;
};
```

下方 demo 为结合外部入参的 antd Select 组件覆写 demo。

<code src="../demos/createStyles/withProps.tsx"></code>

## 代码组织文件拆分

如果组件样式简单，可以合并在一个文件中，但如果样式文件较大，强烈建议把样式文件部分独立到 `style.ts` 文件中。如下所示：

<code src="../demos/createStyles/Command/index.tsx" ></code>

## 其他常用 css 语法

### Keyframes

支持两种 keyframes 写法，使用 `keyframes` 方法或者 css 原生的 `@keyframes`。

<code src="../demos/createStyles/Keyframes.tsx" ></code>

## API

关于 `createStyles` 方法的详细 API 说明，可以参阅 [createStyles API 文档](/api/create-styles)。
