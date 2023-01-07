import { ThemeConfig } from 'antd/es/config-provider/context';
import { AliasToken } from 'antd/es/theme/interface';
import { ThemeAppearance, ThemeMode } from './appearance';

export interface ThemeContextState {
  appearance: ThemeAppearance;
  themeMode: ThemeMode;
  isDarkMode: boolean;
}

export type AntdToken = AliasToken;

/**
 * 一组统一封装好的 antd 标准样式
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AntdStylish {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomToken {}

export type GetCustomToken<T> = (theme: {
  token: AntdToken;
  appearance: ThemeAppearance;
  isDarkMode: boolean;
}) => T;

export type GetCustomStylish<S> = (theme: {
  token: FullToken;
  stylish: AntdStylish;
  appearance: ThemeAppearance;
  isDarkMode: boolean;
}) => S;

export type GetAntdThemeConfig = (appearance: ThemeAppearance) => ThemeConfig | undefined;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomStylish {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomTheme extends CustomStylish, CustomToken {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Stylish extends AntdStylish, CustomStylish {}

export interface AntdTheme extends AntdToken {
  stylish: AntdStylish;
}

export interface FullToken extends AntdToken, CustomToken {}

export interface Theme extends FullToken, ThemeContextState {
  stylish: Stylish;
}
