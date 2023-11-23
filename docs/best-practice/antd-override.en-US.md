---
title: Customizing Ant Design Component Styles
group: Theme Customization
---

# How to elegantly override Ant Design component styles?

## Customization based on ConfigProvider

In V5, Ant Design provides a brand new `theme` property for customization. Therefore, if you need to customize component styles, it is recommended to use the `theme` field on the ConfigProvider as a priority.

The demo example is as follows:

<code src="./demos/ConfigProviderOverride.tsx"></code>

:::info
For more customization capabilities based on ConfigProvider, please refer to [Discussing the Theme of Ant Design V5 (Part 1): Creative Use of CSSinJS Dynamic Themes](https://www.yuque.com/antfe/featured/durxuu94nvgvgmzq#vFlnd).
:::

The ThemeProvider of antd-style is a business-layer encapsulation based on ConfigProvider, providing user-friendly customization capabilities. See: [Custom Theme](/guide/custom-theme)

## Basic Overrides

The `createStyles` method has a `prefixCls` parameter. By using this parameter, you can pass in the prefix of the component, so that any style overrides can automatically change with the change of `prefixCls`.

<code src="./demos/DefaultOverride"></code>

## Increasing Specificity for Overrides

In some components, directly adding a class name may not have enough specificity to override the styles. In this case, you can use the `&` symbol to increase the specificity accordingly.

<code src="./demos/OverrideWeight"></code>

## Overrides for Multiple classNames Scenarios

classNames is a major feature of antd V5: [\[RFC\] Semantic DOM Structure for all Components](https://github.com/ant-design/ant-design/discussions/40221).
In the past, when defining styles, we needed to find many DOM nodes for extensive style overrides. However, during the upgrade process of antd, sometimes the DOM structure may be adjusted. As a result, our overridden styles may encounter issues.

With classNames, it will provide us with a stable DOM structure API. We can pass in the class names through classNames, which will point to the corresponding DOM nodes, thereby greatly reducing the risk of Breaking Changes caused by DOM changes. It also eliminates the need for us to hackishly search for style class names.

<code src="./demos/InputclassNames.tsx"></code>

## Related Discussions

- [Style Specificity Issues](https://github.com/ant-design/antd-style/issues/24)
