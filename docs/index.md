---
title: 介绍
order: 1
---

## 简介

一个将网页转 sketch 的模块

## 快速上手

### 安装

```bash
npm i html2sketch --save
```

或

```
yarn add html2sketch
```

### 使用

`html2sketch` 包含 3 个主要方法 `nodeToLayer` 、 `nodeToGroup` 和 `nodeToSketchSymbol` 。

#### nodeToLayer

将 DOM 节点转成 Sketch 的对象,转换时不处理节点的子级

```js
import { nodeToLayer } from 'html2sketch';

const fn = async () => {
  // 1. 获取 DOM 节点
  const node = document.getElementById('id');

  // 2. 调用转换方法
  const layer = await nodeToLayer(node);

  // 3. 生成为 Sketch JSON
  const sketchJSON = layer.toSketchJSON();

  return sketchJSON;
};

fn().then((json) => {
  console.log(json);
});
```

#### nodeToGroup

将 DOM 节点以及它的子级整体转成 Sketch 的 Group 对象

```js
import { nodeToGroup } from 'html2sketch';

const fn = async () => {
  // 1. 获取 DOM 节点
  const node = document.getElementById('id');

  // 2. 调用转换方法
  const group = await nodeToGroup(node);

  // 3. 生成为 Sketch JSON
  const sketchJSON = group.toSketchJSON();

  return sketchJSON;
};

fn().then((json) => {
  console.log(json);
});
```

#### nodeToSketchSymbol

将 DOM 节点转 Sketch 的 Symbol 对象

```js
import { nodeToSketchSymbol } from 'html2sketch';

const fn = async () => {
  // 1. 获取 DOM 节点
  const node = document.getElementById('id');

  // 2. 调用转换方法
  const symbol = await nodeToSketchSymbol(node);

  // 3. 生成为 Sketch JSON
  const sketchJSON = symbol.toSketchJSON();

  return sketchJSON;
};

fn().then((json) => {
  console.log(json);
});
```

## 有了 Sketch JSON 的下一步?

生成的 Sketch JSON 严格符合 [Sketch FileFormat](https://developer.sketch.com/file-format/) 结构，因此只需要简单地将相应的 JSON 按照 Sketch 文件规范合成 `.sketch` 文件，即可获得 Sketch 文件。

社区相关 API 模块:

- [sketch-json-api](https://github.com/ant-design/sketch-json-api)
- [node-sketch](https://github.com/oscarotero/node-sketch)
- [sketch-constructor](https://github.com/amzn/sketch-constructor)

如果希望直接使用该 JSON 对象，可以使用 [Sketch JSON](https://github.com/arvinxx/sketch-json) 插件，一键粘贴 JSON 进入 Sketch 中。
