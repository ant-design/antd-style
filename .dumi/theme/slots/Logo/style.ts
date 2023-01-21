import { createStyles } from 'antd-style';

export const useStyles = createStyles(
  ({ css, token }) => css`
    display: inline-flex;
    align-items: center;
    color: ${token.colorText};
    font-size: 22px;
    line-height: 1;
    font-weight: 500;
    text-decoration: none;

    @media @mobile {
      font-size: 18px;

      img {
        height: 32px;
      }
    }

    img {
      margin-inline-end: 10px;
      height: 40px;

      @media @mobile {
        height: 32px;
      }
    }
  `,
);
