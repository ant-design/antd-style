import { ClassNamesArg } from '@emotion/css/create-instance';
import { CSSInterpolation, SerializedStyles } from '@emotion/serialize';
import { ThemeConfig } from 'antd/es/config-provider/context';

import { AtomInputType } from 'antd-style/src';
import { ThemeAppearance } from './appearance';
import { ResponsiveKey } from './response';
import type { AntdStylish, AntdToken, AppearanceState, FullToken } from './theme';

export interface EmotionReactCss {
  (template: TemplateStringsArray, ...args: Array<CSSInterpolation>): SerializedStyles;
  (...args: Array<CSSInterpolation>): SerializedStyles;
}

export type EmotionCX = (...classNames: ClassNamesArg[]) => string;

export type BreakpointMapParams = Partial<Record<ResponsiveKey, AtomInputType>>;

export interface ResponsiveStyleUtil extends Record<ResponsiveKey, string> {
  (breakpoints: BreakpointMapParams): any;
}

export interface CommonStyleUtils {
  cx: EmotionCX;
  css: EmotionReactCss;
  /**
   * 可以快速创建响应式样式的工具函数
   */
  r: ResponsiveStyleUtil;
}

/**
 * 获取 antd theme 配置
 */
export type GetAntdThemeConfig = (appearance: ThemeAppearance) => ThemeConfig | undefined;

export interface AntdStylishParams extends AppearanceState {
  token: AntdToken;
  css: EmotionReactCss;
}

/**
 * 创建 antd stylish 配置
 */
export type GetAntdStylish = (theme: AntdStylishParams) => {
  [T in keyof AntdStylish]: SerializedStyles;
};

export interface CustomTokenParams extends AppearanceState {
  token: AntdToken;
}

/**
 * 创建 自定义 token
 */
export type GetCustomToken<T> = (theme: CustomTokenParams) => T;

export interface CustomStylishParams extends AppearanceState {
  token: FullToken;
  stylish: AntdStylish;
  css: EmotionReactCss;
}

/**
 * 创建 自定义 stylish
 */
export type GetCustomStylish<S> = (theme: CustomStylishParams) => {
  [T in keyof S]: SerializedStyles;
};
