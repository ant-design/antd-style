import { GetAntdTheme, GetCustomToken } from 'antd-style';

export const getAntdTheme: GetAntdTheme = () => {
  return undefined;
};

interface DumiThemeToken {
  headerHeight: number;
  sidebarWidth: number;
  tocWidth: number;
  /**
   * 文本内容的最大宽度 1152
   */
  contentMaxWidth: number;
}
declare module 'antd-style' {
  interface CustomToken extends DumiThemeToken {}
}

export const getCustomToken: GetCustomToken<DumiThemeToken> = () => {
  return { headerHeight: 64, sidebarWidth: 260, tocWidth: 176, contentMaxWidth: 1152 };
};
