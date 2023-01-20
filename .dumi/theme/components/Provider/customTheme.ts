import type { GetAntdTheme, GetCustomToken, ThemeConfig } from 'antd-style';

import { darkAlgorithm, lightAlgorithm } from './algorithms';

export const getAntdTheme: GetAntdTheme = (appearance) => {
  const theme: ThemeConfig = {
    token: {
      colorTextBase: '#3d3e40',
    },
    algorithm: lightAlgorithm,
  };

  if (appearance === 'dark') {
    theme.token = {
      colorTextBase: '#a3b2cc',
    };

    theme.algorithm = darkAlgorithm;
  }

  return theme;
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
  return { headerHeight: 64, sidebarWidth: 240, tocWidth: 176, contentMaxWidth: 1152 };
};
