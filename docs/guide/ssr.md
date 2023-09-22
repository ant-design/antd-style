---
title: SSR 集成
order: 1
group: 进阶使用
---

# 集成 SSR

SSR（Server-side rendering）是指在服务器端将动态生成的 HTML 直接输出到浏览器，以提高页面的首次加载速度和 SEO 优化。 antd-style 针对 SSR 场景提供了专门的方法，将 antd 组件与 antd-style 样式做静态抽取，从而提高页面的渲染速度和性能。以下是在 SSR 中使用 antd-style 的指南：

## 在 Next.js 中集成

### Page Router

在 Next.js 的服务端渲染中，需要在组件的 getInitialProps 方法中使用 extractStaticStyle 提取静态样式，并将其添加到页面的 head 中。 具体使用示例如下：

```tsx | pure
// pages/_document.tsx
import { extractStaticStyle, StyleProvider } from 'antd-style';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    // 插入 StyleProvider 进行渲染
    const page = await ctx.renderPage({
      enhanceApp: (App) => (props) =>
        (
          <StyleProvider cache={extractStaticStyle.cache}>
            <App {...props} />
          </StyleProvider>
        ),
    });

    // 逐一获取页面的静态样式
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

#### 1. 引入并包裹 StyleProvider 组件，并将其包裹在需要提取静态样式的组件外层：

将 enhanceApp 参数传入 renderPage 方法。enhanceApp 是一个函数，用于对 App 组件进行增强，这里我们将 App 组件包裹在 StyleProvider 组件中，以便提取静态样式。

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

其中，`cache` 字段挂载的是 `@ant-design/cssinjs` 的 cache 对象。

#### 2. 使用 `extractStaticStyle` 方法提取静态样式

调用 renderPage 方法得到渲染后的页面内容，并使用 `extractStaticStyle` 方法提取出其中的静态样式。

```tsx | pure
// 提取页面内容样式
const styleArr = extractStaticStyle(page.html);
```

`extractStaticStyle` 方法抽取后的样式是一个数组，包含了 antd 的样式对象与 antd-style 的样式对象。每项样式对象的结构如下：

| 属性名称 | 类型          | 描述                                                               |
| -------- | ------------- | ------------------------------------------------------------------ |
| key      | `string`      | 键值，antd 样式 key 为 `antd`，antd-style 的样式 key 默认为 `acss` |
| style    | `JSX.Element` | 样式元素，使用 JSX.Element 类型表示                                |
| css      | `string`      | 样式对应的 CSS 字符串                                              |
| ids      | `string[]`    | 样式应用的元素 ID 数组                                             |
| tag      | `string`      | 带有 `<style>` 标签的 css 字符串                                   |

#### 3. 将提取出的样式添加到页面的 head 中

由于 Nextjs 中需要直接插入 `<style>` 样式元素，我们从 `extractStaticStyle` 获得的样式对象数组中，取出 `style` 样式元素，将其添加到页面的 head 中即可。

```tsx | pure
const styles = extractStaticStyle(page.html).map((item) => item.style);

return {
  styles: <>{styles}</>,
};
```

### App Router

:::info
需要 antd-style v3.5.0 以上版本
:::

[App Router](https://nextjs.org/docs/app) 是 Next.js 在 13.4 版本中正式完备的应用模式。 antd-style 也支持了这种模式。 接入方式如下：

创建一个 `StyleRegistry.tsx` 组件，用于收集提取静态样式并插入到 html 中：

```tsx | pure
'use client';

import { StyleProvider, extractStaticStyle } from 'antd-style';
import { useServerInsertedHTML } from 'next/navigation';
import { PropsWithChildren, useRef } from 'react';

const StyleRegistry = ({ children }: PropsWithChildren) => {
  const isInsert = useRef(false);

  useServerInsertedHTML(() => {
    // 避免多次渲染时重复插入样式
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

在 `app/layout.tsx` 中引入该组件：

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
由于 Next.js 的 App Router 缺少获取 html 的钩子， `extractStaticStyle` 无法分析出当前应用中使用的样式，相当于没有 TreeShaking 能力，因此 App Router 引入的样式体积会比 Page Router 大一些。
:::

## 与 dumi 集成

在本示例中，将抽取样式到 css 静态文件，然后在 html 中引入。

### 1. 全局 Layout 中包裹 StyledProvider

在 umi 的全局 Layout 中包裹 StyledProvider，并定义一个全局的 cache 变量，用于缓存 antd 的样式：

```tsx | pure
import { extractStaticStyle, StyleProvider } from 'antd-style';

// PS: 由于 umijs 缺少一个类似 Nextjs 的 _doucment.tsx 文件，暂时只能通过全局定义变量的方式传递 cache
global.__ANTD_CACHE__ = extractStaticStyle.cache;

export default ({ children }) => {
  return <StyleProvider cache={extractStaticStyle.cache}>{children}</StyleProvider>;
};
```

### 2. 使用 extractStaticStyle 方法提取样式到独立文件

在服务端渲染的相关文件中（例如 `plugin.ts` ）， 使用 extractStaticStyle 方法提取样式到独立文件：

```ts
import { extractStaticStyle } from 'antd-style';

const SSRPlugin = (api: IApi) => {
  // 当 umi 要输出 html 文件时，修改 html 文件内容，集成 ssr 的样式内容
  api.modifyExportHTMLFiles((files) =>
    files
      // exclude dynamic route path, to avoid deploy failed by `:id` directory
      .filter((f) => !f.path.includes(':'))

      .map((file) => {
        const antdCache = (global as any).__ANTD_CACHE__;

        // 1. 提取 antd-style 样式
        const styles = extractStaticStyle(file.content, { antdCache });

        // 2. 提取每个样式到独立 css 文件
        styles.forEach((item) => {
          // 2.1 写css文件
          const cssFile = writeCSSFile(item.key, item.ids.join(''), item.css);

          // 2.2 添加css文件链接到 head
          file.content = addLinkStyle(file.content, cssFile);
        });
        return file;
      }),
  );
};

export default SSRPlugin;
```

:::info{title=参考示例}
dumi-theme-antd-style：https://github.com/arvinxx/dumi-theme-antd-style/blob/master/src/plugin/index.ts
:::

## 相关 API

extractStaticStyle
