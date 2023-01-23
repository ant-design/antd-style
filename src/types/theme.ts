import { ThemeConfig } from 'antd/es/config-provider/context';
import { AliasToken } from 'antd/es/theme/interface';

import { Emotion } from '@/functions';
import { CSSInterpolation, SerializedStyles } from '@emotion/serialize';
import { ThemeAppearance, ThemeMode } from './appearance';

export interface EmotionReactCss {
  (template: TemplateStringsArray, ...args: Array<CSSInterpolation>): SerializedStyles;
  (...args: Array<CSSInterpolation>): SerializedStyles;
}

export interface CommonStyleUtils {
  cx: Emotion['cx'];
  css: Emotion['css'];
}

export interface ThemeContextState {
  appearance: ThemeAppearance;
  themeMode: ThemeMode;
  isDarkMode: boolean;
}

export type AppearanceState = Omit<ThemeContextState, 'themeMode'>;
export type AntdToken = AliasToken;

export interface AntdStylishParams extends AppearanceState {
  token: AntdToken;
  css: EmotionReactCss;
}

export type GetAntdStylish = (theme: AntdStylishParams) => {
  [T in keyof AntdStylish]: SerializedStyles;
};

/**
 * 一组统一封装好的 antd 标准样式
 */
export interface AntdStylish {
  buttonDefaultHover: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomToken {}

export interface CustomTokenParams extends AppearanceState {
  token: AntdToken;
}

export type GetCustomToken<T> = (theme: CustomTokenParams) => T;

export interface CustomStylishParams extends AppearanceState {
  token: FullToken;
  stylish: AntdStylish;
  css: EmotionReactCss;
}

export type GetCustomStylish<S> = (theme: CustomStylishParams) => {
  [T in keyof S]: SerializedStyles;
};

export type GetAntdThemeConfig = (appearance: ThemeAppearance) => ThemeConfig | undefined;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomStylish {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomTheme extends CustomStylish, CustomToken {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FullStylish extends AntdStylish, CustomStylish {}

export interface AntdTheme extends AntdToken {
  stylish: AntdStylish;
}

export interface FullToken extends AntdToken, CustomToken {}

export interface Theme extends FullToken, ThemeContextState {
  stylish: FullStylish;

  prefixCls: string;
}
