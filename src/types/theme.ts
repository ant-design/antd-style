import { ThemeConfig } from 'antd';
import { MappingAlgorithm } from 'antd/es/config-provider/context';
import { AliasToken } from 'antd/es/theme/interface';

import { ThemeAppearance, ThemeMode } from './appearance';

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
export interface AntdStylish {
  buttonDefaultHover: string;
}

export interface GetAntdTheme {
  (appearance: ThemeAppearance): ThemeConfig | undefined;
}
export type { MappingAlgorithm };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomToken {}

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
  /**
   * antd 组件的 prefixCls
   */
  prefixCls: string;
}
