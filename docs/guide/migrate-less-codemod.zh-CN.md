---
title: Less 应用自动化迁移
order: 0
group: 从 Less 迁移
---

# 使用 codemod 一键 迁移 Less 应用

为方便业务应用的统一升级，我们提供了 less to antd-style 的一键迁移 codemod。

## 使用方法

直接在项目根目录，执行以下指令即可：

```bash
 npx @chenshuai2144/less2cssinjs less2js -i src
```

src 为项目所在目录

![](https://github-production-user-asset-6210df.s3.amazonaws.com/28616219/243153216-bed3780c-1642-456f-8b04-a81940f62fec.png)

## 转换逻辑

在这个 codemod 中，我们会做以下转换：

针对 less 文件：

1. 创建一个新的 `[file].style.ts` 文件，file 使用 less 文件名；
2. 将 less 文件中的样式转换为 antd-style 中的 css object 语法；
3. less 中的嵌套层级的语法将会拍平到一级；
4. less 中的 less 变量将会被自动替换为 antd-style 中的 token；

针对 ts 文件：

1. 将 import less 替换为 `import useStyles form '[file].style'`;
2. 添加 `const { style } = useStyles()`;

## 注意事项

TBD
