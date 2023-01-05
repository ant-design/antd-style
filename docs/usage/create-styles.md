---
title: createStyles 创建样式
order: 1
group:
  title: 创建样式
  order: 0
---

# createStyles 模块样式

使用 `createStyles` 可以创建具有作用域的的样式。书写能力上和 DX 基本与 CSS Modules 齐平。并在动态主题写法更方便，能力更强。

适用场景：单纯用于部分组件样式，或者对基础组件做样式覆写的话，可以使用这种写法。

## 典型示例

一个 demo 胜千言，看懂了这个 demo 就会使用 `createStyles` 方法了。

<code src="../demos/createStyles/default.tsx"></code>

## 详细介绍

`createStyles` 针对不同的使用场景，提供了若干种写法，提升研发体验。

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

入参函数的签名：

```ts | pure
type GetCssStyleFn = (theme: CreateStylesTheme, props?: Props) => StyleInput;

interface CreateStylesTheme {
  token: AntdToken | CustomToken;
}
```

demo 示例：

<code src="../demos/createStyles/AntdToken.tsx"></code>

### 写法三：结合外部传入 props

TBD

## 代码组织文件拆分

如果组件样式简单，可以合并在一个文件中，但如果样式文件较大，可以把样式文件部分独立到 `style.ts` 文件中。如下所示：

<code src="../demos/createStyles/Command/index.tsx" ></code>

## API

:::warning

`createStyles` 需要套在 [`ThemeProvider`](/usage/theme-provider) 组件下，导出的 theme 对象才能生效，否则是无效的。

:::

[//]: # '<code src="../demos/createStyles/WithoutProvider.tsx"></code>'
