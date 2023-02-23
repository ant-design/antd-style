import { cache } from '@emotion/css';
import { createContext, useContext } from 'react';

import { createCSS, createEmotion, serializeCSS } from '@/core';

import { createEmotionContext } from '@/factories/createEmotionContext';
import { createGlobalStyleFactory } from '@/factories/createGlobalStyle';
import { createStylishFactory } from '@/factories/createStyish';
import { createStyleProvider } from '@/factories/createStyleProvider';
import { createStylesFactory } from '@/factories/createStyles';
import { createThemeProvider, ThemeProviderProps } from '@/factories/createThemeProvider';
import { createUseTheme } from '@/factories/createUseTheme';

import { HashPriority, StyledConfig, StyleManager, Theme } from '@/types';
import { EmotionCache } from '@emotion/css/create-instance';

declare global {
  // eslint-disable-next-line no-var
  var __CSSINJS_EMOTION_CACHE_MAP__: { custom?: boolean; cache: EmotionCache }[];
}

global.__CSSINJS_EMOTION_CACHE_MAP__ = [{ cache }];

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
  if (global.__CSSINJS_EMOTION_CACHE_MAP__.findIndex((e) => e.cache === emotion.cache) === -1) {
    global.__CSSINJS_EMOTION_CACHE_MAP__.push({ custom: true, cache: emotion.cache });
  }

  const { cache, injectGlobal, keyframes } = emotion;

  const { cx } = createCSS(cache, options.hashPriority);

  // ******* 下面这些都和主题相关，如果做了任何改动，都需要排查一遍 ************* //

  const CustomThemeContext = createContext<T>(
    (options.customToken ? options.customToken : {}) as T,
  );

  const styledUseTheme = options.styled?.useTheme as () => Theme;

  const useTheme = createUseTheme({
    prefixCls: options?.prefixCls,
    CustomThemeContext,
    styledUseTheme,
  });

  const createStyles = createStylesFactory({
    cache,
    hashPriority: options.hashPriority,
    useTheme,
  });
  const createGlobalStyle = createGlobalStyleFactory(useTheme);

  const createStylish = createStylishFactory(createStyles);

  const ThemeProvider = createThemeProvider({
    styledConfig: options.styled,
    CustomThemeContext,
    prefixCls: options.prefixCls,
    customToken: options.customToken,
  });

  // ******** 上面这些都和主题相关，如果做了任何改动，都需要排查一遍 ************ //

  const EmotionContext = createEmotionContext(emotion);

  const StyleProvider = createStyleProvider(EmotionContext, {
    speedy: options.speedy,
    prefix: defaultKey,
  });

  const useEmotion = () => useContext(EmotionContext);

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
    /**
     * @deprecated
     */
    injectGlobal,

    //******************** //
    //****  样式表管理  **** //
    //******************** //
    styleManager: emotion as StyleManager,
    // ******************** //
    // ***** 主题相关 ***** //
    // ******************** //
    useTheme,
    EmotionContext,
    useEmotion,
    StyleProvider,
    ThemeProvider,
  };
};
