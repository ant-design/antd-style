---
title: 样式创建
order: 1
group:
  title: 快速上手
  order: 0
---

# 使用 createStyles 类名组织样式

antd-style 提供的核心 api 就是使用 `createStyles` 方法可以适用类名来组织样式，它更加接近 CSS Modules 的写法。

:::success{title=默认推荐}
这是 antd-style 第一推荐的使用方式。应用样式书写或者对基础组件做样式覆写，都可以使用这种写法。
:::

## 典型示例

一个包含基础用法的 demo 示例，看懂了这个 demo 就会使用 `createStyles` 方法了。

<code src="../demos/createStyles/default.tsx"></code>

## 详细介绍

`createStyles` 针对不同的使用场景，提供了若干种写法，满足研发诉求，并提升研发体验。

### 写法一：不需要动态性

如果不需要动态性，可以直接用 `createStyles` 传入一个样式对象。

使用示例：

<code src="../demos/createStyles/SimpleObject.tsx"></code>

样式对象的类型为：

```ts | pure
type StyleInput<T> = string | Record<T, CSSObject | string>;
```

### 写法二：结合 antd 的 token 使用

和其他 `antd-style` 的方法一样，`createStyles` 方法可以使用 antd 的 token 和自定义 token。此时 `createStyles` 的入参需要变成函数。

demo 示例：

<code src="../demos/createStyles/AntdToken.tsx"></code>

### 写法三：结合外部传入 props

`createStyles` 的第二个参数可以指定可传入的 props。

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

<code src="../demos/createStyles/withProps.tsx"></code>

## 代码组织文件拆分

如果组件样式简单，可以合并在一个文件中，但如果样式文件较大，可以把样式文件部分独立到 `style.ts` 文件中。如下所示：

<code src="../demos/createStyles/Command/index.tsx" ></code>

## API

关于 `createStyles` 方法的详细 API 说明，可以参阅 [createStyles API 文档](/api/create-styles)。
