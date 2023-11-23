---
title: SSR Integration
order: 1
group: Advanced Usage
---

# SSR Integration

SSR (Server-side rendering) refers to the direct output of dynamically generated HTML to the browser on the server side in order to improve the initial loading speed of the page and SEO optimization. For SSR scenarios, antd-style provides a dedicated method to extract antd components and antd-style styles statically, thereby improving the rendering speed and performance of the page. The following is a guide on using antd-style in SSR:

## Integration in Next.js

### Page Router

In Next.js server-side rendering, you need to use the `extractStaticStyle` method in the `getInitialProps` method of the component to extract static styles and add them to the page's head. The specific usage is as follows:

```tsx | pure
// pages/_document.tsx
import { extractStaticStyle, StyleProvider } from 'antd-style';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    // Insert StyleProvider for rendering
    const page = await ctx.renderPage({
      enhanceApp: (App) => (props) =>
        (
          <StyleProvider cache={extractStaticStyle.cache}>
            <App {...props} />
          </StyleProvider>
        ),
    });

    // Get static styles of the page one by one
    const styles = extractStaticStyle(page.html).map((item) => item.style);

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>{this.props.styles}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

#### 1. Import and wrap the StyleProvider component, and wrap it around the component that needs to extract static styles:

Pass the `enhanceApp` parameter to the `renderPage` method. `enhanceApp` is a function used to enhance the App component. Here, we wrap the App component in the StyleProvider component to extract static styles.

```tsx | pure
import { extractStaticStyle, StyleProvider } from 'antd-style';

const page = await ctx.renderPage({
  enhanceApp: (App) => (props) =>
    (
      <StyleProvider cache={extractStaticStyle.cache}>
        <App {...props} />
      </StyleProvider>
    ),
});
```

Here, the `cache` field mounts the `@ant-design/cssinjs` cache object.

#### 2. Use the `extractStaticStyle` method to extract static styles

Call the `renderPage` method to get the rendered page content, and use the `extractStaticStyle` method to extract the static styles from it.

```tsx | pure
// Extract page content styles
const styleArr = extractStaticStyle(page.html);
```

The styles extracted by the `extractStaticStyle` method is an array, which includes the style objects of antd and antd-style. The structure of each style object is as follows:

| Property | Type          | Description                                                                                   |
| -------- | ------------- | --------------------------------------------------------------------------------------------- |
| key      | `string`      | Key value, the key of antd style is `antd`, and the default key of antd-style style is `acss` |
| style    | `JSX.Element` | Style element, represented using the JSX.Element type                                         |
| css      | `string`      | Corresponding CSS string                                                                      |
| ids      | `string[]`    | Array of element IDs to which the style is applied                                            |
| tag      | `string`      | CSS string with `<style>` tag                                                                 |

#### 3. Add the extracted styles to the page's head

Since Next.js requires directly inserting `<style>` style elements, we can extract the `style` style elements from the array of style objects obtained from `extractStaticStyle` and add them to the page's head.

```tsx | pure
const styles = extractStaticStyle(page.html).map((item) => item.style);

return {
  styles: <>{styles}</>,
};
```

### App Router

:::info
Requires antd-style version 3.5.0 or above
:::

[App Router](https://nextjs.org/docs/app) is a fully-fledged application mode introduced in Next.js version 13.4. antd-style also supports this mode. The integration method is as follows:

Create a `StyleRegistry.tsx` component to collect and insert the extracted static styles into the HTML:

```tsx | pure
'use client';

import { StyleProvider, extractStaticStyle } from 'antd-style';
import { useServerInsertedHTML } from 'next/navigation';
import { PropsWithChildren, useRef } from 'react';

const StyleRegistry = ({ children }: PropsWithChildren) => {
  const isInsert = useRef(false);

  useServerInsertedHTML(() => {
    // Avoid inserting styles repeatedly when rendering multiple times
    // refs: https://github.com/vercel/next.js/discussions/49354#discussioncomment-6279917
    if (isInsert.current) return;

    isInsert.current = true;

    const styles = extractStaticStyle().map((item) => item.style);

    return <>{styles}</>;
  });

  return <StyleProvider cache={extractStaticStyle.cache}>{children}</StyleProvider>;
};

export default StyleRegistry;
```

Import this component in `app/layout.tsx`:

```tsx | pure
import StyleRegistry from './StyleRegistry';

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body>
      <StyleRegistry>{children}</StyleRegistry>
    </body>
  </html>
);
```

:::warning
Due to the lack of a hook to get the HTML in Next.js's App Router, `extractStaticStyle` cannot analyze the styles used in the current application, which means it lacks TreeShaking capability. Therefore, the styles introduced by App Router will be larger in size compared to Page Router.
:::

## Integration with dumi

In this example, the styles are extracted to a CSS static file and then imported into the HTML.

### 1. Wrap StyledProvider in the global Layout

Wrap StyledProvider in the global Layout of umi, and define a global cache variable to cache antd styles:

```tsx | pure
import { extractStaticStyle, StyleProvider } from 'antd-style';

// PS: Due to the lack of a _document.tsx file similar to Next.js in umijs, the cache can only be passed globally by defining a variable
global.__ANTD_CACHE__ = extractStaticStyle.cache;

export default ({ children }) => {
  return <StyleProvider cache={extractStaticStyle.cache}>{children}</StyleProvider>;
};
```

### 2. Use the extractStaticStyle method to extract styles to a separate file

In the server-side rendering related files of umi (e.g., `plugin.ts`), use the `extractStaticStyle` method to extract styles to a separate file:

```ts
import { extractStaticStyle } from 'antd-style';

const SSRPlugin = (api: IApi) => {
  // When umi needs to output HTML files, modify the HTML file content to integrate the SSR style content
  api.modifyExportHTMLFiles((files) =>
    files
      // exclude dynamic route path, to avoid deploy failed by `:id` directory
      .filter((f) => !f.path.includes(':'))

      .map((file) => {
        const antdCache = (global as any).__ANTD_CACHE__;

        // 1. Extract antd-style styles
        const styles = extractStaticStyle(file.content, { antdCache });

        // 2. Extract each style to a separate CSS file
        styles.forEach((item) => {
          // 2.1 Write CSS file
          const cssFile = writeCSSFile(item.key, item.ids.join(''), item.css);

          // 2.2 Add CSS file link to head
          file.content = addLinkStyle(file.content, cssFile);
        });
        return file;
      }),
  );
};

export default SSRPlugin;
```

:::info{title=Reference Example}
dumi-theme-antd-style: <https://github.com/arvinxx/dumi-theme-antd-style/blob/master/src/plugin/index.ts>
:::

## Related API

extractStaticStyle
