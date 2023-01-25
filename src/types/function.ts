import { ClassNamesArg } from '@emotion/css/create-instance';
import { CSSInterpolation, SerializedStyles } from '@emotion/serialize';
import { ThemeConfig } from 'antd/es/config-provider/context';

import { ThemeAppearance } from './appearance';
import type { AntdStylish, AntdToken, AppearanceState, FullToken } from './theme';

export interface EmotionReactCss {
  (template: TemplateStringsArray, ...args: Array<CSSInterpolation>): SerializedStyles;
  (...args: Array<CSSInterpolation>): SerializedStyles;
}
export type EmotionCX = (...classNames: ClassNamesArg[]) => string;

export interface CommonStyleUtils {
  cx: EmotionCX;
  css: EmotionReactCss;
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
