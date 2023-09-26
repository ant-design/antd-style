---
title: 暗色模式下首屏会 “闪” 一下
group:
  title: 主题切换
  order: 2
---

## 暗色模式下首屏会 “闪” 一下

在使用 antd-style 时，首屏一般是亮色的。这就会导致暗色模式下，用户的界面先显示亮色主题，再切换到暗色主题。用户感受上就是会 “闪” 一下，体验很差。这一类问题有一个专业术语叫做 FOUC 。

如何解决？

本文预设你已经了解了 antd-style 在 SSG、SSR 下的解决方案。

原理分析：

1. SSG 产出亮色 HTML；
2. JS 水合后 cssinjs 运行，重新生成暗色类名与样式；

FOUC 的根本原因是，服务端不知道客户端此时的主题状态。

因此解决思路有两种：

1. SSR：将用户客户端的主题状态让服务端可以感知，例如使用 query url、cookie 等机制；
2. 颜色变量抽取为 CSS 变量；

### SSR 解决方案

以 next.js App Router 为例：

```tsx | pure
const RootLayout = ({ children }: PropsWithChildren) => {
  // 从 cookie 中获取 主题变化情况
  const cookieStore = cookies();
  const appearance = cookieStore.get('theme');

  return (
    <html lang="en">
      <body>
        <StyleRegistry>
          <Layout defaultAppearance={appearance?.value}>{children}</Layout>
        </StyleRegistry>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
```

```tsx | pure
export interface AppThemeProps {
  children?: ReactNode;
  defaultAppearance?: ThemeAppearance;
}

const Layout = memo<AppThemeProps>(({ children, defaultAppearance }) => {
  console.log('server:appearance', defaultAppearance);

  return (
    <ThemeProvider
      defaultAppearance={defaultAppearance}
      onAppearanceChange={(appearance) => {
        document.cookie = `theme=${appearance};`;
      }}
      themeMode={themeMode}
    >
      {children}
    </ThemeProvider>
  );
});

export default Layout;
```
