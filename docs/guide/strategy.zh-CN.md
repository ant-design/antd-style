---
title: 设计理念与实施策略
order: 4
group: 基础知识
---

# 设计理念与实施策略

## 基本假设

antd-style 在构建之初，我们有两个基本假设：

- **在 CSSinJS 世界中，核心 API 会收敛为 `styled` 和 `css`**，社区生态（lint、format、语法高亮等）也将只围绕这两个 API 做文章，且当 cssinjs 库到成熟阶段后所提供的 API 能力会基本对等；
- CSSinJS 库本身不会限制开发者使用这个库的姿势，因此库会提供尽量多的能力，但是开发者往往仍然需要一个使用 CSSinJS 的最佳实践；

## 样式引擎与样式实践

基于上述两大基本假设，我们可以给出两种完全不同的分类标准：

1. **样式引擎**: 在 CSSinJS 世界中提供样式写法的底层样式库，例如 styled-components、emotion、goober、linaria 等都属于此类；
2. **样式实践**: 为业务应用中提供最佳实践的方案，它可能是个库，也可能只是一种思想。例如 CSS Modules、BEM 、Tailwind CSS， **antd-style 则属于此类**。

如果我们拿传统 CSS 世界来类比，那么样式引擎等同于 LESS、SASS、PostCSS 这样的 CSS 预处理语言/库。而样式实践则是 CSS Modules、BEM 这样的东西。不同的样式实践通过各自不同的思想，为开发者提供一种各自统一的样式写法，帮助开发者解决书写样式中的各种问题。

样式引擎的目标在于为开发者提供各种强大的能力，为样式书写提供新的可能性，它的趋向性是扩张的。 而样式实践的目标是为开发者提供统一简洁的样式解决方案，它的趋向性是收敛的。

## antd-style 的定位与目标

因此,将上述两者切割干净后会就会非常清晰： `antd-style` 的定位就是一个 `样式实践` 库，为 antd 的开发者用户提供一套具有确定性的样式书写方案，并在绝大部分样式书写场景都提供了最佳实践的方案：包括但不限：1）应用样式、2）组件样式、3）less 迁移、4）响应式、4）动态主题、5）自定义主题、6）token 扩展、7）设计协同等等。

所以，antd-style 会在社区优秀的 cssinjs 样式引擎上层封装出一套 api，为应用开发者、组件开发者提供更加易写的语法，且能获得更优的性能。

因此 antd-style 可以与某个具体的样式引擎脱钩。譬如： 静态化编译方案 或 Atomtic CSSinJS 成熟，用户只需将样式引擎替换为新的库，在获得原子化样式的能力的同时，可以继续消费 antd-style 的标准 api。

## 当前 antd-style 选择的样式引擎

基于目前的社区方案发展情况，我们内置了 `@emotion/styled` 作为 `styled` 语法的样式引擎，选择了 `emotion` 作为 `css` 语法的样式引擎。决策原因如下：

### styled: 为什么选择 @emotion/styled

styled 的语法候选池中有两个库： `styled-component` 和 `emotion`。 它们的能力对比如下：

| 特性                  | Styled Components | Emotion                                                          |
| --------------------- | ----------------- | ---------------------------------------------------------------- |
| styled                | ✅                | ✅                                                               |
| styled.<tag>          | ✅                | ✅                                                               |
| as                    | ✅                | ✅                                                               |
| .withComponent        | ✅                | ✅                                                               |
| shouldForwardProp     | ✅                | ✅                                                               |
| keyframes             | ✅                | ✅                                                               |
| Global styles         | ✅                | ✅                                                               |
| SSR                   | ✅                | ✅                                                               |
| Theming               | ✅                | ✅                                                               |
| Tagged Templates      | ✅                | ✅                                                               |
| Object styles         | ✅                | ✅                                                               |
| Dynamic styles        | ✅                | ✅                                                               |
| Component as Selector | ✅                | 需要 [Babel 插件](https://emotion.sh/docs/@emotion/babel-plugin) |

一开始时我们使用的是 emotion 的方案，但在实际应用落地验证时，我们发现 emotion 的 styled 默认不支持组件作为选择器的写法，需要配置 babel 插件才能实现。 而我们最初的实现 re-export 了 `styled` 对象，这会使得 babel 插件的配置变得很复杂，大部分开发者可能都无法正确配置。

所以我们又尝试默认集成 `styled-components`, 但此时发现，如果要为了默认兼容组件选择器的写法来集成 styled-components，为此将需多付出压缩后 10 KB+ 大小的体积（对比 `@emotion/styled` ）。

| 集成 `styled-components` 的版本（[3.0.0-alpha.42](https://bundlephobia.com/package/antd-style@3.0.0-alpha.42)） | 集成 `@emotion/styled` 的版本（[3.0.0-alpha.41](https://bundlephobia.com/package/antd-style@3.0.0-alpha.41)） |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| ![](https://user-images.githubusercontent.com/28616219/233837788-a97688a7-db60-473e-94a9-5d43995a91a3.png)      | ![](https://user-images.githubusercontent.com/28616219/233837838-4156e64f-d05e-4317-9876-d57bcc757e97.png)    |

此外，在我们实际业务落地测试中发现，95% 的样式书写场景都不会用到组件选择器的语法。只有在需要动画、复合选择器等场景才会用到， 而在这种场景下 `createStyles` 的写法将会更加自然易用。

在我们看来，组件选择器的语法本质上是因为 styled 不支持创建 className 才不得已提供的补救措施。而为了这 5% 的使用场景再去额外增大 40% 的体积（10kb+），完全不划算。同时，在最终定稿的实现方案中也明确产出了 styled 的语法替换能力方案。详见：[createInstance-兼容 styled-components](/api/create-instance#兼容-styled-主题方案)。

因此综合实践案例，结合包体积、使用场景，我们在多次摇摆下最终选择了 `@emotion/styled` 作为 `styled` 语法的样式引擎。

:::info{title=特别说明}
虽然选择了 `@emotion/styled` 作为 styled 语法的样式引擎，但是 antd-style 并没有内置 `styled` 方法，而仅仅默认集成 `@emotion/react` 的 ThemeContext。详情可以查看：[与 styled 集成](/guide/styled)
:::

### css: 为什么选择 emotion

css 的语法候选池中也是上述两个库： `styled-component` 和 `emotion`。

在决策 css 方案时，基本上没有太多额外判断，我们直接采用了 emotion。原因是 styled-component 所提供的 `css` 方法无法直接转为 className 。因此在这方面 styled-components 的能力是缺失的。而 `css` props 我们已经在上一节中解释过，它不是我们期望的 api，因此 `css` 采用了 emotion 作为样式引擎。

| 特性           | Styled Components   | Emotion             |
| -------------- | ------------------- | ------------------- |
| css api        | ✅                  | ✅                  |
| css prop       | 需要配置 babel 插件 | 需要配置 jsx 运行时 |
| ClassNames     | 🛑                  | ✅                  |
| Global styles  | ✅                  | ✅                  |
| SSR            | ✅                  | ✅                  |
| Keyframe       | ✅                  | ✅                  |
| Object styles  | ✅                  | ✅                  |
| Dynamic styles | ✅                  | ✅                  |
