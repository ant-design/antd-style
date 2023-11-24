---
title: StyleProvider
description: Used for globally managing style insertion related configurations
order: 2
group: Container Components
demo:
  tocDepth: 4
---

## Modify container

Specify `container` to make all generated styles (antd, antd-style) inserted under this node.

<code src="../demos/StyleProvider/customContainer.tsx"></code>

## Modify style insertion point

In general, it is not often needed. If you need to be compatible with the requirement of component style override, you can consider setting the insertion point of the component style to insert it after this node.

<code src="../demos/StyleProvider/insertpoint.tsx"></code>

## Enable speedy mode

Enable emotion's speedy mode. It is recommended to be enabled for independent applications.

<code src="../demos/StyleProvider/speedy.tsx"></code>

:::info{title=Speedy Mode}

In the early cssinjs solutions, each style tag corresponded to one style, which was slow to parse but easy to modify and debug.

Currently, emotion defaults to using modern CSSOM api to insert styles, putting a bunch of css into a <style></style> tag and then removing the corresponding content after insertion. This method has good performance and supports inserting styles in the tens of thousands. However, it is not very compatible with micro frontends (qiankun).

By default, speedy mode is turned off in antd-style. If needed, set `speedy` to `true` to enable it.
:::

## API

Inherits from `ant-design/cssinjs` [StyleProvider](https://github.com/ant-design/cssinjs#styleprovider), other APIs are as follows:

| Property        | Type                                   | Description                                                                                           |
| --------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| prefix          | `string`                               | Emotion style prefix, default value is acss                                                           |
| nonce           | `string`                               | Random number used for CSP                                                                            |
| stylisPlugins   | `StylisPlugin[]`                       | Array of Stylis plugins                                                                               |
| container       | `Element`                              | Container for rendering styles                                                                        |
| speedy          | `boolean`                              | Whether to enable speedy mode, under speedy mode, real style will not be inserted, default is `false` |
| insertionPoint  | `HTMLElement`                          | Style insertion point, used to control the insertion position of the first style                      |
| getStyleManager | `(styleManager: StyleManager) => void` | Callback function to get the styleManager instance                                                    |
| children        | `ReactNode`                            | Child components                                                                                      |
