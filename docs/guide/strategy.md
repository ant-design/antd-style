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

## 样式引擎与样式应用

基于上述两大基本假设，我们可以抽象出两层目标不同的东西：

1. **样式引擎**: 在 CSSinJS 世界中提供样式写法的底层样式库，例如 styled-component、emotion、goober、linaria 等都属于此类；
2. **样式应用**: 为业务应用中提供最佳实践的方案，它可能是个库，也可能只是一种思想。例如 CSS Modules、BEM 、Tailwind CSS。 antd-style 则属于此类。

如果我们拿传统 CSS 世界来类比，那么样式引擎等同于 LESS、SASS、PostCSS 这样的 CSS 预处理语言/库。而样式应用则是 CSS Modules、BEM 这样的东西。不同的样式应用通过各自不同的思想，为开发者提供一种各自统一的样式写法，帮助开发者解决书写样式中的各种问题。

样式引擎的目标在于为开发者提供各种强大的能力，为样式书写提供新的可能性，它的趋向性是扩张的。 而样式应用的目标是为开发者提供统一简洁的样式解决方案，它的趋向性是收敛的。因此不能将两者混为一谈，切割干净后会就会非常清晰。

## antd-style 的定位与目标

因此 `antd-style` 的定位是非常清晰的：它是一个 `样式应用` 库，为 antd 的开发者用户提供一套具有确定性的样式书写方案，并在绝大部分样式书写场景都提供了最佳实践的方案：包括但不限：1）应用样式、2）组件样式、3）less 迁移、4）响应式、4）动态主题、5）自定义主题、6）token 扩展、7）与设计协同）等等。

所以，antd-style 会在社区优秀的 cssinjs 样式引擎上层封装出一套 api，为应用开发者、组件开发者提供更加易写、性能更优的语法。甚至我们会希望未来，antd-style 可以与某个具体的样式引擎脱钩。譬如 静态化编译方案 或 Atomtic CSSinJS 成熟，我们将样式引擎替换为新的库，antd-style 的用户无需任何感知便可直接获得原子化样式的能力。

## 当前 antd-style 选择的样式引擎

基于目前的社区方案发展情况，我们选择了 `styled-component` 作为 `styled` 语法的样式引擎，选择了 `emotion` 作为 `css` 语法的样式引擎。决策原因如下：

### styled: 为什么选择 styled-component

styled 的语法候选池中有两个库： `styled-component` 和 `emotion`。一开始时我们使用的是 emotion 的方案，但在实际应用落地验证时，我们发现 emotion 的 styled 默认不支持组件作为选择器的写法，需要配置 babel 插件才可达成，而我们一旦 re-export 了 styled 对象，babel 插件的配置将会变得很复杂，大部分开发者可能都无法正确配置。

因此在 styled 写法上最终选择了 styled-component，为此我们将需多付出 Gzip 后 10 KB+ 大小的体积（对比 emotion/styled ）。

对比如下：

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

### css: 为什么选择 emotion

css 的语法候选池中也是上述两个库： `styled-component` 和 `emotion`。

在决策 css 方案时，基本上没有太多额外判断，我们直接才采用了 emotion。原因是 styled-component 所提供的 `css` 方法无法直接转为 className 因此在转为 className 方面 styled-component 的能力是缺失的。而 `css` props 我们已经在上一节中解释过，它不是我们期望的 api。因此 `css` 采用了 emotion 作为样式引擎。

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

## 体积优化

由于 antd-style 同时采用了 styled-component 和 emotion，它的体积势必会比单一库更大。

![](https://mdn.alipayobjects.com/huamei_rqvucu/afts/img/A*uuRsQKLILmIAAAAAAAAAAAAADoN6AQ/fmt.webp)
因此在实际使用中，我们建议采用 `styled` 或 `css` 中的一种写法，而不是两种写法混着写。如果不使用相应的方法，打包器能自动 TreeShaking 掉没有用到的方法。实测体积可以降到个位数 kb。
