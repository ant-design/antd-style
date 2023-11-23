---
title: 🚧 createStylish
order: 10
group:
  title: 创建样式
  order: 0
---

## 简介

对于一般的样式诉求，通过 [createStyles](/usage/create-styles) 就可以基本满足，`createStylish` 属于进阶用法。

在一个复杂的业务系统中，可能会存在一些通用的样式，这些样式颗粒度更细，并不足以形成一个组件。但是如果每次都重复书写即耗费精力，又会有很多重复的代码，一旦设计师要求统一调整设计风格，多次修改的成本极高。为了解决这个问题，`createStylish` 应运而生。

`createStylish` 可以创建一个可以被复用的的样式。它在理念上会和近年来比较流行的 tailwindcss 比较接近，但是具有更加好的灵活度和实用性。 同时结合 Ant Design V5 Token System，能达到非常高效与灵活的使用体验。

:::success{title=适用场景}
用于批量组织可复用样式。
:::

## 典型示例

<code src="../demos/createStylish/default.tsx"></code>

## 详细介绍

## API
