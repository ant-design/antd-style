import { Typography } from 'antd';
import { createStyles, styled } from 'antd-style';

export const Label = styled(Typography.Text)`
  width: 100px;
`;

export const useStyles = createStyles(({ css, token, responsive: r, stylish }) => ({
  title: css`
    font-family: monospace;
    ${r.mobile} {
      margin-block: 0;
      font-size: 32px !important;
    }
  `,
  desc: css`
    font-size: ${token.fontSizeLG}px;
    line-height: ${token.lineHeightLG}px;
  `,
  text: css`
    ${stylish.clickableText}
  `,
}));
