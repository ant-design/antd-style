# Changelog

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

- 计划废弃 v1 大版本 ([d62c8fc](https://github.com/arvinxx/antd-style/commit/d62c8fc))

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
