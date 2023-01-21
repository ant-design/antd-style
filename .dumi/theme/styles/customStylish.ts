import { GetCustomStylish } from 'antd-style';

declare module 'antd-style' {
  interface CustomStylish extends SiteStylish {}
}

export interface SiteStylish {
  clickableText: string;
  resetLinkColor: string;
}

export const getCustomStylish: GetCustomStylish<SiteStylish> = ({ css, token }) => ({
  clickableText: css`
    cursor: pointer;
    color: ${token.colorTextSecondary};
    &:hover {
      color: ${token.colorText};
    }
  `,
  resetLinkColor: css`
    color: inherit;
    &:hover,
    &:active {
      color: inherit;
    }
  `,
});
