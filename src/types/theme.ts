import { ThemeConfig } from 'antd/es/config-provider/context';
import { AliasToken } from 'antd/es/theme/interface';

import { Emotion } from '@/functions';
import { ThemeAppearance, ThemeMode } from './appearance';

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

/**
 * 一组统一封装好的 antd 标准样式
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AntdStylish {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomToken {}

export interface CustomTokenParams extends AppearanceState {
  token: AntdToken;
}

export type GetCustomToken<T> = (theme: CustomTokenParams) => T;

export interface CustomStylishParams extends CommonStyleUtils, AppearanceState {
  token: FullToken;
  stylish: AntdStylish;
}

export type GetCustomStylish<S> = (theme: CustomStylishParams) => S;

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
