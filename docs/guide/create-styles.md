---
title: 使用 createStyles
order: 2
group:
  title: 快速上手
  order: 0
---

# 使用 createStyles 类名组织样式

使用 `createStyles` 方法可以适用类名来组织样式，它更加接近 CSS Modules 的写法。

## 基础使用

```ts
import { createStyles, css } from 'antd-style';

const useStyles = createStyles(
  () => css`
    background: pink;
    padding: 24px;
  `,
);
```

## 结合 antd token 使用

```tsx | pure
import { createStyles, css } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  container: css`
    background-color: ${token.colorBgLayout};
    padding: 24px;
  `,
}));

const App = () => {
  const styles = useStyles();

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
