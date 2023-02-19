import { css, GetCustomStylish, GetCustomToken } from 'antd-style';

interface ClayToken {
  clayBg: string;
  clayBorderRadius: number;
  clayShadowOutset: string;
  clayShadowInsetPrimary: string;
  clayShadowInsetSecondary: string;
}

interface ClayStylish {
  clay: string;
}

declare module 'antd-style' {
  interface CustomToken extends ClayToken {}
  interface CustomStylish extends ClayStylish {}
}

export const getClayToken: GetCustomToken<ClayToken> = (theme) => {
  return {
    clayBg: 'rgba(0, 0, 0, 0.05)',
    clayBorderRadius: 32,
    clayShadowOutset: '8px 8px 16px 0 rgba(0, 0, 0, 0.25)',
    clayShadowInsetPrimary: '-8px -8px 16px 0 rgba(0, 0, 0, 0.25)',
    clayShadowInsetSecondary: '8px 8px 16px 0 rgba(255, 255, 255, 0.2)',
  };
};

export const getClayStylish: GetCustomStylish<any> = ({ token }) => ({
  clay: css`
    background: ${token.clayBg};
    border-radius: ${token.clayBorderRadius}px;
    box-shadow: ${token.clayShadowOutset}, inset ${token.clayShadowInsetPrimary};
  `,
});
