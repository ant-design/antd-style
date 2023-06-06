---
title: Babel 插件
order: 1
group: 进阶使用
---

# Babel 插件

我们提供了 antd-style 的 Babel 插件，以提升研发体验。

```bash
pnpm i -D babel-plugin-antd-style
```

## 配置

`.babelrc` 配置：

```json
{
  "plugins": ["antd-style"]
}
```

umi/dumi 配置:

```js
export default defineConfig({
  extraBabelPlugins: [require.resolve('babel-plugin-antd-style')],
});
```

## 功能

### 支持 className 定位

安装 Babel 插件后，className 将会定位到对应的样式文件目录，仅 dev 生效。

![](https://github-production-user-asset-6210df.s3.amazonaws.com/28616219/243569986-46274fce-8568-4ae1-a309-2972cb926611.png)
