import { createGlobalStyle, createStyles } from 'antd-style';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${(p) => p.theme.colorBgLayout};
  }

  .dumi-default-content {
    max-width: 1152px;
    margin-top: 24px;
  }
`;

export const useStyles = createStyles(({ css, token }) => ({
  layout: css`
    font-family: sans-serif;
    background-color: ${token.colorBgLayout};

    > main {
      display: flex;

      > section {
        flex: 1;
        max-width: 100%;
      }
    }
  `,
  tocWrapper: css`
    position: sticky;
    top: 126px;
    width: 184px;
    margin-inline-end: 24px;
    max-height: 80vh;
    overflow: auto;
    margin-top: 48px;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;

    > h4 {
      margin: 0 0 8px;
      color: ${token.colorTextDescription};
      font-size: 13px;
      line-height: 1;
    }
  `,
}));
