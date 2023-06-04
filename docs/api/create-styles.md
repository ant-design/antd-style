---
title: createStyles
description: 创建具有作用域的样式
order: 1
sourceUrl: '{github}/blob/master/src/factories/createStyles/index.ts'
group:
  title: 创建样式
  order: 0
---

## 简介

使用 `createStyles` 可以创建具有作用域的的样式。书写能力上和 DX 基本与 CSS Modules 齐平。并在动态主题写法更方便，能力更强。

:::success{title=默认推荐}
这是第一推荐的使用方式。应用样式书写，或者对基础组件做样式覆写，都可以默认采用这种写法。
:::

## 结合自定义 token 使用

```tsx | pure
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    background-color: ${token.colorBgLayout};
    padding: 24px;
  `,
}));

const App = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <Space>
        <Button title={'功能按钮的说明'} icon={<SmileOutlined />} />
        操作按钮
      </Space>
    </div>
  );
};
```

实例演示：

<code src="../demos/createStyles/AntdToken.tsx"></code>

入参函数的签名：

```ts | pure
type GetCssStyleFn = (theme: CreateStylesTheme, props?: Props) => StyleInput;

interface CreateStylesTheme {
  token: AntdToken | CustomToken;
}
```
