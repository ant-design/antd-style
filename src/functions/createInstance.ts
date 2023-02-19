import { useContext } from 'react';

import { createClassNameGenerator, createCX, createEmotion, serializeCSS } from '@/core';

import { createEmotionContext } from '@/factories/createEmotionContext';
import { createGlobalStyleFactory } from '@/factories/createGlobalStyle';
import { createStylishFactory } from '@/factories/createStyish';
import { createStyleProvider } from '@/factories/createStyleProvider';
import { createStylesFactory } from '@/factories/createStyles';
import { createThemeProvider, ThemeProviderProps } from '@/factories/createThemeProvider';
import { createUseTheme } from '@/factories/createUseTheme';

import { HashPriority, StyledConfig, StyleManager, Theme } from '@/types';

export interface CreateOptions<T> {
  /**
   * 生成的 css 关键词
   * @default ant-css
   */
  key?: string;
  /**
   * 是否开启急速模式
   *
   * @default false
   */
  speedy?: boolean;
  hashPriority?: HashPriority;

  ThemeProvider?: Omit<ThemeProviderProps<T>, 'children'>;
  styled?: StyledConfig;
}

/**
 * Creates a new instance of antd-style
 * 创建一个新的 antd-style 实例
 */
export const createInstance = <T = any>(options: CreateOptions<T>) => {
  const defaultKey = options.key || 'ant-css';

  const styledUseTheme = options.styled?.useTheme as () => Theme;

  const emotion = createEmotion({ key: defaultKey, speedy: options.speedy });

  const { cache, injectGlobal, keyframes } = emotion;

  const classNameGenerator = createClassNameGenerator(cache, options.hashPriority);
  const cx = createCX(cache, classNameGenerator);

  const useTheme = createUseTheme(styledUseTheme);

  const createStyles = createStylesFactory({
    cache,
    styledUseTheme,
    hashPriority: options.hashPriority,
  });

  const createGlobalStyle = createGlobalStyleFactory(useTheme);

  const createStylish = createStylishFactory(createStyles);

  const EmotionContext = createEmotionContext(emotion);

  const StyleProvider = createStyleProvider(EmotionContext, {
    speedy: options.speedy,
    prefix: defaultKey,
  });

  const ThemeProvider = createThemeProvider(options.styled);

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
