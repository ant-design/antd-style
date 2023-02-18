import { createInstance } from './createInstance';

export { createInstance };

const styleInstance = createInstance({ key: 'ant-css', speedy: false });

export const {
  // **** 样式生成相关 **** //
  createStyles,
  createGlobalStyle,
  createStylish,
  // **** 基础样式方法 **** //
  css,
  cx,
  keyframes,
  //****  样式表管理  **** //
  styleInstance: emotion,
  /**
   * @deprecated
   */
  injectGlobal,
  flush,
  hydrate,
  sheet,
  cache,
  getRegisteredStyles,
  // ***** 主题相关 ***** //
  EmotionContext,
  ThemeProvider,
  StyleProvider,
  useTheme,
  useEmotion,
} = styleInstance;
