import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  container: css``,
  desc: css`
    font-size: ${token.fontSizeLG}px;
    line-height: ${token.lineHeightLG}px;
  `,
}));
