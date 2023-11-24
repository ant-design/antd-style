---
title: Introduction
order: 0
nav:
  title: Quick Start
  order: 0
group:
  title: Basic Knowledge
  order: 0
---

# Introduction

`antd-style` is a business-level css-in-js solution built on the Ant Design V5 Token System, and it is based on the secondary encapsulation of emotion.

## Motivation | Why this library exists

Antd v5 has been officially released, bringing unparalleled theme customization capabilities through the CSSinJS technology, which we believe is the future direction. However, at present, both internal application landing and community feedback on how to use the antd v5 token system, how to migrate from less, and how to integrate cssinjs into applications have made it difficult for application developers to start using the CSSinJS technology to write styles.

As a component library, antd's responsibility and boundary are only to provide high-quality basic components, and it does not restrict how the application layer uses style solutions. Developers can use less/sass, styled-component, and other solutions without any problems. However, in order to make the promotion of the v5 token system smoother, we need to provide a best practice for using the antd token system, helping application developers to integrate the CSSinJS technology solution into applications with lower thresholds, and enjoy the UX and DX upgrades brought by new technologies.

## Features | What it can do

It has the following features:

<Features></Feature>

## What is the difference between it and @ant-design/cssinjs?

`@ant-design/cssinjs` is a cssinjs solution for implementing the antd component library. It achieves much better performance compared to styled-component and emotion through a more cumbersome syntax. See: [Component-level CSS-in-JS](https://ant.design/docs/blog/css-in-js-cn). However, for applications and component libraries based on antd, this syntax may be too cumbersome and complex, and lacks the ability to consume the antd token system.

Therefore, the applicable scenarios for antd-style are business applications and component libraries based on antd secondary encapsulation, providing all the capabilities needed for these two scenarios.
