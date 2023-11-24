---
title: Flashing Issue in Dark Mode
group:
  title: Theme Switching
  order: 2
---

## Flashing Issue in Dark Mode

When using antd-style, the initial screen is generally in light mode. This causes the interface to first display the light theme and then switch to the dark theme in dark mode. This gives users a "flashing" feeling, resulting in a poor experience. This type of problem is known as FOUC (Flash of Unstyled Content).

How to solve it?

This article assumes that you already understand the solutions for antd-style in SSG and SSR.

Principle analysis:

1. SSG generates light-colored HTML;
2. After JS hydration, cssinjs runs and re-generates dark class names and styles;

The root cause of FOUC is that the server does not know the client's current theme status.

Therefore, there are two solutions:

1. SSR: Make the server aware of the user client's theme status, for example, using query URLs, cookies, and other mechanisms;
2. Extract color variables as CSS variables;

### SSR Solution

Using next.js App Router as an example:

```tsx | pure
const RootLayout = ({ children }: PropsWithChildren) => {
  // Get the theme change situation from the cookie
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
