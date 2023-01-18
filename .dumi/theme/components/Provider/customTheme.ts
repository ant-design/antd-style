import { GetAntdTheme, GetCustomToken } from 'antd-style';

export const getAntdTheme: GetAntdTheme = () => {
  return undefined;
};

interface DumiThemeToken {
  headerHeight: number;
  sidebarWidth: number;
}
declare module 'antd-style' {
  interface CustomToken extends DumiThemeToken {}
}

export const getCustomToken: GetCustomToken<DumiThemeToken> = () => {
  return { headerHeight: 64, sidebarWidth: 260 };
};
