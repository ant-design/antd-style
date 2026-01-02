import { DEFAULT_CSS_PREFIX_KEY } from '@/core';
import { createInstance } from './createInstance';

export { extractStaticStyle } from './extractStaticStyle';
export { setupStyled } from './setupStyled';
export { createInstance };

// 静态样式工厂函数（用于创建自定义实例）
export { createStaticStylesFactory } from '@/factories/createStaticStyles';
export { getAntdToken } from '@/factories/createStaticStyles/cssVar';

const styleInstance = createInstance({ key: DEFAULT_CSS_PREFIX_KEY, speedy: false });

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
