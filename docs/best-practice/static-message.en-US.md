---
title: Failure of antd Static Methods to Respond to Themes
group: Theme Customization
---

# How to Resolve the Issue of antd Static Methods such as Modal and message Not Responding to Themes?

In the past, in version 4, these static methods could be used in non-component environments, such as using `message.error` in axios to display error messages.

Now, in version 5, it is necessary to use `const { message } = App.useApp();`.

Does this mean that we can no longer use them as before?

## Solution

Of course not. Refer to the demo below. By defining the corresponding instance variables in a separate file, you can still use them in non-React environments and they will still respond to themes.

<code src="./demos/StaticMethod/index.tsx"></code>

## Principle Analysis

antd-style provides a [`getStaticInstance`](api/theme-provider#consume-static-instance-method) interface in the `ThemeProvider`, from which users can obtain the integrated instance.

The implementation principle of this method is also simple. Taking message as an example:

```tsx | pure
import { message } from 'antd';

const Provider = ({ getStaticInstance, children, theme }) => {
  // 1. Use useMessage to obtain the instance
  const [messageInstance, messageContextHolder] = message.useMessage(staticInstanceConfig?.message);

  useEffect(() => {
    // 3. Use getStaticInstance to expose the instance
    getStaticInstance?.({
      message: messageInstance,
    });
  }, []);

  return (
    <ConfigProvider theme={theme}>
      {/* 2. Insert the context of message */}
      {messageContextHolder}
      {children}
    </ConfigProvider>
  );
};
```
