---
title: 父子联动的样式书写
group:
  title: 样式书写
  order: 0
---

# 如何书写联动样式

有时候我们需要实现在 hover 容器组件的时候，修改 child 的样式。这种情况下，我们可以使用 cx 来生成 className。

## Demo

核心代码：

```ts
const useStyles = createStyles(({ css, cx }) => {
  // 1. 使用 cx 包裹 css，得到 (acss-xxx) 类名
  const child = cx(css`
    background: red;
    width: 100px;
    height: 100px;
  `);

  return {
    parent: css`
      cursor: pointer;

      &:hover {
        // 2. 实现级联
        .${child} {
          background: blue;
        }
      }
    `,
    // 3. 导出 child className
    child,
  };
});
```

<code src="./demos/NestElements.tsx"></code>

## 原理解析

思路上很简单，因此 `css` 方法产出的始终是[序列化样式对象](/api/create-styles#css)。用 `cx` 包裹 `css` 对象，就会将该对象转成类名 (`acss-xxxx`)。

## 相关讨论

- [[问题] 样式怎么嵌套呢](https://github.com/ant-design/antd-style/issues/54)
- [[BUG] 开启 babel-plugin-antd-style 插件后内部 cx 生成的类名和导出的不一致](https://github.com/ant-design/antd-style/issues/83)
