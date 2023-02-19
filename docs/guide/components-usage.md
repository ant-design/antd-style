---
title: 组件研发
order: 4
group: 进阶使用
demo:
  cols: 2
---

# 组件级研发方案

antd-style 的一开始使用对象是业务应用，因此在默认的设计上主要面向应用消费场景。但这并不代表着组件应用的研发不能使用 antd-style。antd-style 也提供了组件级研发的方案，这里将介绍如何使用 antd-style 来研发组件。

## :where 选择器

结合 cssinjs 的 hash 选择器，我们可以让组件的样式始终处于在 hash 的范围之下，这可以保证组件样式不会对全局样式造成任何污染。

```less
// style-1
.css-abcd .ant-btn {
  background: blue;
}
// style-2
.css-dcba .ant-btn {
  background: red;
}
```

```jsx | pure
<button className="ant-btn css-abcd">click</button> // -> blue background
<button className="ant-btn css-dcba">click</button> // -> red background
```

但是这样做也会带来一个问题：组件的样式会被 hash 的选择器权重抬升，覆写会变得很困难。当用户需要使用 `.ant-btn` 覆盖样式时，由于 `.css-abcd .ant-btn` 的权重更高，因此用户的覆盖样式 `.ant-btn` 基本上是无法生效的。

所以 `:where()` 选择器登场了，它可以说是组件级 cssinjs 的一个核心基石。`:where()` 接受选择器列表作为它的参数，将会选择所有能被该选择器列表中任何一条规则选中的元素。

```less
:where(.css-abcd) .ant-btn {
  background: blue;
}

//上述代码在选择范围上等效于
.css-abcd .ant-btn {
  background: blue;
}
```

当然，局部选择器除了 where 以外， is 也是可以实现的。但 `:where()` 和 `:is()` 的不同之处，也是最重要的一点，在于 **`:where()` 的权重总是为 0**。

也就是说，利用 where 选择器，我们就可以实现 0 权重增加的情况下，为组件样式添加局部作用域。这也意味着此时组件仍然保留和原本一致的覆写能力。

下述 demo 就是一组对比示例。上方一组是未使用 where 选择器的 demo，下方一组是使用 whrere 选择器的 demo，两组 demo 都在外部添加了同一个覆写样式。

<code src="../demos/guide/component-usage/demo"></code>

## 开启 where 选择器

通过上述 demo 对比，应该就能非常直观地感受到 where 选择器对于组件级研发的重要性。那 antd-style 如何针对组件研发开启 where 选择器呢？

`antd-style` 默认提供的 `createStyles` 方法中，通过设置第二个入参 `options` 中的 `hashPriority: "low"` ，即可将这部分样式开启 where 选择器，在插入时将默认集成 where 选择器。

```ts
const useStyles = createStyles(getStyleFn, { hashPriority: 'low' });

// useStyles 里的样式将都会使用 where 选择器
```

当然如果你不希望给每个 createStyles 设置一遍 `{ hashPriority: 'low' }`，你可以往下阅读，了解如何为组件库设定一个自己的样式方法。

## 独立样式方案

其实，除了 where 以外，组件研发的场景和应用研发的场景还有一些不同之处。比如：

- 需要在组件库层面定义一些自定义 token，并在组件中可以消费到默认值，而不是在每个组件内部手动包一层 Provider，或让用户在消费时包一层 Provider；
- 可能会希望让组件库的前缀可以默认变成自定义的前缀；
- 同样希望组件库可以响应应用传入的主题配置；

这些场景，都可以通过 antd-style 提供的创建独立样式方法 `createInstance` 来实现。

```ts
import { createInstance } from 'antd-style';

interface ForDemoToken {
  primaryColor: string;
  demoBgColor: string;
}

export const { createStyles, ThemeProvider } = createInstance<ForDemoToken>({
  key: 'css',
  hashPriority: 'low',
  defaultCustomToken: {
    primaryColor: '#ce1472',
    demoBgColor: '#f1f2f5',
  },
  prefixCls: 'for-demo',
});
```

在下方示例显示了自定义样式实例和自定义 token 默认值，并应用在组件 demo 的方案。

<code src="../demos/guide/component-usage/CustomInstance"></code>

`createInstance` 方法详细的 API 请查阅: [createInstance](/api/create-instance)。

## 最佳实践建议

在组件研发的场景下，我们建议你使用 `createInstance` 方法来创建一个独立的样式实例，这样可以让你的组件库更加独立可控。自定义 token 的消费使用也更加便捷。

针对从 less 迁移的部分，我们建议开启 `{ hashPriority: 'low' }` 配置，这样可以通过极小的迁移成本完成 cssinjs 的改造（详见：[组件代码迁移](/guide/migrate-less-component)）。

针对使用 cssinjs 完全新写的组件，我们建议仍然使用 `{ hashPriority: 'high' }` 配置。并将所有样式实现放置在 `css` 中，有需要的部分再额外添加 className。这样有两点好处：

1. **更灵活**：应用到组件的改造成本小，只需添加相应的 className，即可将应用样式变成组件样式；
2. **便于覆写**：保证组件样式的扁平化，便于外部用户进行组件样式的覆写；
3. **研发心智模型统一**：组件库与应用的书写心智可以保持一样；
