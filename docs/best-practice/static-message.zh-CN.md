---
title: antd 静态方法的主题失效
group: 主题定制
---

# Modal 、message 等 antd 的静态方法不响应主题，如何解决？

原先在 v4 中可以在非组件环境下使用这些静态方法，比如放在 axios 里面用 `message.error` 做一些报错的提示。

现在 V5 版本里，需要用 `const { message } = App.useApp();`

是不是意味着无法再像以前那样用了？

## 解决方案

当然不是，参考下方 Demo，通过在独立文件中定义相应的实例变量，即可在非 React 环境下使用，并且仍然响应主题。

<code src="./demos/StaticMethod/index.tsx"></code>

## 原理解析

antd-style 在 `ThemeProvider` 中提供了一个 [`getStaticInstance`](/zh-CN/api/theme-provider#消费静态实例方法) 接口，用户可以从中获取集成后的实例。

该方法的实现原理也很简单，以 message 为例：

```tsx | pure
import { message } from 'antd';

const Provider = ({ getStaticInstance, children, theme }) => {
  // 1. 使用 useMessage 获取实例
  const [messageInstance, messageContextHolder] = message.useMessage(staticInstanceConfig?.message);

  useEffect(() => {
    // 3. 将实例用 getStaticInstance 抛出
    getStaticInstance?.({
      message: messageInstance,
    });
  }, []);

  return (
    <ConfigProvider theme={theme}>
      {/* 2. 插入 message 的上下文 */}
      {messageContextHolder}
      {children}
    </ConfigProvider>
  );
};
```
