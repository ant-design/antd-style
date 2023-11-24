---
title: Design Philosophy and Implementation Strategy
order: 4
group: Basic Knowledge
---

# Design Philosophy and Implementation Strategy

## Basic Assumptions

When antd-style was first built, we had two basic assumptions:

- **In the CSSinJS world, the core API will converge to `styled` and `css`**, and the community ecosystem (linting, formatting, syntax highlighting, etc.) will also revolve around these two APIs. The capabilities provided by CSSinJS libraries at the mature stage will be roughly equivalent.
- CSSinJS libraries themselves will not restrict developers in how they use the library, so the library will provide as many capabilities as possible. However, developers often still need a best practice for using CSSinJS.

## Style Engine and Style Practice

Based on the above two basic assumptions, we can provide two completely different classification criteria:

1. **Style Engine**: The underlying style libraries that provide style writing in the CSSinJS world, such as styled-components, emotion, goober, linaria, etc., all belong to this category.
2. **Style Practice**: Solutions that provide best practices for business applications, which may be a library or just a concept. For example, CSS Modules, BEM, Tailwind CSS, and **antd-style belongs to this category**.

If we compare it to the traditional CSS world, then the style engine is equivalent to CSS preprocessor languages/libraries like LESS, SASS, PostCSS. Style practice is similar to CSS Modules, BEM, etc. Different style practices provide developers with a unified style writing method based on their respective concepts, helping developers solve various problems in writing styles.

The goal of the style engine is to provide developers with various powerful capabilities and to provide new possibilities for style writing. Its tendency is to expand. The goal of style practice is to provide developers with a unified and concise style solution. Its tendency is to converge.

## Positioning and Goals of antd-style

Therefore, when we cleanly separate the above two, it becomes very clear: the positioning of `antd-style` is a `style practice` library, providing a set of deterministic style writing solutions for antd's developer users, and providing best practice solutions for the vast majority of style writing scenarios, including but not limited to: 1) application styles, 2) component styles, 3) less migration, 4) responsive design, 4) dynamic themes, 5) custom themes, 6) token extension, 7) design collaboration, and so on.

Therefore, antd-style will encapsulate a set of APIs on top of excellent CSSinJS style engines in the community, providing application developers and component developers with a more user-friendly syntax and better performance.

Therefore, antd-style can be decoupled from a specific style engine. For example, when a static compilation solution or Atomtic CSSinJS becomes mature, users only need to replace the style engine with a new library, and while gaining the ability of atomic styles, they can continue to consume the standard API of antd-style.

## Current Style Engine Chosen by antd-style

Based on the current development of community solutions, we have built-in `@emotion/styled` as the style engine for `styled` syntax and selected `emotion` as the style engine for `css` syntax. The decision reasons are as follows:

### styled: Why Choose @emotion/styled

There are two libraries in the styled syntax candidate pool: `styled-components` and `emotion`. Their capabilities are compared as follows:

| Feature               | Styled Components | Emotion                                                                |
| --------------------- | ----------------- | ---------------------------------------------------------------------- |
| styled                | ✅                | ✅                                                                     |
| styled.<tag>          | ✅                | ✅                                                                     |
| as                    | ✅                | ✅                                                                     |
| .withComponent        | ✅                | ✅                                                                     |
| shouldForwardProp     | ✅                | ✅                                                                     |
| keyframes             | ✅                | ✅                                                                     |
| Global styles         | ✅                | ✅                                                                     |
| SSR                   | ✅                | ✅                                                                     |
| Theming               | ✅                | ✅                                                                     |
| Tagged Templates      | ✅                | ✅                                                                     |
| Object styles         | ✅                | ✅                                                                     |
| Dynamic styles        | ✅                | ✅                                                                     |
| Component as Selector | ✅                | Requires [Babel plugin](https://emotion.sh/docs/@emotion/babel-plugin) |

Initially, we used the emotion solution, but in practical application and verification, we found that emotion's styled does not natively support the use of components as selectors, and a babel plugin needs to be configured to achieve this. Our initial implementation re-exported the `styled` object, making the configuration of the babel plugin very complex, and most developers may not be able to configure it correctly.

So we tried to integrate `styled-components` by default, but at this point, we found that if we integrate styled-components for default compatibility with component selector syntax, it will require an additional 10 KB+ in size after compression (compared to `@emotion/styled`).

| Integrated `styled-components` version ([3.0.0-alpha.42](https://bundlephobia.com/package/antd-style@3.0.0-alpha.42)) | Integrated `@emotion/styled` version ([3.0.0-alpha.41](https://bundlephobia.com/package/antd-style@3.0.0-alpha.41)) |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| ![](https://user-images.githubusercontent.com/28616219/233837788-a97688a7-db60-473e-94a9-5d43995a91a3.png)            | ![](https://user-images.githubusercontent.com/28616219/233837838-4156e64f-d05e-4317-9876-d57bcc757e97.png)          |

In addition, in our actual business testing, we found that 95% of style writing scenarios do not require the use of component selector syntax. It is only used in scenarios that require animations, compound selectors, etc., and in these scenarios, the `createStyles` syntax will be more natural and user-friendly.

In our view, the syntax for component selectors is essentially a remedial measure provided because styled does not support creating class names. It is not cost-effective to increase the size by an additional 40% (10kb+) for this 5% usage scenario. At the same time, in the final implementation plan, we also clearly produced a solution for replacing the styled syntax. See: [createInstance-Compatible with styled-components](/api/create-instance#compatible-with-styled-theme-solution).

Therefore, considering practical cases, package size, and usage scenarios, after several swings, we finally chose `@emotion/styled` as the style engine for the `styled` syntax.

:::info{title=Special Note}
Although `@emotion/styled` was chosen as the style engine for the styled syntax, antd-style does not include the `styled` method by default, but only integrates `@emotion/react`'s ThemeContext. For more details, please refer to: [Integration with styled](/guide/styled).
:::

### css: Why Choose Emotion

The candidate pool for the css syntax also includes the above two libraries: `styled-components` and `emotion`.

When deciding on the css solution, there were basically no additional considerations, and we directly adopted emotion. The reason is that the `css` method provided by styled-components cannot be directly converted to a class name. Therefore, in this respect, styled-components lacks this capability. We have already explained the `css` prop in the previous section, and it is not the API we expect, so we chose emotion as the style engine for `css`.

| Feature        | Styled Components                 | Emotion                          |
| -------------- | --------------------------------- | -------------------------------- |
| css api        | ✅                                | ✅                               |
| css prop       | Requires configuring babel plugin | Requires configuring jsx runtime |
| ClassNames     | 🛑                                | ✅                               |
| Global styles  | ✅                                | ✅                               |
| SSR            | ✅                                | ✅                               |
| Keyframe       | ✅                                | ✅                               |
| Object styles  | ✅                                | ✅                               |
| Dynamic styles | ✅                                | ✅                               |
