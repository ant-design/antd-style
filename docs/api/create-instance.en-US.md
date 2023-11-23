---
title: createInstance
description: Method for creating style instances
sourceUrl: '{github}/blob/master/src/functions/createInstance.ts'
group:
  title: Advanced Settings
  order: 10
---

## Introduction

The `createInstance` method can be used to create another set of style instance methods. This method is basically unnecessary for applying style schemes, but it is essential for component development scenarios.

## Creating Style Instances

Create your own style instance for the component, so that when using the component library, you can automatically obtain a set of style methods with default values configured.

```ts | pure
import { createInstance } from 'antd-style';

interface DefaultToken {
  accessColor: string;
}

const styleInstance = createInstance<DefaultToken>({
  // **** Style Generation Related **** //

  key: 'abc', // Set the prefix for generating hash class names, the result will be .abc-xxxx
  speedy: false, // Currently, the default cssom insertion method in the cssinjs solution is not very compatible with qiankun micro-apps, so it is recommended to disable it
  hashPriority: 'low', // Set the style selector that generates hash to :where selector to reduce weight. This allows user-defined styles to override component styles

  // ***** Theme Related ***** //
  // Configure the props passed to the ThemeProvider by default, and this Provider can also be overridden by external props
  // The configured value will also become the default value consumed by related methods, so there is no need to wrap ThemeProvider to consume the default value

  prefixCls: 'tna', // Set the class name prefix for antd components, for example, the type of Button will be .tna-btn
  customToken: {
    accessColor: '#12388f',
  },
});

export const {
  // **** Core Style Methods **** //
  createStyles,
  createStylish,
  createGlobalStyle,

  // **** Basic Style Methods **** //
  cx,
  css,
  keyframes,
  injectGlobal,

  //**** Style Sheet Management  **** //
  styleManager,

  // **** Data Container   **** //
  useTheme,
  StyleProvider,
  ThemeProvider,
} = styleInstance;
```

## Specify Container

Specifying a container during creation can ensure that styles are inserted at that container, which is useful in scenarios such as iframes.

```ts
const { css, StyleProvider, createStyles } = createInstance({
  key: 'test',
  container: document.body,
});
```

<code src="../demos/api/createInstance/withContainer.tsx"></code>

If you define styles with `createStyles` exposed by `createInstance` in a component library, and then want to specify different insertion positions in different business scenarios.

Then, when using in the business application, wrap a layer of `StyleProvider` externally and set `container` to achieve custom insertion positions.

<code src="../demos/api/createInstance/withStyleProviderContainer.tsx"></code>

## Compatible with styled Themes

If you use `styled-component` and need to respond to theme changes, you need to wrap a `ThemeProvider` outside the component. At this time, if your component also needs to respond to theme changes, you need to wrap another `ThemeProvider` inside the component. By passing the `styled` configuration to createInstance, you can make the component styled with `styled` respond to custom Tokens.

```ts | pure
// styled-components version
import { createInstance } from 'antd-style';
import { ThemeContext } from 'styled-components';

const componentStyleIntanceWithSC = createInstance({
  // ...
  styled: { ThemeContext },
});
```

## API

| Property Name | Type                                      | Description                                        |
| ------------- | ----------------------------------------- | -------------------------------------------------- |
| key           | `string`                                  | The generated CSS keyword, default is `ant-css`.   |
| prefixCls     | `string`                                  | Default component prefix.                          |
| speedy        | `boolean`                                 | Whether to enable speedy mode, default is `false`. |
| container     | `Node`                                    | Rendering container node.                          |
| customToken   | `T`                                       | Default custom Token.                              |
| hashPriority  | `HashPriority`                            | Control the priority of CSS class name generation. |
| ThemeProvider | `Omit<ThemeProviderProps<T>, 'children'>` | Theme provider.                                    |
| styled        | `StyledConfig`                            | `styled-components` configuration.                 |
