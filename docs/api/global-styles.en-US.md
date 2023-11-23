---
title: createGlobalStyle
description: Create global styles
order: 10
group: Style Creation
---

## Introduction

Using `createGlobalStyle` allows you to create styles that are injected globally. The usage of this method is almost identical to `styled-component`, but it is implemented based on `@emotion/react` and `@emotion/serialize`.

## Default Usage

<code src="../demos/globalStyles/default.tsx"></code>

## Using with antd tokens

By utilizing the token system in antd v5, we can organize and implement a Button style that does not exist in Ant Design.

<code src="../demos/globalStyles/AntdToken.tsx"></code>
