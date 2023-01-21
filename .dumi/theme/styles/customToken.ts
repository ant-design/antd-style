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
}

export const getCustomToken: GetCustomToken<SiteToken> = () => {
  return { headerHeight: 64, sidebarWidth: 240, tocWidth: 176, contentMaxWidth: 1152 };
};
