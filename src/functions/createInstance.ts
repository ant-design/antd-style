import { FC, useContext } from 'react';

import {
  createClassNameGenerator,
  createCX,
  createEmotion,
  PedestalProvider,
  serializeCSS,
  useTheme as defaultUseTheme,
} from '@/core';
import { createEmotionContext } from '@/factories/createEmotionContext';
import { createGlobalStyleFactory } from '@/factories/createGlobalStyle';
import { createStylishFactory } from '@/factories/createStyish';
import { createStyleProvider } from '@/factories/createStyleProvider';
import { createStylesFactory } from '@/factories/createStyles';
import { createThemeProvider, StyledThemeProvider } from '@/factories/createThemeProvider';
import { createUseTheme } from '@/factories/createUseTheme';
import { HashPriority, Theme } from '@/types';

interface CreateOptions<T = any> {
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

  ThemeProvider?: any;
  styled?: {
    ThemeProvider?: FC<{ theme: T }>;
    useTheme?: () => T;
  };
}

/**
 * Creates a new instance of antd-style
 * 创建一个新的 antd-style 实例
 */
export const createInstance = <T = any>(options: CreateOptions<T>) => {
  const defaultKey = options.key || 'ant-css';

  const styledUseTheme = (options.styled?.useTheme || defaultUseTheme) as () => Theme;

  const defaultThemeProvider = (options.styled?.ThemeProvider ||
    PedestalProvider) as StyledThemeProvider;

  const emotion = createEmotion({
    key: defaultKey,
    speedy: options.speedy,
  });

  const { cache, sheet, hydrate, keyframes, flush, merge, getRegisteredStyles } = emotion;

  const classNameGenerator = createClassNameGenerator(cache, options.hashPriority);
  const cx = createCX(classNameGenerator, emotion.cx);

  const useTheme = createUseTheme(styledUseTheme);

  const createStyles = createStylesFactory({
    cache,
    cx: emotion.cx,
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

  const ThemeProvider = createThemeProvider(defaultThemeProvider, useTheme);

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

    //******************** //
    //****  样式表管理  **** //
    //******************** //
    cache,
    sheet,
    flush,
    merge,
    hydrate,
    getRegisteredStyles,
    emotion,
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
