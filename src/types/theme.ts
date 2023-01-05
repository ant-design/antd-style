import { AliasToken } from 'antd/es/theme/interface';

export type AntdToken = AliasToken;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomToken {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomStylish {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomTheme extends CustomStylish, CustomToken {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Stylish extends CustomStylish {}

export interface FullToken extends AntdToken, CustomToken {}

export interface Theme extends FullToken {
  /**
   *  暂时不对外暴露
   *  @internal
   */
  stylish: Stylish;
}
