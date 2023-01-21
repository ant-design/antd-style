import type { GetAntdTheme, GetCustomToken, ThemeConfig } from 'antd-style';

import { GetCustomStylish } from 'antd-style';
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

interface SiteToken {
  headerHeight: number;
  sidebarWidth: number;
  tocWidth: number;
  /**
   * 文本内容的最大宽度 1152
   */
  contentMaxWidth: number;
}

export const getCustomToken: GetCustomToken<SiteToken> = () => {
  return { headerHeight: 64, sidebarWidth: 240, tocWidth: 176, contentMaxWidth: 1152 };
};

declare module 'antd-style' {
  interface CustomToken extends SiteToken {}
  interface CustomStylish extends SiteStylish {}
}

export interface SiteStylish {
  clickableText: string;
}

export const getCustomStylish: GetCustomStylish<SiteStylish> = ({ css, token }) => ({
  clickableText: css`
    color: ${token.colorTextSecondary};
    &:hover {
      color: ${token.colorText};
    }
  `,
});
