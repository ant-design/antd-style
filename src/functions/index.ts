import { DEFAULT_CSS_PREFIX_KEY } from '@/core';
import { createInstance } from './createInstance';

export { extractStaticStyle } from './extractStaticStyle';
export { setupStyled } from './setupStyled';
export { createInstance };

// 静态样式工厂函数（用于创建自定义实例）
export { createStaticStylesFactory } from '@/factories/createStaticStyles';

declare global {
  // eslint-disable-next-line no-var
  var __ANTD_STYLE_SPEEDY__: boolean | undefined;
}

/**
 * 默认实例的 speedy 模式开关。
 *
 * 用户在 import `antd-style` 之前可通过以下两种方式开启：
 * 1. 设置环境变量 `ANTD_STYLE_SPEEDY=true`（构建工具会内联 `process.env.ANTD_STYLE_SPEEDY`）。
 * 2. 在入口最早处赋值 `globalThis.__ANTD_STYLE_SPEEDY__ = true`。
 *
 * 若需精细控制（例如不同 cache / prefixCls），请使用 `createInstance({ speedy: true })` 自建实例。
 */
const defaultSpeedy =
  (typeof process !== 'undefined' && process.env && process.env.ANTD_STYLE_SPEEDY === 'true') ||
  (typeof globalThis !== 'undefined' && globalThis.__ANTD_STYLE_SPEEDY__ === true);

const styleInstance = createInstance({ key: DEFAULT_CSS_PREFIX_KEY, speedy: defaultSpeedy });

export const {
  // **** 样式生成相关 **** //
  createStyles,
  createGlobalStyle,
  createStylish,
  // 使用与默认实例相同 cache 的 createStaticStyles
  createStaticStyles,
  // **** 基础样式方法 **** //
  css,
  cx,
  keyframes,
  /**
   * @deprecated
   */
  injectGlobal,
  //****  样式表管理  **** //
  styleManager,
  // ***** 主题相关 ***** //
  ThemeProvider,
  StyleProvider,
  useTheme,
  // 静态样式工具
  cssVar,
  responsive,
} = styleInstance;
