# Changelog

# [3.0.0-beta.1](https://github.com/ant-design/antd-style/compare/v2.0.2...v3.0.0-beta.1) (2023-02-19)

### ✨ Features

- 支持 antd stylish 模块实现 ([86e1abb](https://github.com/ant-design/antd-style/commit/86e1abb))
- createInstance 方法支持声明自定义 token 默认值 ([4122038](https://github.com/ant-design/antd-style/commit/4122038))
- createStyles 入参支持 appearance 和 injectGlobal ([0b1d947](https://github.com/ant-design/antd-style/commit/0b1d947))
- 为 ThemeProvider 增加主题切换的能力 ([e15668a](https://github.com/ant-design/antd-style/commit/e15668a))
- 将 r 改名为 responsive ([022c25b](https://github.com/ant-design/antd-style/commit/022c25b))
- 将 stylish 的接口从 styled 方法中移除，二者并不兼容 ([90809f9](https://github.com/ant-design/antd-style/commit/90809f9))
- 将主题配置中的 antd 主题配置与算法导出供自定义时使用 ([90a291d](https://github.com/ant-design/antd-style/commit/90a291d))
- 支持 useTheme 获取默认的主题变量 ([a465bf4](https://github.com/ant-design/antd-style/commit/a465bf4))
- 支持基于主题模式的风格定制 ([3f5d2cb](https://github.com/ant-design/antd-style/commit/3f5d2cb))
- 支持嵌套 Provider 后还能获得准确的 theme 值 ([8581665](https://github.com/ant-design/antd-style/commit/8581665))
- 新增 createInstance 方法，并用 createInstance 重构相关功能导出 ([39a05ae](https://github.com/ant-design/antd-style/commit/39a05ae))
- 新增 StyledProvider 以新增多 emotion 实例的能力 ([c4feb3b](https://github.com/ant-design/antd-style/commit/c4feb3b))
- 新增 useResponse hooks ([7e4f632](https://github.com/ant-design/antd-style/commit/7e4f632))
- 替换默认的 css 导出 ([8124791](https://github.com/ant-design/antd-style/commit/8124791))
- 添加 staticInstanceConfig api 以支持静态实例的配置 ([fdca322](https://github.com/ant-design/antd-style/commit/fdca322))
- 添加 styled api，支持 styled 方法响应自定义 token ([a152c33](https://github.com/ant-design/antd-style/commit/a152c33))
- 移除若干无用 api 并调整样式表实例为 styleManager ([8dafbc4](https://github.com/ant-design/antd-style/commit/8dafbc4))
- 经过讨论移除 AppContainer 容器组件，直接使用 antd 的 App 即可 ([0ff52d3](https://github.com/ant-design/antd-style/commit/0ff52d3))
- 自动监听浏览器主题能力兼容 ssr 场景 ([283ca09](https://github.com/ant-design/antd-style/commit/283ca09))
- 自定义增加一个 isDark 字段 ([ac0fb23](https://github.com/ant-design/antd-style/commit/ac0fb23))
- 调整 stylish 的实现逻辑 ([1822b38](https://github.com/ant-design/antd-style/commit/1822b38))
- 通过实际使用测试，移除 AppContainer 上的 globalStyle props ([1d3ee08](https://github.com/ant-design/antd-style/commit/1d3ee08))

### 🐛 Bug Fixes

- ThemeAppearance 字段支持自定义字符 ([2bd7007](https://github.com/ant-design/antd-style/commit/2bd7007))
- 优化类型代码导出问题 ([e1d4264](https://github.com/ant-design/antd-style/commit/e1d4264))
- 优化类型代码导出问题 ([d3cf3ef](https://github.com/ant-design/antd-style/commit/d3cf3ef))
- 修正 antd theme 配置没有导出的问题 ([a374437](https://github.com/ant-design/antd-style/commit/a374437))
- 修正 createStyles 的类型定义，避免无法正常跳转 ([4bef457](https://github.com/ant-design/antd-style/commit/4bef457))
- 修正 createStyles 类型不正确的问题 ([bacdc0b](https://github.com/ant-design/antd-style/commit/bacdc0b))
- 修正 CSS Object 和 CSS String 同时存在时的类型定义问题 ([bd38764](https://github.com/ant-design/antd-style/commit/bd38764))
- 修正 CSS Object 模式下的类型定义问题 ([0521200](https://github.com/ant-design/antd-style/commit/0521200))
- 修正 cx 下 where 选择器不正常显示的问题 ([a641ace](https://github.com/ant-design/antd-style/commit/a641ace))
- 修正 GetCustom 相关方法类型没导出的问题 ([db6727c](https://github.com/ant-design/antd-style/commit/db6727c))
- 修正 message、notification 组件 prefix 不对的问题 ([01380ee](https://github.com/ant-design/antd-style/commit/01380ee))
- 修正 reactCss 构建产物判断逻辑问题 ([a8288c2](https://github.com/ant-design/antd-style/commit/a8288c2))
- 修正 styled 导出问题 ([8141d78](https://github.com/ant-design/antd-style/commit/8141d78))
- 修正 styled 类型导出的问题 ([74551ed](https://github.com/ant-design/antd-style/commit/74551ed))
- 修正 theme props 类型定义失效的问题 ([2c3749c](https://github.com/ant-design/antd-style/commit/2c3749c))
- 修正 ThemeProvider 子组件类型定义问题 ([3066b81](https://github.com/ant-design/antd-style/commit/3066b81))
- 修正 withTheme 丢失的问题 ([c032827](https://github.com/ant-design/antd-style/commit/c032827))
- 修正在添加 ThemeProvider 后 customToken 设定会丢失的问题 ([936e43b](https://github.com/ant-design/antd-style/commit/936e43b))
- 修正相关类型导出丢失的问题 ([1cb24d9](https://github.com/ant-design/antd-style/commit/1cb24d9))
- 修正类型定义 ([8a7d053](https://github.com/ant-design/antd-style/commit/8a7d053))
- 修正类型定义不准确的问题 ([d318382](https://github.com/ant-design/antd-style/commit/d318382))
- 修正类型定义不匹配的问题 ([788a3ec](https://github.com/ant-design/antd-style/commit/788a3ec))
- 修正类型定义调整后 ()=>css`` 的使用方式类型定义不正确的问题 ([823ea12](https://github.com/ant-design/antd-style/commit/823ea12))
- 修正自定义 stylish 的问题 ([61f195e](https://github.com/ant-design/antd-style/commit/61f195e))
- 修正设定主题后仍然响应系统主题的 bug ([b44be0c](https://github.com/ant-design/antd-style/commit/b44be0c))
- 尝试优化类型问题 ([b6f2b62](https://github.com/ant-design/antd-style/commit/b6f2b62))
- 尝试修正类型定义问题 ([207019f](https://github.com/ant-design/antd-style/commit/207019f))

### 💥 BREAKING CHANGES

- stylish 将不再能直接作为 className 使用，需要通过 cx 包裹才能生效，将 stylish 的定位变得更加精准 —— 可复用的样式片段
- useTheme 的默认返回值发生变动，默认返回 antd token 值
- 不再计划默认支持组件选择器
- 为了方便用户理解，将 r 改名为 responsive
- 将 antd-style 中导出的 css 都替换为 serializeStyles，建立起 css`` -> styleObject 的心智。
- 移除 AppContainer
- 移除直接暴露的静态实例
