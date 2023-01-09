---
title: 样式创建
order: 1
group:
  title: 快速上手
  order: 0
---

# 使用 createStyles 类名组织样式

antd-style 提供的核心 api 就是使用 `createStyles` 方法可以适用类名来组织样式，它更加接近 CSS Modules 的写法。

:::success{title=默认推荐}
这是 antd-style 第一推荐的使用方式。应用样式书写或者对基础组件做样式覆写，都可以使用这种写法。
:::

## 典型示例

一个包含基础用法的 demo 示例，看懂了这个 demo 就会使用 `createStyles` 方法了。

<code src="../demos/createStyles/default.tsx"></code>

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
