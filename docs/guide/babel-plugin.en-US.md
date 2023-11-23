---
title: Babel Plugin
order: 1
group: Advanced Usage
---

# Babel Plugin

We provide a Babel plugin for antd-style to enhance the development experience.

```bash
pnpm i -D babel-plugin-antd-style
```

## Configuration

`.babelrc` configuration:

```json
{
  "plugins": ["antd-style"]
}
```

umi/dumi configuration:

```js
export default defineConfig({
  extraBabelPlugins: [require.resolve('babel-plugin-antd-style')],
});
```

## Features

### Support for className resolution

After installing the Babel plugin, className will be resolved to the corresponding style file directory, effective only in development.

![](https://github-production-user-asset-6210df.s3.amazonaws.com/28616219/243569986-46274fce-8568-4ae1-a309-2972cb926611.png)
