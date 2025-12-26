import { DEFAULT_CSS_PREFIX_KEY } from '@/core';
import { createInstance } from './createInstance';

export { extractStaticStyle } from './extractStaticStyle';
export { setupStyled } from './setupStyled';
export { createInstance };

// 静态样式
export { createStaticStyles, cssVar, responsive } from '@/factories/createStaticStyles';

const styleInstance = createInstance({ key: DEFAULT_CSS_PREFIX_KEY, speedy: false });

export const {
  // **** 样式生成相关 **** //
  createStyles,
  createGlobalStyle,
  createStylish,
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
} = styleInstance;
