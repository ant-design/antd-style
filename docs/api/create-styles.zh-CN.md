---
title: createStyles
description: 创建具有作用域的样式
order: 0
sourceUrl: '{github}/blob/master/src/factories/createStyles/index.ts'
group: 创建样式
demo:
  tocDepth: 4
---

:::success{title=默认推荐}
这是最推荐的使用方式。书写应用样式或者覆写基础组件样式，都可以采用这种写法。
:::

使用 `createStyles` 可以创建具有作用域的的样式。书写能力上和 DX 基本与 CSS Modules 齐平。并在动态主题写法更方便，能力更强。createStyles 的基础使用方法详见[快速上手 - 样式创建](/guide/create-styles)，本节将重点介绍 createStyles 的 API。

<code src="../demos/api/createStyles/default.tsx"></code>

createStyles 方法可以传入一个函数，该函数签名如下：

```ts
type GetCssStyleFn = (utils: CreateStylesUtils, props?: Props) => StyleInput;
```

下面详细介绍每个属性的功能。

## CreateStylesUtils

书写样式时使用的第一个参数 utils，提供了一系列便于样式书写的辅助对象和方法，提高样式书写的效率。它的类型为 CreateStylesUtils ，属性表格如下：

| 属性名     | 类型              | 描述                                                                                         |
| ---------- | ----------------- | -------------------------------------------------------------------------------------------- |
| css        | `CssUtil`         | CSS 序列化函数                                                                               |
| cx         | `ClassNamesUtil`  | CSS 类名工具函数                                                                             |
| responsive | `ResponsiveUtil`  | 响应式媒体查询工具函数                                                                       |
| token      | `FullToken`       | 包含 antd 的 token 和所有自定义 token。                                                      |
| appearance | `ThemeAppearance` | ThemeProvider 下当前的主题模式。                                                             |
| isDarkMode | `boolean`         | 语法糖，可以直接使用 isDarkMode 来降低外观的判断成本。                                       |
| prefixCls  | `string`          | 在 ThemeProvider 上标记的 prefix，可以拿到当前的组件 prefix，便于更加灵活地响应组件 prefix。 |

### css

类型: `CssUtil`

```typescript
interface CssUtil {
  (...styles: (CssObject | undefined | null | boolean)[]): CssObject;
}

interface CssObject {
  [key: string]: string | number | CssObject;
}
```

