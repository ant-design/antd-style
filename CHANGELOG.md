# Changelog

# [3.0.0-alpha.49](https://github.com/ant-design/antd-style/compare/v3.0.0-alpha.48...v3.0.0-alpha.49) (2023-02-13)

### 🐛 Bug Fixes

- 修正设定主题后仍然响应系统主题的 bug ([b44be0c](https://github.com/ant-design/antd-style/commit/b44be0c))

# [3.0.0-alpha.48](https://github.com/ant-design/antd-style/compare/v3.0.0-alpha.47...v3.0.0-alpha.48) (2023-02-12)

### 🐛 Bug Fixes

- 修正 styled 类型导出的问题 ([74551ed](https://github.com/ant-design/antd-style/commit/74551ed))

# [3.0.0-alpha.47](https://github.com/ant-design/antd-style/compare/v3.0.0-alpha.46...v3.0.0-alpha.47) (2023-02-06)

### 🐛 Bug Fixes

- 修正自定义 stylish 的问题 ([61f195e](https://github.com/ant-design/antd-style/commit/61f195e))

# [3.0.0-alpha.46](https://github.com/ant-design/antd-style/compare/v3.0.0-alpha.45...v3.0.0-alpha.46) (2023-02-04)

### ✨ Features

- 替换默认的 css 导出 ([8124791](https://github.com/ant-design/antd-style/commit/8124791))

### 💥 BREAKING CHANGES

- 将 antd-style 中导出的 css 都替换为 `@emotion/react` 的 css，建立起 css`` -> styleObject 的心智。

原因：由于 emotion/css 的 css`` 只产出 className，因此无法做一些复杂操作，例如样式片段复用，需要替换为 react 的版本

# [3.0.0-alpha.45](https://github.com/ant-design/antd-style/compare/v3.0.0-alpha.44...v3.0.0-alpha.45) (2023-02-04)

### 🐛 Bug Fixes

- 修正类型定义调整后 ()=>css`` 的使用方式类型定义不正确的问题 ([823ea12](https://github.com/ant-design/antd-style/commit/823ea12))

# [3.0.0-alpha.44](https://github.com/ant-design/antd-style/compare/v3.0.0-alpha.43...v3.0.0-alpha.44) (2023-02-04)

### ✨ Features

- 优化类型定义使用 ([d4a57ae](https://github.com/ant-design/antd-style/commit/d4a57ae))

# [3.0.0-alpha.43](https://github.com/ant-design/antd-style/compare/v3.0.0-alpha.42...v3.0.0-alpha.43) (2023-02-04)

### ✨ Features

- 将 r 改名为 responsive ([022c25b](https://github.com/ant-design/antd-style/commit/022c25b))

### 💥 BREAKING CHANGES

- 为了方便用户理解，将 r 改名为 responsive

# [3.0.0-alpha.42](https://github.com/ant-design/antd-style/compare/v3.0.0-alpha.41...v3.0.0-alpha.42) (2023-02-02)

### ✨ Features

- styled 方法底层实现替换为 styled-component 以默认支持组件选择器 ([0ccbcaf](https://github.com/ant-design/antd-style/commit/0ccbcaf))

### 💥 BREAKING CHANGES

- 由于 emotion/react 版本的 styled 无法默认支持组件选择器。虽然可以用 babel-plugin 配置，但是太过于复杂，因此考虑直接替换为 styled-components

# [3.0.0-alpha.41](https://github.com/ant-design/antd-style/compare/v3.0.0-alpha.40...v3.0.0-alpha.41) (2023-02-01)

### ✨ Features

- 自动监听浏览器主题能力兼容 ssr 场景 ([283ca09](https://github.com/ant-design/antd-style/commit/283ca09))

# [3.0.0-alpha.40](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.39...v3.0.0-alpha.40) (2023-01-27)

# [3.0.0-alpha.39](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.38...v3.0.0-alpha.39) (2023-01-25)

### 🐛 Bug Fixes

- 修正 reactCss 构建产物判断逻辑问题 ([a8288c2](https://github.com/arvinxx/antd-style/commit/a8288c2))

# [3.0.0-alpha.38](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.37...v3.0.0-alpha.38) (2023-01-25)

### ✨ Features

- 新增 useResponse hooks ([7e4f632](https://github.com/arvinxx/antd-style/commit/7e4f632))

# [3.0.0-alpha.37](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.36...v3.0.0-alpha.37) (2023-01-25)

### ✨ Features

- 初步支持响应式工具函数 ([244162d](https://github.com/arvinxx/antd-style/commit/244162d))

### 🐛 Bug Fixes

- 重构类型定义，使用入参更加准确 ([6c94ae6](https://github.com/arvinxx/antd-style/commit/6c94ae6))

# [3.0.0-alpha.36](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.35...v3.0.0-alpha.36) (2023-01-25)

### ✨ Features

- 使用 reactCss 替换 css 对象 ([0b42a0a](https://github.com/arvinxx/antd-style/commit/0b42a0a))

# [3.0.0-alpha.35](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.34...v3.0.0-alpha.35) (2023-01-23)

### ✨ Features

- antd stylish 模块实现 ([86e1abb](https://github.com/arvinxx/antd-style/commit/86e1abb))

# [3.0.0-alpha.34](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.33...v3.0.0-alpha.34) (2023-01-22)

### ✨ Features

- 调整 stylish 的实现逻辑 ([1822b38](https://github.com/arvinxx/antd-style/commit/1822b38))

### 💥 BREAKING CHANGES

- stylish 将不再能直接作为 className 使用，需要通过 css 包裹才能生效，将 stylish 的定位变得更加精准 —— 可复用的样式片段

# [3.0.0-alpha.33](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.32...v3.0.0-alpha.33) (2023-01-21)

### ✨ Features

- 在各方法中新增 prefixCls 的参数 ([33d23b4](https://github.com/arvinxx/antd-style/commit/33d23b4))

# [3.0.0-alpha.32](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.31...v3.0.0-alpha.32) (2023-01-21)

### ✨ Features

- 优化 StyledProvider 实现逻辑并新增 useEmotion 的 hook ([d9d8014](https://github.com/arvinxx/antd-style/commit/d9d8014))
- 新增 StyledProvider 以新增多 emotion 实例的能力 ([c4feb3b](https://github.com/arvinxx/antd-style/commit/c4feb3b))

# [3.0.0-alpha.31](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.30...v3.0.0-alpha.31) (2023-01-21)

### ✨ Features

- 将 stylish 的接口从 styled 方法中移除，二者并不兼容 ([90809f9](https://github.com/arvinxx/antd-style/commit/90809f9))

# [3.0.0-alpha.30](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.29...v3.0.0-alpha.30) (2023-01-21)

### ✨ Features

- css 和 cx 对象从独立 instance 中导出 ([d927630](https://github.com/arvinxx/antd-style/commit/d927630))

# [3.0.0-alpha.29](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.28...v3.0.0-alpha.29) (2023-01-20)

### ✨ Features

- 将主题配置中的 antd 主题配置与算法导出供自定义时使用 ([90a291d](https://github.com/arvinxx/antd-style/commit/90a291d))

# [3.0.0-alpha.28](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.27...v3.0.0-alpha.28) (2023-01-20)

### ✨ Features

- 为 createStyles 添加 isDarkMode 入参 ([ee1def0](https://github.com/arvinxx/antd-style/commit/ee1def0))

# [3.0.0-alpha.27](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.26...v3.0.0-alpha.27) (2023-01-17)

### 🐛 Bug Fixes

- 修正类型定义 ([8a7d053](https://github.com/arvinxx/antd-style/commit/8a7d053))

# [3.0.0-alpha.26](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.25...v3.0.0-alpha.26) (2023-01-17)

### ✨ Features

- 支持嵌套 Provider 后还能获得准确的 theme 值 ([8581665](https://github.com/arvinxx/antd-style/commit/8581665))

# [3.0.0-alpha.25](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.24...v3.0.0-alpha.25) (2023-01-17)

### 🐛 Bug Fixes

- 修正 message、notification 组件 prefix 不对的问题 ([01380ee](https://github.com/arvinxx/antd-style/commit/01380ee))

# [3.0.0-alpha.24](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.23...v3.0.0-alpha.24) (2023-01-16)

### ✨ Features

- 导出 sheet 对象，用于测试 qiankun 下样式会丢失的 bug ([32f273e](https://github.com/arvinxx/antd-style/commit/32f273e))

# [3.0.0-alpha.23](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.22...v3.0.0-alpha.23) (2023-01-12)

### ✨ Features

- 添加 staticInstanceConfig api 以支持静态实例的配置 ([fdca322](https://github.com/arvinxx/antd-style/commit/fdca322))

# [3.0.0-alpha.22](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.21...v3.0.0-alpha.22) (2023-01-11)

### 🐛 Bug Fixes

- 尝试优化类型问题 ([b6f2b62](https://github.com/arvinxx/antd-style/commit/b6f2b62))

# [3.0.0-alpha.21](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.20...v3.0.0-alpha.21) (2023-01-11)

### 🐛 Bug Fixes

- 经过讨论,移除 injectGlobal 在 createStyles 中的入参 ([d6d2aaf](https://github.com/arvinxx/antd-style/commit/d6d2aaf))

# [3.0.0-alpha.20](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.19...v3.0.0-alpha.20) (2023-01-11)

# [3.0.0-alpha.19](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.18...v3.0.0-alpha.19) (2023-01-11)

# [3.0.0-alpha.18](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.17...v3.0.0-alpha.18) (2023-01-11)

### ✨ Features

- 经过讨论移除 AppContainer 容器组件，直接使用 antd 的 App 即可 ([0ff52d3](https://github.com/arvinxx/antd-style/commit/0ff52d3))

### 💥 BREAKING CHANGES

- 移除 AppContainer

# [3.0.0-alpha.17](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.16...v3.0.0-alpha.17) (2023-01-10)

### 🐛 Bug Fixes

- 经过思考 create({ 单个 css obj }) 这个使用方式不合理，将其移出基础的类型定义对象中 ([51ed579](https://github.com/arvinxx/antd-style/commit/51ed579))

# [3.0.0-alpha.16](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.15...v3.0.0-alpha.16) (2023-01-10)

### 🐛 Bug Fixes

- 修正 createStyles 类型不正确的问题 ([bacdc0b](https://github.com/arvinxx/antd-style/commit/bacdc0b))

# [3.0.0-alpha.15](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.14...v3.0.0-alpha.15) (2023-01-10)

### 🐛 Bug Fixes

- 重构优化类型 ([4472a2b](https://github.com/arvinxx/antd-style/commit/4472a2b))

# [3.0.0-alpha.14](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.13...v3.0.0-alpha.14) (2023-01-10)

### 🐛 Bug Fixes

- 修正 CSS Object 和 CSS String 同时存在时的类型定义问题 ([bd38764](https://github.com/arvinxx/antd-style/commit/bd38764))

# [3.0.0-alpha.13](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.12...v3.0.0-alpha.13) (2023-01-10)

### 🐛 Bug Fixes

- 修正 CSS Object 模式下的类型定义问题 ([0521200](https://github.com/arvinxx/antd-style/commit/0521200))

# [3.0.0-alpha.12](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.11...v3.0.0-alpha.12) (2023-01-10)

### 🐛 Bug Fixes

- 尝试修正类型定义问题 ([207019f](https://github.com/arvinxx/antd-style/commit/207019f))

# [3.0.0-alpha.11](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.10...v3.0.0-alpha.11) (2023-01-10)

### ✨ Features

- createStyles 入参支持 appearance 和 injectGlobal ([0b1d947](https://github.com/arvinxx/antd-style/commit/0b1d947))

### 🐛 Bug Fixes

- 修正类型定义不准确的问题 ([d318382](https://github.com/arvinxx/antd-style/commit/d318382))

# [3.0.0-alpha.10](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.9...v3.0.0-alpha.10) (2023-01-10)

# [3.0.0-alpha.9](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.8...v3.0.0-alpha.9) (2023-01-09)

### ♻ Code Refactoring

- 移除暴露的静态方法，通过回调接口实现实例的转发 ([9b9e340](https://github.com/arvinxx/antd-style/commit/9b9e340))

### ✨ Features

- 为 ThemeProvider 增加主题切换的能力 ([e15668a](https://github.com/arvinxx/antd-style/commit/e15668a))
- 为 ThemeProvider 补齐主题切换的能力 ([52b68d5](https://github.com/arvinxx/antd-style/commit/52b68d5))

### 🐛 Bug Fixes

- 修正 theme props 类型定义失效的问题 ([2c3749c](https://github.com/arvinxx/antd-style/commit/2c3749c))

### 💥 BREAKING CHANGES

- 移除直接暴露的静态实例

# [3.0.0-alpha.8](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.7...v3.0.0-alpha.8) (2023-01-09)

### 🐛 Bug Fixes

- 修正 withTheme 丢失的问题 ([c032827](https://github.com/arvinxx/antd-style/commit/c032827))

# [3.0.0-alpha.7](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.6...v3.0.0-alpha.7) (2023-01-08)

### 🐛 Bug Fixes

- 修正 createStyles 的类型定义，避免无法正常跳转 ([4bef457](https://github.com/arvinxx/antd-style/commit/4bef457))

# [3.0.0-alpha.6](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.5...v3.0.0-alpha.6) (2023-01-07)

### 🐛 Bug Fixes

- 修正 antd theme 配置没有导出的问题 ([a374437](https://github.com/arvinxx/antd-style/commit/a374437))

# [3.0.0-alpha.5](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.4...v3.0.0-alpha.5) (2023-01-07)

### 🐛 Bug Fixes

- 优化类型代码导出问题 ([e1d4264](https://github.com/arvinxx/antd-style/commit/e1d4264))

# [3.0.0-alpha.4](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.3...v3.0.0-alpha.4) (2023-01-07)

### 🐛 Bug Fixes

- 优化类型代码导出问题 ([d3cf3ef](https://github.com/arvinxx/antd-style/commit/d3cf3ef))

# [3.0.0-alpha.3](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.2...v3.0.0-alpha.3) (2023-01-07)

### 🐛 Bug Fixes

- 修正 GetCustom 相关方法类型没导出的问题 ([db6727c](https://github.com/arvinxx/antd-style/commit/db6727c))

# [3.0.0-alpha.2](https://github.com/arvinxx/antd-style/compare/v3.0.0-alpha.1...v3.0.0-alpha.2) (2023-01-07)

### ✨ Features

- AppContainer 支持亮暗模式主题切换 ([bfd9922](https://github.com/arvinxx/antd-style/commit/bfd9922))
- useTheme 中增加 appearance 等主题状态属性 ([6ce3b7d](https://github.com/arvinxx/antd-style/commit/6ce3b7d))
- 支持基于主题模式的风格定制 ([3f5d2cb](https://github.com/arvinxx/antd-style/commit/3f5d2cb))
- 自定义增加一个 isDark 字段 ([ac0fb23](https://github.com/arvinxx/antd-style/commit/ac0fb23))

# [3.0.0-alpha.1](https://github.com/arvinxx/antd-style/compare/v2.0.2...v3.0.0-alpha.1) (2023-01-07)

### ✨ Features

- 支持 useTheme 获取默认的主题变量 ([a465bf4](https://github.com/arvinxx/antd-style/commit/a465bf4))
- 通过实际使用测试，移除 AppContainer 上的 globalStyle props ([1d3ee08](https://github.com/arvinxx/antd-style/commit/1d3ee08))

### 💥 BREAKING CHANGES

- useTheme 的默认返回值发生变动，默认返回 antd token 值
- 移除 AppContainer 的 globalStyle props

## [2.0.2](https://github.com/arvinxx/antd-style/compare/v2.0.1...v2.0.2) (2023-01-06)

## [2.0.2-alpha.1](https://github.com/arvinxx/antd-style/compare/v2.0.1...v2.0.2-alpha.1) (2023-01-06)

## [2.0.1](https://github.com/arvinxx/antd-style/compare/v2.0.0...v2.0.1) (2023-01-06)

# [2.0.0](https://github.com/arvinxx/antd-style/compare/v1.0.0...v2.0.0) (2023-01-06)

### ✨ Features

- 废弃 v1 大版本 ([d62c8fc](https://github.com/arvinxx/antd-style/commit/d62c8fc))

### 💥 BREAKING CHANGES

- 由于错发 1.1.0，导致 rc 如果发出来就会有 Breaking Change，直接调整版本号到 v2

# 1.0.0 (2023-01-06)

### ✨ Features

- add styled usage ([ab86f5d](https://github.com/arvinxx/antd-style/commit/ab86f5d))
- 初步敲定 createStyles 对象用法 ([015cad3](https://github.com/arvinxx/antd-style/commit/015cad3))
- 增加 AppContainer 组件 ([dce0e6e](https://github.com/arvinxx/antd-style/commit/dce0e6e))
- 增加 createStyles 使用说明 ([9e70f58](https://github.com/arvinxx/antd-style/commit/9e70f58))
- 增加 createStyles 的使用方法 ([7704d13](https://github.com/arvinxx/antd-style/commit/7704d13))
- 完成 AppContainer 基础功能并补充 demo ([36a6145](https://github.com/arvinxx/antd-style/commit/36a6145))
- 支持使用 injectGlobal 方法 ([c000af1](https://github.com/arvinxx/antd-style/commit/c000af1))
- 新增 createGlobalStyle 方法 ([e02eb38](https://github.com/arvinxx/antd-style/commit/e02eb38))
- 新增 useThemeMode hooks ([dd50eee](https://github.com/arvinxx/antd-style/commit/dd50eee))
- 新增基础的 useToken 方法 ([95d77fd](https://github.com/arvinxx/antd-style/commit/95d77fd))
- 补充 keyframes 和 withTheme 方法 ([3eeecda](https://github.com/arvinxx/antd-style/commit/3eeecda))

### 🐛 Bug Fixes

- 优化 AppContainer 的类型定义 ([d39fb21](https://github.com/arvinxx/antd-style/commit/d39fb21))
- 修正 antd CP 被隔断的问题 ([dffa086](https://github.com/arvinxx/antd-style/commit/dffa086))
- 修正 stylish 找不到的问题 ([e23453d](https://github.com/arvinxx/antd-style/commit/e23453d))
- 补充 Stylish Token 的类型定义 ([de9b903](https://github.com/arvinxx/antd-style/commit/de9b903))

### 👷 Build System

- 计划废弃 v1 大版本 ([a99312b](https://github.com/arvinxx/antd-style/commit/a99312b))

### 💥 BREAKING CHANGES

- 由于错发 1.1.0，导致 rc 如果发出来就会有 Breaking Change，直接调整版本号到 v2

# [1.0.0-rc.15](https://github.com/arvinxx/antd-style/compare/v1.0.0-rc.14...v1.0.0-rc.15) (2023-01-06)

### 👷 Build System

- 计划废弃 v1 大版本 ([a99312b](https://github.com/arvinxx/antd-style/commit/a99312b))

### 💥 BREAKING CHANGES

- 由于错发 1.1.0，导致 rc 如果发出来就会有 Breaking Change，直接调整版本号到 v2

# [1.0.0-rc.14](https://github.com/arvinxx/antd-style/compare/v1.0.0-rc.13...v1.0.0-rc.14) (2023-01-06)

### ✨ Features

- 补充 keyframes 和 withTheme 方法 ([3eeecda](https://github.com/arvinxx/antd-style/commit/3eeecda))

# [1.0.0-rc.13](https://github.com/arvinxx/antd-style/compare/v1.0.0-rc.12...v1.0.0-rc.13) (2023-01-05)

### 🐛 Bug Fixes

- 补充 Stylish Token 的类型定义 ([de9b903](https://github.com/arvinxx/antd-style/commit/de9b903))

# [1.0.0-rc.12](https://github.com/arvinxx/antd-style/compare/v1.0.0-rc.11...v1.0.0-rc.12) (2023-01-05)

### 🐛 Bug Fixes

- 修正 antd CP 被隔断的问题 ([dffa086](https://github.com/arvinxx/antd-style/commit/dffa086))
- 修正 stylish 找不到的问题 ([e23453d](https://github.com/arvinxx/antd-style/commit/e23453d))

# [1.0.0-rc.11](https://github.com/arvinxx/antd-style/compare/v1.0.0-rc.10...v1.0.0-rc.11) (2023-01-05)

### 🐛 Bug Fixes

- 优化 AppContainer 的类型定义 ([d39fb21](https://github.com/arvinxx/antd-style/commit/d39fb21))

# [1.0.0-rc.10](https://github.com/arvinxx/antd-style/compare/v1.0.0-rc.9...v1.0.0-rc.10) (2023-01-05)

### ✨ Features

- 支持使用 injectGlobal 方法 ([c000af1](https://github.com/arvinxx/antd-style/commit/c000af1))

# [1.0.0-rc.9](https://github.com/arvinxx/antd-style/compare/v1.0.0-rc.8...v1.0.0-rc.9) (2023-01-05)

# [1.0.0-rc.8](https://github.com/arvinxx/antd-style/compare/v1.0.0-rc.7...v1.0.0-rc.8) (2023-01-05)

### ✨ Features

- 初步敲定 createStyles 对象用法 ([015cad3](https://github.com/arvinxx/antd-style/commit/015cad3))

# [1.0.0-rc.7](https://github.com/arvinxx/antd-style/compare/v1.0.0-rc.6...v1.0.0-rc.7) (2023-01-02)

### ✨ Features

- 完成 AppContainer 基础功能并补充 demo ([36a6145](https://github.com/arvinxx/antd-style/commit/36a6145))
- 新增 useThemeMode hooks ([dd50eee](https://github.com/arvinxx/antd-style/commit/dd50eee))

# [1.0.0-rc.6](https://github.com/arvinxx/antd-style/compare/v1.0.0-rc.5...v1.0.0-rc.6) (2023-01-02)

### ✨ Features

- 增加 AppContainer 组件 ([dce0e6e](https://github.com/arvinxx/antd-style/commit/dce0e6e))

# [1.0.0-rc.5](https://github.com/arvinxx/antd-style/compare/v1.0.0-rc.4...v1.0.0-rc.5) (2023-01-02)

### ✨ Features

- 增加 createStyles 使用说明 ([9e70f58](https://github.com/arvinxx/antd-style/commit/9e70f58))

# [1.0.0-rc.4](https://github.com/arvinxx/antd-style/compare/v1.0.0-rc.3...v1.0.0-rc.4) (2023-01-02)

# [1.0.0-rc.3](https://github.com/arvinxx/antd-style/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2023-01-02)

### ✨ Features

- 新增 createGlobalStyle 方法 ([e02eb38](https://github.com/arvinxx/antd-style/commit/e02eb38))

# [1.0.0-rc.2](https://github.com/arvinxx/antd-style/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2023-01-02)

# 1.0.0-rc.1 (2023-01-01)

### ✨ Features

- add styled usage ([ab86f5d](https://github.com/arvinxx/antd-style/commit/ab86f5d))
- 增加 createStyles 的使用方法 ([7704d13](https://github.com/arvinxx/antd-style/commit/7704d13))
- 新增基础的 useToken 方法 ([95d77fd](https://github.com/arvinxx/antd-style/commit/95d77fd))
