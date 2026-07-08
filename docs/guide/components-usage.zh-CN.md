---
title: 组件研发
order: 4
group: 进阶使用
demo:
  cols: 2
---

# 组件级研发方案

antd-style 的一开始使用对象是业务应用，因此在默认的设计上主要面向应用消费场景。但这并不代表着组件应用的研发不能使用 antd-style。antd-style 为组件级研发提供了解决方案，这里将介绍如何使用 antd-style 来研发组件。

## :where 选择器

结合 cssinjs 的 hash 选择器，我们可以让组件的样式始终处于在 hash 的范围之下，这可以保证组件样式不会对全局样式造成任何污染。

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

但是这样做也会带来一个问题 —— 组件的样式会被 hash 选择器抬升权重，此时用户要覆写样式就会变得很困难： 原本用户使用 `.my-btn` 就可以覆盖样式。但现在由于 `.css-abcd.my-btn` 的权重更高，因此用户如果只书写了 `.my-btn { color:green } ` ，这个覆盖样式是无法生效的。

那怎么办？此时 `:where()` 选择器登场了，它可以说是未来组件级 cssinjs 的一个核心基石。

> `:where()` 接受选择器列表作为它的参数，将会选择所有能被该选择器列表中任何一条规则选中的元素。 —— [:where —— MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:where)

来看下代码：

```less
:where(.css-abcd).my-btn {
  background: blue;
}

//上述代码在选择范围上等效于
.css-abcd.my-btn {
  background: blue;
}
```

局部选择器除了 where 以外， is 也是可以实现的。但 `:where()` 和 `:is()` 的不同之处，也是最重要的一点，在于 **`:where()` 的权重总是为 0**。 也就是说，利用 where 选择器，我们就可以实现 0 权重增加的情况下，为组件样式添加局部作用域，**同时组件仍然保留和原本一致的覆写便捷度**。

下述 demo 就是一组对比示例。上方一组是未使用 where 选择器的 demo，下方一组是使用 where 选择器的 demo，两组 demo 都在外部添加了同一组覆写样式。

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

## 开启 where 选择器

通过上述 demo 对比，大家就可以了解到 where 选择器对于组件级样式研发的重要性。而 antd-style 也为对组件研发提供了开启 where 选择器的能力。

在 `createStyles` 方法中，通过设置第二个入参 `options` 中的 `hashPriority: "low"` ，即可将这部分样式使用 where 选择器。

```ts
const useStyles = createStyles(getStyleFn, { hashPriority: 'low' });

// 该 useStyles 里的样式将都会使用 where 选择器
```

当然如果你不希望给每个 createStyles 设置一遍 `{ hashPriority: 'low' }`，可以继续往下阅读，了解如何为组件库设定一个自己的样式实例方法。

## 独立样式实例

其实，除了 `:where` 以外，组件研发的场景和应用研发的场景还有一些不同之处。比如：

- 需要在组件库层面定义一些自定义 token，并在组件中可以消费到默认值，而不是在每个组件内部手动包一层 Provider，或让用户在消费时包一层 Provider；
- 可能会希望让组件库的前缀可以默认变成自定义前缀；
- 同样希望组件库可以响应应用传入的主题配置；

这些场景，都可以通过 antd-style 提供的创建独立样式实例 `createInstance` 来实现。

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

在下方示例显示了自定义样式实例和自定义 token 默认值，并应用在组件 demo 的方案。

<code src="../demos/guide/component-usage/CustomInstance"></code>

`createInstance` 方法详细的 API 请查阅: [createInstance](/zh-CN/api/create-instance)。

## 最佳实践建议

在组件研发的场景下，我们建议你使用 `createInstance` 方法来创建一个独立的样式实例，这样可以让你的组件库更加独立可控。自定义 token 的消费使用也更加便捷。

针对从 less 迁移的部分，我们建议开启 `{ hashPriority: 'low' }` 配置，这样可以通过极小的迁移成本完成 cssinjs 的改造（详见：[组件代码迁移](/zh-CN/guide/migrate-less-component)）。

针对使用 cssinjs 完全新写的组件，我们建议仍然使用 `{ hashPriority: 'high' }` 配置。并将所有样式实现放置在 `css` 中，有需要的部分再额外添加 className。这样有两点好处：

1. **更灵活**：应用到组件的改造成本小，只需添加相应的 className，即可将应用样式变成组件样式；
2. **便于覆写**：保证组件样式的扁平化，便于使用组件的开发者覆写组件样式；
3. **研发心智模型统一**：组件库与应用的书写心智可以保持一致；
