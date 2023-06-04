---
title: 简介
order: 0
nav:
  title: 快速上手
  order: 0
group:
  title: 基础知识
  order: 0
---

# 简介

`antd-style` 是基于 Ant Design V5 Token System 构建的业务级 css-in-js 解决方案，它基于 emotion 二次封装。

## 动机 | 为什么会有这个库

antd v5 已正式发布，通过 CSSinJS 的技术带来了无与伦比的主题自定义能力，这也是我们所认为的未来方向。但目前来看，无论是内部落地应用，还是社区的相关反馈，关于 antd v5 token 系统如何使用、less 怎么迁移、应用如何集成 cssinjs 等问题，都让应用开发者较开始使用 CSSinJS 的技术来书写样式。

antd 作为一个组件库，它的职责和边界只在于提供高品质的基础组件，应用层如何使用样式方案， antd 并不限制。开发者可以使用 less/sass、styled-component 等方案都没有任何问题。 但为了将 v5 的 token 系统的推行变得更加顺利，我们需要提供一个使用 antd token 系统的最佳实践，帮助应用开发者更低门槛在应用中集成 CSSinJS 技术方案，享受新技术所带来的 UX 和 DX 升级。

## 特性 | 它能干什么

它具备以下特性：

<Features></Feature>

## 它和 @ant-design/cssinjs 的区别是什么？

`@ant-design/cssinjs` 是实现 antd 组件库的一套 cssinjs 方案，它通过比较繁琐的写法换得了相比 styled-component 和 emotion 都要好很多的性能。详见：[组件级别的 CSS-in-JS](https://ant.design/docs/blog/css-in-js-cn)。但对应用和基于 antd 封装的组件库中，这种写法可能过于繁琐和复杂，且缺少消费 antd token 系统的能力。

所以 antd-style 的适用场景是业务应用和基于 antd 二次封装的组件库，它会提供这两个场景所需要的所有能力。
