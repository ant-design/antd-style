import type { GetCustomToken } from 'antd-style';

declare module 'antd-style' {
  interface CustomToken extends SiteToken {}
}

interface SiteToken {
  headerHeight: number;
  sidebarWidth: number;
  tocWidth: number;
  /**
   * 文本内容的最大宽度 1152
   */
  contentMaxWidth: number;

  gradientColor1: string;
  gradientColor2: string;
  gradientColor3: string;

  heroBgGradient: string;
}

export const getCustomToken: GetCustomToken<SiteToken> = ({ isDarkMode, token }) => {
  const gradientColor1 = token.blue;
  const gradientColor2 = isDarkMode ? token.pink : token.cyan;
  const gradientColor3 = token.purple;

  return {
    headerHeight: 64,
    sidebarWidth: 240,
    tocWidth: 176,
    contentMaxWidth: 1152,

    gradientColor1,
    gradientColor2,
    gradientColor3,
    heroBgGradient: `radial-gradient(at 80% 20%, ${gradientColor1} 0%, ${gradientColor2} 80%, ${gradientColor3} 130%)`,
  };
};
