---
title: 主题切换
group:
  title: 动态主题
  order: 3
---

# 主题切换

如今亮暗色主题切换的能力已经逐渐成为 PC、手机等默认支持得功能。浏览器也提供了媒体查询的能力来帮助我们快速适配亮色主题。在
Ant Design V5 中，基于 Css in Js 的能力我们实现了更加优雅的运行时主题切换能力。

但是由于 antd 作为基础组件的定位，在主题能力方面只提供了基础的 api ，并没有提供应用级开箱即用的方案。

`antd-style` 在 antd 动态主题基础上，提供了一套完整的应用级动态主题方案。

## 1. 亮暗色主题切换

通过在容器组件 [AppContainer](/usage/app-container) 上修改 `apperance` 这个 props，既可非常简单地实现主题切换，那这是也是动态主题最简单的使用方式。

<code src="../demos/guide/switch-theme/default.tsx"></code>

## 2. 自动响应系统主题

介绍完上述方案后，有心人应该会发现，这种方案会强依赖用户对主题的手动切换。但手机、电脑的系统级主题切换一般都是能跟随时间自动完成的。因此一般
macOS 系统也会提供「自动」的模式。

而在 AppContainer 中，我们提供了 `themeMode` 这个 props。对于不需要用户手动控制主题的场景，可以直接设置 `themeMode="auto"`
一键实现系统主题模式的自动。

<code src="../demos/guide/switch-theme/AutoSwitch.tsx"></code>

## 3. 受控模式的主题切换

但在很多场景下， 我们需要给用户提供自助选择权，让用户自行切换需要的模式。这个时候可以通过受控模式来实现这种能力。

<code src="../demos/guide/switch-theme/ControlledSwitch"></code>

:::warning

注意：themeMode 和 appearance 不建议同时受控使用，不然可能会出现预料之外的问题。

:::

## 4. 如果传入 antd 的 theme

antd v5 的 ConfigProvider 提供了 theme 配置，可以传入自定义的 theme 对象来实现自定义主题。

<code src="../demos/guide/switch-theme/AntdTheme"></code>

## API

由于 AppContainer 上包含了诸多 API，在这里只呈现和主题相关的 props

| name               | type                              | default | description                                                                             |
| ------------------ | --------------------------------- | ------- | --------------------------------------------------------------------------------------- |
| appearance         | `ThemeAppearance`                 | `light` | 应用的展示外观主题，只存在亮色和暗色两种                                                |
| defaultAppearance  | `ThemeAppearance`                 | `-`     |                                                                                         |
| onAppearanceChange | `(theme: ThemeAppearance )=>void` | `-`     |                                                                                         |
| themeMode          | `ThemeMode`                       | `light` | 主题的展示模式，有三种配置：跟随系统、亮色、暗色 。默认不开启自动模式，需要手动进行配置 |

`ThemeAppearance` 和 `ThemeMode` 的类型如下：

```ts
type ThemeAppearance = 'light' | 'dark';

type ThemeMode = 'auto' | 'light' | 'dark';
```
