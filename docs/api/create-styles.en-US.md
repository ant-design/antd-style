---
title: createStyles
description: Create scoped styles
order: 0
sourceUrl: '{github}/blob/master/src/factories/createStyles/index.ts'
group: Creating Styles
demo:
  tocDepth: 4
---

:::success{title=Default Recommendation}
This is the most recommended usage. It can be used to write application styles or override basic component styles.
:::

The `createStyles` function can be used to create scoped styles. In terms of writing ability and developer experience (DX), it is comparable to CSS Modules. It is also more convenient and powerful for dynamic theme writing. For the basic usage of `createStyles`, please refer to [Quick Start - Style Creation](/guide/create-styles). This section will focus on the API of `createStyles`.

<code src="../demos/api/createStyles/default.tsx"></code>

The `createStyles` function can take a function as an argument, and the signature of this function is as follows:

```ts
type GetCssStyleFn = (utils: CreateStylesUtils, props?: Props) => StyleInput;
```

The functionality of each property is detailed below.

## CreateStylesUtils

The first parameter `utils` used when writing styles provides a series of auxiliary objects and methods to facilitate efficient style writing. Its type is `CreateStylesUtils`, and the properties are listed in the table below:

| Property   | Type              | Description                                                                                         |
| ---------- | ----------------- | --------------------------------------------------------------------------------------------------- |
| css        | `CssUtil`         | CSS serialization function                                                                          |
| cx         | `ClassNamesUtil`  | CSS class name utility function                                                                     |
| responsive | `ResponsiveUtil`  | Responsive media query utility function                                                             |
| token      | `FullToken`       | Includes antd tokens and all custom tokens                                                          |
| appearance | `ThemeAppearance` | Current theme mode under the ThemeProvider                                                          |
| isDarkMode | `boolean`         | A syntactic sugar that can be used to reduce the cost of appearance judgment                        |
| prefixCls  | `string`          | The prefix marked on the ThemeProvider, which can be used to flexibly respond to component prefixes |

### css

Type: `CssUtil`

```typescript
interface CssUtil {
  (...styles: (CssObject | undefined | null | boolean)[]): CssObject;
}

interface CssObject {
  [key: string]: string | number | CssObject;
}
```

The CSS serialization function is the core API in `createStyles`. This method is based on the encapsulation of `emotion/css`, and we have enhanced many capabilities, such as supporting cascading of multiple CSS objects (after v11, `@emotion/css` no longer supports cascading, see related [issue](https://github.com/emotion-js/emotion/issues/1186)), and supporting the `:where` selector.

This serialization function supports both CSS Object and CSS String. The CSS Object syntax can provide TypeScript type hints by default, while the CSS String syntax needs to be combined with [related plugins](/guide/css-in-js-intro#engineering-support) to provide hinting capabilities.

:::warning{title=Note}
Unlike the `css` method in @emotion/css, the type of the result of this method is `SerializedStyles`, which cannot be directly applied to a className. We have added a layer of conversion in `createStyles`, and the final `styles.xxx` obtained is a className string.
:::

Common issues and discussions:

- [Does the css solution support variable nesting?](https://github.com/ant-design/antd-style/issues/42)
- [Points to note when used with container](https://github.com/ant-design/antd-style/issues/47#issuecomment-1536505984)

### cx

Type: `ClassNamesUtil`

```typescript
interface ClassNamesUtil {
  (...classNames: (string | undefined | null | boolean)[]): string;
}
```

It is basically equivalent to the `cx` in `emotion/css` ([related link](https://emotion.sh/docs/@emotion/css#cx)), and is used in 95% of the same scenarios. It is only necessary to pay attention when using it with the container of StyleProvider ([related discussion](https://github.com/ant-design/antd-style/issues/47#issuecomment-1536505984)), which is not encountered in general situations.

### responsive

Type: `ResponsiveUtil`

```typescript
/**
 * Responsive breakpoint utility function
 */
export interface ResponsiveUtil {
  // Default breakpoints in antd

  xxl: string;
  xl: string;
  lg: string;
  md: string;
  sm: string;
  xs: string;

  // Semantic breakpoints

  mobile: string; // Corresponds to xs
  tablet: string; // Corresponds to md
  laptop: string; // Corresponds to lg
  desktop: string; // Corresponds to xxl

  /**
   * Supports the use of function expressions
   * @param breakpoints
   */
  (breakpoints: BreakpointMapParams): SerializedStyles;
}
```

This utility function provides a convenient way to create responsive media queries. An example is as follows:

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

The breakpoints of this utility function follow the PC-First principle, using max-width query logic for xs to xl, and min-width query logic for xxl.

| Breakpoint | Calculation Logic                             |
| ---------- | --------------------------------------------- |
| xs         | `@media (max-width: ${token.screenXSMax}px)`  |
| sm         | `@media (max-width: ${token.screenSMMax}px)`  |
| md         | `@media (max-width: ${token.screenMDMax}px)`  |
| lg         | `@media (max-width: ${token.screenLGMax}px)`  |
| xl         | `@media (max-width: ${token.screenXLMax}px)`  |
| xxl        | `@media (min-width: ${token.screenXXLMin}px)` |
| mobile     | Alias for xs                                  |
| tablet     | Alias for md                                  |
| laptop     | Alias for lg                                  |
| desktop    | Alias for xxl                                 |

### token

Type: `FullToken`

```ts
interface FullToken extends AntdToken, CustomToken {}
```

It includes antd tokens and custom tokens on the ThemeProvider. There are many related usages in this document, so they will not be repeated here.

By extending the `CustomToken` type, you can get type hints for custom tokens.

```ts
interface NewToken {
  customBrandColor: string;
}

// By extending the CustomToken object type definition for antd-style, you can extend custom token objects for tokens
declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomToken extends NewToken {}
}
```

### appearance

Type: `'dark' | 'light' | string`

The theme mode under the outermost ThemeProvider.

### isDarkMode

Type: `boolean`

A syntactic sugar for judging light and dark theme modes, which is equivalent to `appearance === 'dark'`. Using `isDarkMode` directly can reduce the cost of appearance judgment.

### prefixCls

Type: `string`

The prefix marked on the ThemeProvider. By using this parameter, you can flexibly override the antd prefix.

```ts
const useStyles = createStyles(({ css, prefixCls, iconPrefixCls }) => ({
  button: css`
    &.${prefixCls}-btn {
      background: lightsteelblue;
      border: none;
      color: royalblue;
    }

    .${iconPrefixCls} {
      color: darkblue;
    }
  `,
}));
```

The above style code can accurately override regardless of the value of the prefixCls wrapped by the outer ThemeProvider.

<code src="../demos/api/createStyles/with-antd-cp.tsx"></code>

## ClassNameGeneratorOption

The second parameter of `createStyles` can be used to control the generated className.

| Property     | Type           | Description                                   |
| ------------ | -------------- | --------------------------------------------- |
| hashPriority | `HashPriority` | Weight of the generated hash className styles |
| label        | `string`       | Add a suffix                                  |

### hashPriority

Type: `'low' | 'high'`

Controls the weight of the generated className, defaulting to `high`.

If set to `low`, the generated hash style selector will be wrapped with the `:where` selector to reduce its weight. Generally, this can be used in component library scenarios, but it is not recommended for other scenarios.

### label

Type: `string`

Similar to the label in emotion. After adding a label, it will be added to the suffix. Generally, it is not necessary to use.

<code src="../demos/api/createStyles/label.tsx"></code>
