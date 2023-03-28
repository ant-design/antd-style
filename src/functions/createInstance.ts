import { createContext } from 'react';

import { CacheManager, createCSS, createEmotion, serializeCSS } from '@/core';

import { createEmotionContext } from '@/factories/createEmotionContext';
import { createGlobalStyleFactory } from '@/factories/createGlobalStyle';
import { createStylishFactory } from '@/factories/createStyish';
import { createStyleProvider } from '@/factories/createStyleProvider';
import { createStylesFactory } from '@/factories/createStyles';
import { createThemeProvider, ThemeProviderProps } from '@/factories/createThemeProvider';
import { createUseTheme } from '@/factories/createUseTheme';

import { HashPriority, StyledConfig, StyleEngine, StyleManager } from '@/types';

// 为 SSR 添加一个全局的 cacheManager，用于统一抽取 ssr 样式
declare global {
  // eslint-disable-next-line no-var
  var __ANTD_STYLE_CACHE_MANAGER_FOR_SSR__: CacheManager;
}
const cacheManager = new CacheManager();

if (typeof global !== 'undefined') {
  global.__ANTD_STYLE_CACHE_MANAGER_FOR_SSR__ = cacheManager;
}

export interface CreateOptions<T> {
  /**
   * 生成的 css 关键词
   * @default ant-css
   */
  key?: string;

  /**
   * 默认的组件 prefixCls
   */
  prefixCls?: string;
  /**
   * 是否开启急速模式
   *
   * @default false
   */
  speedy?: boolean;
  /**
   * 默认的自定义 Token
   */
  customToken?: T;
  hashPriority?: HashPriority;

  ThemeProvider?: Omit<ThemeProviderProps<T>, 'children'>;
  styled?: StyledConfig;
}

/**
 * Creates a new instance of antd-style
 * 创建一个新的 antd-style 实例
 */
export const createInstance = <T = any>(options: CreateOptions<T>) => {
  const defaultKey = options.key || 'css';

  const emotion = createEmotion({ key: defaultKey, speedy: options.speedy });

  // 将 cache 存到一个全局
  cacheManager.add(emotion.cache);

  const { cache, injectGlobal, keyframes } = emotion;

  const { cx } = createCSS(cache, options.hashPriority);

  // ******* 下面这些都和主题相关，如果做了任何改动，都需要排查一遍 ************* //

  const CustomThemeContext = createContext<T>(
    (options.customToken ? options.customToken : {}) as T,
  );

  const styledThemeContext = options.styled?.ThemeContext;

  const StyleEngineContext = createContext<StyleEngine>({
    CustomThemeContext,
    StyledThemeContext: styledThemeContext,
    prefixCls: options?.prefixCls,
  });

  const useTheme = createUseTheme({ StyleEngineContext });

  const createStyles = createStylesFactory({
    cache,
    hashPriority: options.hashPriority,
    useTheme,
  });

  const createGlobalStyle = createGlobalStyleFactory(useTheme);

  const createStylish = createStylishFactory(createStyles);

  const ThemeProvider = createThemeProvider({
    styledConfig: options.styled,
    StyleEngineContext,
    useTheme,
  });

  // ******** 上面这些都和主题相关，如果做了任何改动，都需要排查一遍 ************ //

  const EmotionContext = createEmotionContext(emotion);

  const StyleProvider = createStyleProvider(EmotionContext, {
    speedy: options.speedy,
    prefix: defaultKey,
  });

  return {
    // ******************** //
    // **** 样式生成相关 **** //
    // ******************** //
    createStyles,
    createGlobalStyle,
    createStylish,
    // ******************** //
    // **** 基础样式方法 **** //
    // ******************** //
    css: serializeCSS,
    cx,
    keyframes,
    injectGlobal,

    //******************** //
    //****  样式表管理  **** //
    //******************** //
    styleManager: emotion as StyleManager,
    // ******************** //
    // ***** 主题相关 ***** //
    // ******************** //
    useTheme,
    StyleProvider,
    ThemeProvider,
  };
};
