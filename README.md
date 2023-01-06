# antd-style

[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url] [![install size][npm-size]][npm-size-url]

[![Test CI status][test-ci]][test-ci-url] [![Rlease CI][release-ci]][release-ci-url] [![Coverage][coverage]][codecov-url]

[![ docs by dumi][dumi-url]](https://d.umijs.org/) [![Build With father][father-url]](https://github.com/umijs/father/)

<!-- gitpod url -->

[gitpod-badge]: https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod
[gitpod-url]: https://gitpod.io/#https://github.com/ant-design/antd-style

<!-- umi url -->

[dumi-url]: https://img.shields.io/badge/docs%20by-dumi-blue
[father-url]: https://img.shields.io/badge/build%20with-father-028fe4.svg

<!-- npm url -->

[npm-image]: http://img.shields.io/npm/v/antd-style.svg?style=flat-square&color=deepgreen&label=latest
[npm-url]: http://npmjs.org/package/antd-style
[npm-size]: https://img.shields.io/bundlephobia/minzip/antd-style?color=deepgreen&label=gizpped%20size&style=flat-square
[npm-size-url]: https://packagephobia.com/result?p=antd-style

<!-- coverage -->

[coverage]: https://codecov.io/gh/arvinxx/npm-template/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/arvinxx/npm-template/branch/master

<!-- Github CI -->

[test-ci]: https://github.com/arvinxx/npm-template/workflows/Test%20CI/badge.svg
[release-ci]: https://github.com/arvinxx/npm-template/workflows/Release%20CI/badge.svg
[test-ci-url]: https://github.com/arvinxx/npm-template/actions?query=workflow%3ATest%20CI
[release-ci-url]: https://github.com/arvinxx/npm-template/actions?query=workflow%Release%20CI
[download-image]: https://img.shields.io/npm/dm/antd-style.svg?style=flat-square
[download-url]: https://npmjs.org/package/antd-style

## 简介

基于 Ant Design V5 Token System 构建的业务级 `css-in-js` 解决方案。

基于 [emotion](https://emotion.sh/) 二次封装。

## 快速上手

### 安装

推荐使用 `pnpm` 安装

```bash
pnpm i antd-style -S
```

### 典型使用场景

#### 场景一：消费 token

```ts
import { css, useTheme } from 'antd-style';

export const useStyle = () => {
  const token = useTheme();
  return css`
    color: ${token.colorPrimary};
  `;
};
```

#### 场景二：使用 styled 搭配 Token 创建自定义样式的组件

```tsx | pure
import { styled } from 'antd-style';

const Card = styled.div<{ primary?: boolean }>`
  border-radius: ${(p) => p.theme.borderRadiusLG}px;
  padding: ${(p) => p.theme.paddingLG}px;

  background: ${(p) => (p.primary ? p.theme.colorPrimary : p.theme.colorBgContainer)};
  color: ${(p) => (p.primary ? p.theme.colorTextLightSolid : p.theme.colorText)};
`;

const App = () => {
  return (
    <div>
      <Card>普通卡片</Card>
      <Card primary>强调卡片</Card>
    </div>
  );
};
```

## CHANGELOG

详情：[CHANGELOG](./CHANGELOG)

## License

[MIT](./LICENSE)
