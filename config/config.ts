import { defineConfig } from 'umi';
import { resolve } from 'path';
const isProdSite =
  // 不是预览模式 同时是生产环境
  process.env.PREVIEW !== '1' && process.env.NODE_ENV === 'production';

export default defineConfig({
  title: 'template',
  mode: 'site',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/arvinxx/module-develop-template',
    },
  ],
  dynamicImport: {
    loading: '@ant-design/pro-skeleton',
  },
  alias: {
    '@docs-utils': resolve(__dirname, '../docs/__utils__'),
  },
  hash: true,
});
