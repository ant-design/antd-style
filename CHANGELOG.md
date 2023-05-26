# Changelog

# [3.2.0](https://github.com/ant-design/antd-style/compare/v3.1.1...v3.2.0) (2023-05-26)

### ✨ Features

- add set method to useThemeMode hooks ([0273f38](https://github.com/ant-design/antd-style/commit/0273f38)), closes [#57](https://github.com/ant-design/antd-style/issues/57)

# [3.2.0-beta.2](https://github.com/ant-design/antd-style/compare/v3.2.0-beta.1...v3.2.0-beta.2) (2023-05-26)

### 🐛 Bug Fixes

- fix lint ([025591c](https://github.com/ant-design/antd-style/commit/025591c))

# [3.2.0-beta.1](https://github.com/ant-design/antd-style/compare/v3.1.1...v3.2.0-beta.1) (2023-05-26)

### ✨ Features

- add set method to useThemeMode hooks ([0d65a9a](https://github.com/ant-design/antd-style/commit/0d65a9a))

## [3.1.1](https://github.com/ant-design/antd-style/compare/v3.1.0...v3.1.1) (2023-05-15)

### 🐛 Bug Fixes

- 修正 StyleProvider Props 类型不准确的问题 ([38d9d34](https://github.com/ant-design/antd-style/commit/38d9d34)), closes [#51](https://github.com/ant-design/antd-style/issues/51)

# [3.1.0](https://github.com/ant-design/antd-style/compare/v3.0.0...v3.1.0) (2023-05-06)

### ✨ Features

- 支持 StyleProvider container 与默认位置隔离的样式插入策略 ([a51d72a](https://github.com/ant-design/antd-style/commit/a51d72a))
- 支持 StyleProvider 上指定 container 进行样式点插入 ([6bdba25](https://github.com/ant-design/antd-style/commit/6bdba25))

### 🐛 Bug Fixes

- 修正 antd 组件 StyleProvider 的 container 插入位置属性丢失的问题 ([d6de186](https://github.com/ant-design/antd-style/commit/d6de186)), closes [#46](https://github.com/ant-design/antd-style/issues/46)
- 修正 createInstance 的 container 插入位置制定无效的问题 ([c0b00c3](https://github.com/ant-design/antd-style/commit/c0b00c3)), closes [#47](https://github.com/ant-design/antd-style/issues/47)
- 修正类型定义丢失问题的问题 ([afd06b3](https://github.com/ant-design/antd-style/commit/afd06b3))

# [3.1.0-beta.3](https://github.com/ant-design/antd-style/compare/v3.1.0-beta.2...v3.1.0-beta.3) (2023-05-05)

### ✨ Features

- 支持 StyleProvider container 与默认位置隔离的样式插入策略 ([a51d72a](https://github.com/ant-design/antd-style/commit/a51d72a))

# [3.1.0-beta.2](https://github.com/ant-design/antd-style/compare/v3.1.0-beta.1...v3.1.0-beta.2) (2023-05-05)

### 🐛 Bug Fixes

- 修正类型定义丢失问题的问题 ([afd06b3](https://github.com/ant-design/antd-style/commit/afd06b3))

# [3.1.0-beta.1](https://github.com/ant-design/antd-style/compare/v3.0.1-beta.1...v3.1.0-beta.1) (2023-05-04)

### ✨ Features

- 支持 StyleProvider 上指定 container 进行样式点插入 ([6bdba25](https://github.com/ant-design/antd-style/commit/6bdba25))

## [3.0.1-beta.1](https://github.com/ant-design/antd-style/compare/v3.0.0...v3.0.1-beta.1) (2023-04-23)

### 🐛 Bug Fixes

- 修正 antd 组件 StyleProvider 的 container 插入位置属性丢失的问题 ([d6de186](https://github.com/ant-design/antd-style/commit/d6de186)), closes [#46](https://github.com/ant-design/antd-style/issues/46)
- 修正 createInstance 的 container 插入位置制定无效的问题 ([c0b00c3](https://github.com/ant-design/antd-style/commit/c0b00c3)), closes [#47](https://github.com/ant-design/antd-style/issues/47)

# [3.0.0](https://github.com/ant-design/antd-style/compare/v2.0.2...v3.0.0) (2023-04-04)

### ♻ Code Refactoring

- 将 styled 语法替换回 @emotion/styled ([4733e00](https://github.com/ant-design/antd-style/commit/4733e00))
- 移除暴露的静态方法，通过回调接口实现实例的转发 ([9b9e340](https://github.com/ant-design/antd-style/commit/9b9e340))

### ✨ Features

- antd stylish 模块实现 ([86e1abb](https://github.com/ant-design/antd-style/commit/86e1abb))
- AppContainer 支持亮暗模式主题切换 ([bfd9922](https://github.com/ant-design/antd-style/commit/bfd9922))
- createInstance 方法支持声明自定义 token 默认值 ([4122038](https://github.com/ant-design/antd-style/commit/4122038))
- createStyles 入参支持 appearance 和 injectGlobal ([0b1d947](https://github.com/ant-design/antd-style/commit/0b1d947))
- css 和 cx 对象从独立 instance 中导出 ([d927630](https://github.com/ant-design/antd-style/commit/d927630))
- extractStaticStyle 提供 antd 的 ids 计数 ([47254d3](https://github.com/ant-design/antd-style/commit/47254d3))
- extractStaticStyle 支持传入 antdCache ([d87ddde](https://github.com/ant-design/antd-style/commit/d87ddde))
- extractStaticStyle 支持抽取 antd 样式 ([5d0d10c](https://github.com/ant-design/antd-style/commit/5d0d10c))
- styled 方法底层实现替换为 styled-component 以默认支持组件选择器 ([0ccbcaf](https://github.com/ant-design/antd-style/commit/0ccbcaf))
- useTheme 中增加 appearance 等主题状态属性 ([6ce3b7d](https://github.com/ant-design/antd-style/commit/6ce3b7d))
- useThemeMode 支持获取当前浏览器主题模式 ([a4e2e67](https://github.com/ant-design/antd-style/commit/a4e2e67))
- 为 createStyles 添加 isDarkMode 入参 ([ee1def0](https://github.com/ant-design/antd-style/commit/ee1def0))
- 为 ThemeProvider 增加主题切换的能力 ([e15668a](https://github.com/ant-design/antd-style/commit/e15668a))
- 为 ThemeProvider 补齐主题切换的能力 ([52b68d5](https://github.com/ant-design/antd-style/commit/52b68d5))
- 优化 css-prefix key 为 acss 以减少样式类名体积 ([d367033](https://github.com/ant-design/antd-style/commit/d367033))
- 优化 StyledProvider 实现逻辑并新增 useEmotion 的 hook ([d9d8014](https://github.com/ant-design/antd-style/commit/d9d8014))
- 优化类型定义使用 ([d4a57ae](https://github.com/ant-design/antd-style/commit/d4a57ae))
- 使用 reactCss 替换 css 对象 ([0b42a0a](https://github.com/ant-design/antd-style/commit/0b42a0a))
- 初步支持响应式工具函数 ([244162d](https://github.com/ant-design/antd-style/commit/244162d))
- 在各方法中新增 prefixCls 的参数 ([33d23b4](https://github.com/ant-design/antd-style/commit/33d23b4))
- 实现 setupStyled ([d66d50d](https://github.com/ant-design/antd-style/commit/d66d50d))
- 导出 sheet 对象，用于测试 qiankun 下样式会丢失的 bug ([32f273e](https://github.com/ant-design/antd-style/commit/32f273e))
- 将 extractStyle 改名为 extractStaticStyle ，与 antd cssinjs 的错开 ([89f17dc](https://github.com/ant-design/antd-style/commit/89f17dc))
- 将 r 改名为 responsive ([022c25b](https://github.com/ant-design/antd-style/commit/022c25b))
- 将 stylish 的接口从 styled 方法中移除，二者并不兼容 ([90809f9](https://github.com/ant-design/antd-style/commit/90809f9))
- 将主题配置中的 antd 主题配置与算法导出供自定义时使用 ([90a291d](https://github.com/ant-design/antd-style/commit/90a291d))
- 提供 ssr 抽取方法 extractStyle ([8d22e4a](https://github.com/ant-design/antd-style/commit/8d22e4a))
- 提供全局 cache 列表存放样式缓存供 SSR 消费 ([4777e1b](https://github.com/ant-design/antd-style/commit/4777e1b))
- 支持 useTheme 获取默认的主题变量 ([a465bf4](https://github.com/ant-design/antd-style/commit/a465bf4))
- 支持使用 antd-style 的 StyleProvider 做 SSR ([6c0b017](https://github.com/ant-design/antd-style/commit/6c0b017))
- 支持基于主题模式的风格定制 ([3f5d2cb](https://github.com/ant-design/antd-style/commit/3f5d2cb))
- 支持嵌套 Provider 后还能获得准确的 theme 值 ([8581665](https://github.com/ant-design/antd-style/commit/8581665))
- 新增 createInstance 方法，并用 createInstance 重构相关功能导出 ([39a05ae](https://github.com/ant-design/antd-style/commit/39a05ae))
- 新增 StyledProvider 以新增多 emotion 实例的能力 ([c4feb3b](https://github.com/ant-design/antd-style/commit/c4feb3b))
- 新增 useResponse hooks ([7e4f632](https://github.com/ant-design/antd-style/commit/7e4f632))
- 替换默认的 css 导出 ([8124791](https://github.com/ant-design/antd-style/commit/8124791))
- 添加 staticInstanceConfig api 以支持静态实例的配置 ([fdca322](https://github.com/ant-design/antd-style/commit/fdca322))
- 添加 styled api，支持 styled 方法响应自定义 token ([a152c33](https://github.com/ant-design/antd-style/commit/a152c33))
- 移除 styled 的默认导出 ([9ced0aa](https://github.com/ant-design/antd-style/commit/9ced0aa))
- 移除 useEmotion 方法 ([7f7a59e](https://github.com/ant-design/antd-style/commit/7f7a59e))
- 移除若干无用 api 并调整样式表实例为 styleManager ([8dafbc4](https://github.com/ant-design/antd-style/commit/8dafbc4))
- 简化 ThemeProvider 注入 styled 的接口配置 ([84f828c](https://github.com/ant-design/antd-style/commit/84f828c))
- 经过讨论移除 AppContainer 容器组件，直接使用 antd 的 App 即可 ([0ff52d3](https://github.com/ant-design/antd-style/commit/0ff52d3))
- 自动监听浏览器主题能力兼容 ssr 场景 ([283ca09](https://github.com/ant-design/antd-style/commit/283ca09))
- 自定义增加一个 isDark 字段 ([ac0fb23](https://github.com/ant-design/antd-style/commit/ac0fb23))
- 调整 stylish 的实现逻辑 ([1822b38](https://github.com/ant-design/antd-style/commit/1822b38))
- 通过实际使用测试，移除 AppContainer 上的 globalStyle props ([1d3ee08](https://github.com/ant-design/antd-style/commit/1d3ee08))

### 🐛 Bug Fixes

- cache 设为可选项 ([495cd78](https://github.com/ant-design/antd-style/commit/495cd78))
- ThemeAppearance 字段支持自定义字符 ([2bd7007](https://github.com/ant-design/antd-style/commit/2bd7007))
- 优化类型代码导出问题 ([e1d4264](https://github.com/ant-design/antd-style/commit/e1d4264))
- 优化类型代码导出问题 ([d3cf3ef](https://github.com/ant-design/antd-style/commit/d3cf3ef))
- 修正 @ant-design/cssinjs 作为 deps ([912a59f](https://github.com/ant-design/antd-style/commit/912a59f))
- 修正 antd theme 配置没有导出的问题 ([a374437](https://github.com/ant-design/antd-style/commit/a374437))
- 修正 createGlobalStyle 类型找不到的问题 ([64fda0f](https://github.com/ant-design/antd-style/commit/64fda0f))
- 修正 createInstance 的 ThemeProvider 会全量覆盖默认的自定义 token 问题 ([9477630](https://github.com/ant-design/antd-style/commit/9477630))
- 修正 createStyles 的类型定义，避免无法正常跳转 ([4bef457](https://github.com/ant-design/antd-style/commit/4bef457))
- 修正 createStyles 类型不正确的问题 ([bacdc0b](https://github.com/ant-design/antd-style/commit/bacdc0b))
- 修正 CSS Object 和 CSS String 同时存在时的类型定义问题 ([bd38764](https://github.com/ant-design/antd-style/commit/bd38764))
- 修正 CSS Object 模式下的类型定义问题 ([0521200](https://github.com/ant-design/antd-style/commit/0521200))
- 修正 cx 下 where 选择器不正常显示的问题 ([a641ace](https://github.com/ant-design/antd-style/commit/a641ace))
- 修正 GetCustom 相关方法类型没导出的问题 ([db6727c](https://github.com/ant-design/antd-style/commit/db6727c))
- 修正 matchBrowserPrefer 在 SSR 下无法正常使用的问题 ([660a338](https://github.com/ant-design/antd-style/commit/660a338))
- 修正 message、notification 组件 prefix 不对的问题 ([01380ee](https://github.com/ant-design/antd-style/commit/01380ee))
- 修正 reactCss 构建产物判断逻辑问题 ([a8288c2](https://github.com/ant-design/antd-style/commit/a8288c2))
- 修正 SSR 下 CacheManager 找不到的问题 ([362723a](https://github.com/ant-design/antd-style/commit/362723a))
- 修正 styled 导出问题 ([8141d78](https://github.com/ant-design/antd-style/commit/8141d78))
- 修正 styled 类型导出的问题 ([74551ed](https://github.com/ant-design/antd-style/commit/74551ed))
- 修正 StyleProvider 的类型定义 ([780bf91](https://github.com/ant-design/antd-style/commit/780bf91))
- 修正 theme props 类型定义失效的问题 ([2c3749c](https://github.com/ant-design/antd-style/commit/2c3749c))
- 修正 ThemeProvider 子组件类型定义问题 ([3066b81](https://github.com/ant-design/antd-style/commit/3066b81))
- 修正 vite 模式下 global 为 undefined 的问题 ([d0a19ba](https://github.com/ant-design/antd-style/commit/d0a19ba))
- 修正 withTheme 丢失的问题 ([c032827](https://github.com/ant-design/antd-style/commit/c032827))
- 修正使用 styled ThemeProvider 后 useTheme 方法不响应自定义 token 的问题 ([35d87a9](https://github.com/ant-design/antd-style/commit/35d87a9))
- 修正在添加 ThemeProvider 后 customToken 设定会丢失的问题 ([936e43b](https://github.com/ant-design/antd-style/commit/936e43b))
- 修正相关类型导出丢失的问题 ([1cb24d9](https://github.com/ant-design/antd-style/commit/1cb24d9))
- 修正类型定义 ([8a7d053](https://github.com/ant-design/antd-style/commit/8a7d053))
- 修正类型定义不准确的问题 ([d318382](https://github.com/ant-design/antd-style/commit/d318382))
- 修正类型定义不匹配的问题 ([788a3ec](https://github.com/ant-design/antd-style/commit/788a3ec))
- 修正类型定义调整后 ()=>css`` 的使用方式类型定义不正确的问题 ([823ea12](https://github.com/ant-design/antd-style/commit/823ea12))
- 修正自定义 stylish 的问题 ([61f195e](https://github.com/ant-design/antd-style/commit/61f195e))
- 修正设定主题后仍然响应系统主题的 bug ([b44be0c](https://github.com/ant-design/antd-style/commit/b44be0c))
- 将 emotion/server 的引入动态化 ([9415799](https://github.com/ant-design/antd-style/commit/9415799)), closes [#40](https://github.com/ant-design/antd-style/issues/40)
- 尝试优化类型问题 ([b6f2b62](https://github.com/ant-design/antd-style/commit/b6f2b62))
- 尝试修正类型定义问题 ([207019f](https://github.com/ant-design/antd-style/commit/207019f))
- 移除不需使用类型定义 ([f9ee190](https://github.com/ant-design/antd-style/commit/f9ee190))
- 经过思考 create({ 单个 css obj }) 这个使用方式不合理，将其移出基础的类型定义对象中 ([51ed579](https://github.com/ant-design/antd-style/commit/51ed579))
- 经过讨论,移除 injectGlobal 在 createStyles 中的入参 ([d6d2aaf](https://github.com/ant-design/antd-style/commit/d6d2aaf))
- 补回 CacheManager 类型 ([b95093f](https://github.com/ant-design/antd-style/commit/b95093f))
- 补回 injectGlobal 方法丢失的问题 ([111bcc7](https://github.com/ant-design/antd-style/commit/111bcc7))
- 重构优化类型 ([4472a2b](https://github.com/ant-design/antd-style/commit/4472a2b))
- 重构类型定义，使用入参更加准确 ([6c94ae6](https://github.com/ant-design/antd-style/commit/6c94ae6))
- 默认 cache-key 改为 css ([a2b585a](https://github.com/ant-design/antd-style/commit/a2b585a))

### 💥 BREAKING CHANGES

- stylish 将不再能直接作为 className 使用，需要通过 css 包裹才能生效，将 stylish 的定位变得更加精准 —— 可复用的样式片段
- useTheme 的默认返回值发生变动，默认返回 antd token 值
- 不再计划默认支持组件选择器
- 为了方便用户理解，将 r 改名为 responsive
- 将 antd-style 中导出的 css 都替换为 `@emotion/react` 的 css，建立起 css`` -> styleObject 的心智。

原因：由于 emotion/css 的 css`` 只产出 className，因此无法做一些复杂操作，例如样式片段复用，需要替换为 react 的版本

- 由于 emotion/react 版本的 styled 无法默认支持组件选择器。虽然可以用 babel-plugin 配置，但是太过于复杂，因此考虑直接替换为 styled-components
- 移除 AppContainer
- 移除 AppContainer 的 globalStyle props
- 移除 styled.useTheme 的用法，需要调整为 styled.ThemeContext，且 styled 的 ThemeProvider 可以无需注入
- 移除 useEmotion 方法，用户不应该感知内部实现的实例对象
- 移除直接暴露的静态实例

# [3.0.0-beta.22](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.21...v3.0.0-beta.22) (2023-03-31)

### 🐛 Bug Fixes

- 修正 createGlobalStyle 类型找不到的问题 ([64fda0f](https://github.com/ant-design/antd-style/commit/64fda0f))

# [3.0.0-beta.21](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.20...v3.0.0-beta.21) (2023-03-29)

### 🐛 Bug Fixes

- 将 emotion/server 的引入动态化 ([9415799](https://github.com/ant-design/antd-style/commit/9415799)), closes [#40](https://github.com/ant-design/antd-style/issues/40)

# [3.0.0-beta.20](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.19...v3.0.0-beta.20) (2023-03-28)

### 🐛 Bug Fixes

- 修正 @ant-design/cssinjs 作为 deps ([912a59f](https://github.com/ant-design/antd-style/commit/912a59f))
- 修正 vite 模式下 global 为 undefined 的问题 ([d0a19ba](https://github.com/ant-design/antd-style/commit/d0a19ba))

# [3.0.0-beta.19](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.18...v3.0.0-beta.19) (2023-03-19)

### ✨ Features

- extractStaticStyle 提供 antd 的 ids 计数 ([47254d3](https://github.com/ant-design/antd-style/commit/47254d3))

# [3.0.0-beta.18](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.17...v3.0.0-beta.18) (2023-03-19)

### ✨ Features

- extractStaticStyle 支持传入 antdCache ([d87ddde](https://github.com/ant-design/antd-style/commit/d87ddde))

# [3.0.0-beta.17](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.16...v3.0.0-beta.17) (2023-03-17)

### 🐛 Bug Fixes

- cache 设为可选项 ([495cd78](https://github.com/ant-design/antd-style/commit/495cd78))

# [3.0.0-beta.16](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.15...v3.0.0-beta.16) (2023-03-15)

### 🐛 Bug Fixes

- 修正 StyleProvider 的类型定义 ([780bf91](https://github.com/ant-design/antd-style/commit/780bf91))

# [3.0.0-beta.15](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.14...v3.0.0-beta.15) (2023-03-15)

### ✨ Features

- extractStaticStyle 支持抽取 antd 样式 ([5d0d10c](https://github.com/ant-design/antd-style/commit/5d0d10c))
- 支持使用 antd-style 的 StyleProvider 做 SSR ([6c0b017](https://github.com/ant-design/antd-style/commit/6c0b017))

# [3.0.0-beta.14](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.13...v3.0.0-beta.14) (2023-03-15)

### ✨ Features

- 将 extractStyle 改名为 extractStaticStyle ，与 antd cssinjs 的错开 ([89f17dc](https://github.com/ant-design/antd-style/commit/89f17dc))

# [3.0.0-beta.13](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.12...v3.0.0-beta.13) (2023-03-15)

### ✨ Features

- 提供 ssr 抽取方法 extractStyle ([8d22e4a](https://github.com/ant-design/antd-style/commit/8d22e4a))

# [3.0.0-beta.12](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.11...v3.0.0-beta.12) (2023-03-14)

### 🐛 Bug Fixes

- 修正 matchBrowserPrefer 在 SSR 下无法正常使用的问题 ([660a338](https://github.com/ant-design/antd-style/commit/660a338))

# [3.0.0-beta.11](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.10...v3.0.0-beta.11) (2023-03-14)

### ✨ Features

- useThemeMode 支持获取当前浏览器主题模式 ([a4e2e67](https://github.com/ant-design/antd-style/commit/a4e2e67))

# [3.0.0-beta.10](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.9...v3.0.0-beta.10) (2023-03-01)

### ✨ Features

- 优化 css-prefix key 为 acss 以减少样式类名体积 ([d367033](https://github.com/ant-design/antd-style/commit/d367033))

# [3.0.0-beta.9](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.8...v3.0.0-beta.9) (2023-03-01)

### 🐛 Bug Fixes

- 修正使用 styled ThemeProvider 后 useTheme 方法不响应自定义 token 的问题 ([35d87a9](https://github.com/ant-design/antd-style/commit/35d87a9))

# [3.0.0-beta.8](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.7...v3.0.0-beta.8) (2023-02-26)

### ✨ Features

- 简化 ThemeProvider 注入 styled 的接口配置 ([84f828c](https://github.com/ant-design/antd-style/commit/84f828c))

### 💥 BREAKING CHANGES

- 移除 styled.useTheme 的用法，需要调整为 styled.ThemeContext，且 styled 的 ThemeProvider 可以无需注入

# [3.0.0-beta.7](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.6...v3.0.0-beta.7) (2023-02-26)

### ✨ Features

- 移除 useEmotion 方法 ([7f7a59e](https://github.com/ant-design/antd-style/commit/7f7a59e))

### 🐛 Bug Fixes

- 修正 createInstance 的 ThemeProvider 会全量覆盖默认的自定义 token 问题 ([9477630](https://github.com/ant-design/antd-style/commit/9477630))

### 💥 BREAKING CHANGES

- 移除 useEmotion 方法，用户不应该感知内部实现的实例对象

# [3.0.0-beta.6](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.5...v3.0.0-beta.6) (2023-02-23)

### 🐛 Bug Fixes

- 补回 CacheManager 类型 ([b95093f](https://github.com/ant-design/antd-style/commit/b95093f))

# [3.0.0-beta.5](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.4...v3.0.0-beta.5) (2023-02-23)

### 🐛 Bug Fixes

- 修正 SSR 下 CacheManager 找不到的问题 ([362723a](https://github.com/ant-design/antd-style/commit/362723a))

# [3.0.0-beta.4](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.3...v3.0.0-beta.4) (2023-02-23)

# [3.0.0-beta.3](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.2...v3.0.0-beta.3) (2023-02-23)

### ✨ Features

- 提供全局 cache 列表存放样式缓存供 SSR 消费 ([4777e1b](https://github.com/ant-design/antd-style/commit/4777e1b))

### 🐛 Bug Fixes

- 默认 cache-key 改为 css ([a2b585a](https://github.com/ant-design/antd-style/commit/a2b585a))

# [3.0.0-beta.2](https://github.com/ant-design/antd-style/compare/v3.0.0-beta.1...v3.0.0-beta.2) (2023-02-19)

### ✨ Features

- 移除 styled 的默认导出 ([9ced0aa](https://github.com/ant-design/antd-style/commit/9ced0aa))

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
