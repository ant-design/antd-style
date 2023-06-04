import { defineConfig } from 'dumi';
import { SiteThemeConfig } from 'dumi-theme-antd-style';

const isProd = process.env.NODE_ENV === 'production';

// 不是预览模式 同时是生产环境
const isProdSite = process.env.PREVIEW !== '1' && isProd;

const themeConfig: SiteThemeConfig = {
  name: 'Ant Design Style',
  logo: 'https://gw.alipayobjects.com/zos/hitu-asset/c88e3678-6900-4289-8538-31367c2d30f2/hitu-1609235995955-image.png',

  apiHeader: {
    pkg: 'antd-style',
    docUrl: '{github}/blob/master/docs/api/{title}.md',
  },
  syntaxTheme: {
    shiki: {
      dark: 'one-dark-pro',
    },
  },
  socialLinks: {
    github: 'https://github.com/ant-design/antd-style',
  },
  footer: 'Made with ❤️ by 蚂蚁集团 - AFX & 数字科技',
};

export default defineConfig({
  themeConfig,
  // @ts-ignore
  ssr: isProd ? {} : false,
  favicons: [
    'https://gw.alipayobjects.com/zos/hitu-asset/c88e3678-6900-4289-8538-31367c2d30f2/hitu-1609235995955-image.png',
  ],
  // 部署在非根目录时, base 和 publicPath 都需要配置
  base: isProdSite ? '/antd-style/' : '/',
  publicPath: isProdSite ? '/antd-style/' : '/',
  styles: [
    `html, body { background: transparent;  }

  @media (prefers-color-scheme: dark) {
    html, body { background: #0E1116; }
  }`,
  ],
  extraBabelPlugins: [require.resolve('@emotion/babel-plugin')],
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
});