CSS 序列化函数，是 createStyles 中的核心 api。该方法底层基于 `emotion/css` 封装，我们做了诸多能力上的强化，例如 支持多个 css 对象级联（ `@emotion/css` 在 v11 之后不再支持级联，相关 [issue](https://github.com/emotion-js/emotion/issues/1186)）、支持 `:where` 选择器等。

该序列化函数支持 CSS Object，也支持 CSS String。CSS Object 写法默认可以获得 TS 类型提示， CSS String 写法需要结合 [相关插件](/guide/css-in-js-intro#工程化支持) 获得提示能力。

:::warning{title=注意事项}
与 @emotion/css 的 css 不同，该方法的产物类型为 SerializedStyles，是无法直接应用到 className 上的。我们在 createStyles 中做了一层转换，最终得到的 `styles.xxx` 是 className 字符串。
:::

常见问题与讨论：

- [css 方案不支持变量嵌套？](https://github.com/ant-design/antd-style/issues/42)
- [搭配 container 使用的注意事项](https://github.com/ant-design/antd-style/issues/47#issuecomment-1536505984)

### cx

类型: `ClassNamesUtil`

```typescript
interface ClassNamesUtil {
  (...classNames: (string | undefined | null | boolean)[]): string;
}
```

基本与等价 emotion/css 中的 [`cx`](https://emotion.sh/docs/@emotion/css#cx) 等价，95% 的使用场景是一样的。只有在搭配 StyleProvider 的 container 使用时需要注意（ [相关讨论](https://github.com/ant-design/antd-style/issues/47#issuecomment-1536505984) ），一般情况下不会遇到。

### responsive

类型：`ResponsiveUtil`

```typescript
/**
 * 响应式断点工具函数
 */
export interface ResponsiveUtil {
  // antd 默认断点

  xxl: string;
  xl: string;
  lg: string;
  md: string;
  sm: string;
  xs: string;

  // 语义化断点

  mobile: string; // 对应 xs
  tablet: string; // 对应 md
  laptop: string; // 对应 lg
  desktop: string; // 对应 xxl

  /**
   * 支持使用函数表达式
   * @param breakpoints
   */
  (breakpoints: BreakpointMapParams): SerializedStyles;
}
```

该工具函数提供了快捷创建响应式媒体查询的方法。示例如下：

```ts
const useStyles = createStyles(({ css, responsive }) => ({
  container: css`
    background-color: lightblue;

    ${responsive.tablet} {
      background: aqua;
    }

    ${responsive.desktop} {
      background: darksalmon;
    }

    ${responsive.mobile} {
      background: pink;
    }
  `,
}));
```

<code src="../demos/api/createStyles/Responsive.tsx"></code>

该工具方法的断点遵循 PC-First 原则， 在 xs ~ xl 使用 max-width 查询逻辑，在 xxl 使用 min-width 查询逻辑。

| 断点    | 计算逻辑                                      |
| ------- | --------------------------------------------- |
| xs      | `@media (max-width: ${token.screenXSMax}px)`  |
| sm      | `@media (max-width: ${token.screenSMMax}px)`  |
| md      | `@media (max-width: ${token.screenMDMax}px)`  |
| lg      | `@media (max-width: ${token.screenLGMax}px)`  |
| xl      | `@media (max-width: ${token.screenXLMax}px)`  |
| xxl     | `@media (min-width: ${token.screenXXLMin}px)` |
| mobile  | xs 的 alias                                   |
| tablet  | md 的 alias                                   |
| laptop  | lg 的 alias                                   |
| desktop | xxl 的 alias                                  |

### token

类型：`FullToken`

```ts
interface FullToken extends AntdToken, CustomToken {}
```

包含 antd 的 token 和 ThemeProvider 上自定义 token。相关用法本文档中已有很多，不再赘述。

通过扩展 `CustomToken` 类型可以获得自定义 token 的类型提示。

```ts
interface NewToken {
  customBrandColor: string;
}

// 通过给 antd-style 扩展 CustomToken 对象类型定义，可以为 token 扩展 自定义 token 对象
declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomToken extends NewToken {}
}
```

### appearance

类型：`'dark' | 'light' | string`

外层包裹的 ThemeProvider 下的主题模式。

### isDarkMode

类型：`boolean`

判断亮暗色主题的语法糖，实现上等价于 `appearance === 'dark'`，直接使用 isDarkMode 可以降低外观的判断成本。

### prefixCls

类型：`string`

在 ThemeProvider 上标记的 prefixCls，利用该参数，可以实现灵活的 antd 前缀覆盖。

```ts
const useStyles = createStyles(({ css, prefixCls }) => {
  return {
    primary: css`
      .${prefixCls}-btn {
        border: 12px;
      }
    `,
  };
});
```

上述样式代码，无论外层包裹的 ThemeProvider prefixCls 改成什么值，均可准确覆盖到。

## ClassNameGeneratorOption

createStyles 的第二个参数可以对生成的 className 做额外的控制。

| 属性名       | 类型           | 描述                           |
| ------------ | -------------- | ------------------------------ |
| hashPriority | `HashPriority` | 生成的 hash className 样式权重 |
| label        | `string`       | 添加后缀                       |

### hashPriority

类型：`'low' | 'high'`

控制生成的 className 的权重，默认为 `high`。

如果设为 `low`，生成 hash 的样式选择器会包裹 :where 选择器，以降低权重。一般来说在组件库的使用场景中可以用到，其他场景不建议使用。

### label

类型：`string`

类似 emotion 的 label。添加 label 后，将会在把 label 添加到后缀中。一般来说无需使用。

<code src="../demos/api/createStyles/label.tsx"></code>
