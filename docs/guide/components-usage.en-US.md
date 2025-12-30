---
title: Component Development
order: 4
group: Advanced Usage
demo:
  cols: 2
---

# Component-Level Development Solution

The initial use case of antd-style was for business applications, so the default design is mainly oriented towards application consumption scenarios. However, this does not mean that component development cannot use antd-style. antd-style provides a solution for component-level development, and here we will introduce how to use antd-style for component development.

## :where Selector

By combining the hash selector of cssinjs, we can ensure that the styles of the component always remain within the scope of the hash, which ensures that the component styles do not contaminate the global styles.

```less
// style-1
.css-abcd.my-btn {
  background: blue;
}
// style-2
.css-dcba.my-btn {
  background: red;
}
```

```jsx | pure
<button className="my-btn css-abcd">click</button> // -> blue background
<button className="my-btn css-dcba">click</button> // -> red background
```

However, this approach also brings a problem - the styles of the component will be elevated by the hash selector, making it difficult for users to override the styles: originally, users could override the styles by using `.my-btn`. But now, because the weight of `.css-abcd.my-btn` is higher, if the user only writes `.my-btn { color:green }`, this override style will not take effect.

So what to do? This is where the `:where()` selector comes in. It can be said to be a cornerstone of future component-level cssinjs.

> `:where()` takes a selector list as its argument and selects all elements that can be selected by any rule in the selector list. - [:where —— MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:where)

Let's take a look at the code:

```less
:where(.css-abcd).my-btn {
  background: blue;
}

// The above code is equivalent to the selection scope
.css-abcd.my-btn {
  background: blue;
}
```

In addition to `where`, it is also possible to achieve local selectors with `is`. However, the main difference between `:where()` and `:is()` is that **`:where()` always has a weight of 0**. In other words, using the where selector, we can add local scope to the component styles with a weight of 0, **while still maintaining the same convenience of overriding styles for the components**.

The following demo is a set of comparison examples. The upper set is a demo without using the where selector, and the lower set is a demo using the where selector. Both sets of demos have the same set of override styles added externally.

```css
.my-btn {
  background: darkgreen;
  color: white;
}

.my-btn-primary {
  background: springgreen;
  color: green;
}
```

<code src="../demos/guide/component-usage/demo"></code>

## Enabling the where Selector

Through the comparison demo above, you can understand the importance of the where selector for component-level style development. antd-style also provides the ability to enable the where selector for component development.

In the `createStyles` method, by setting the second parameter `options` in `hashPriority: "low"`, this part of the styles can be used with the where selector.

```ts
const useStyles = createStyles(getStyleFn, { hashPriority: 'low' });

// The styles in this useStyles will all use the where selector
```

Of course, if you do not want to set `{ hashPriority: 'low' }` for each createStyles, you can continue reading to learn how to set a custom style instance method for the component library.

## Independent Style Instance

In addition to `:where`, there are some differences between the scenarios of component development and application development. For example:

- You need to define some custom tokens at the component library level, and the components can consume the default values, rather than manually wrapping a Provider in each component, or requiring users to wrap a Provider when consuming;
- You may want the default prefix of the component library to be customizable;
- Also, you may want the component library to respond to the theme configuration passed in by the application;

These scenarios can be achieved using the `createInstance` provided by antd-style to create an independent style instance.

```ts
import { createInstance } from 'antd-style';

interface ForDemoToken {
  primaryColor: string;
  demoBgColor: string;
}

export const { createStyles, ThemeProvider } = createInstance<ForDemoToken>({
  key: 'css',
  hashPriority: 'low',
  customToken: {
    primaryColor: '#ce1472',
    demoBgColor: '#f1f2f5',
  },
  prefixCls: 'for-demo',
});
```

The following example shows the custom style instance and default custom token values, and how they are applied in the component demo.

<code src="../demos/guide/component-usage/CustomInstance"></code>

For detailed API of the `createInstance` method, please refer to: [createInstance](/api/create-instance).

## Best Practice Recommendations

In the scenario of component development, we recommend using the `createInstance` method to create an independent style instance for your component library, which can make your component library more independent and controllable. The consumption of custom tokens is also more convenient.

For the parts migrated from less, we recommend enabling the `{ hashPriority: 'low' }` configuration, so that the transformation to cssinjs can be completed with minimal migration cost (see: [Component Code Migration](/guide/migrate-less-component)).

For components completely written using cssinjs, we recommend still using the `{ hashPriority: 'high' }` configuration. And place all style implementations in `css`, with additional className for the parts that need it. This has two advantages:

1. **More flexible**: The cost of transforming the application to the component is small, and only the corresponding className needs to be added to turn the application style into the component style;
2. **Easy to override**: Ensure the flatness of the component styles, making it easier for developers using the components to override the component styles;
3. **Unified development mental model**: The writing mindset of the component library and the application can remain consistent;
