import { createGlobalStyle, createStyles } from 'antd-style';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${(p) => p.theme.colorBgLayout};
  }
`;

export const useStyles = createStyles(({ css, token }) => ({
  layout: css`
    font-family: sans-serif;
    background-color: ${token.colorBgLayout};
    background-image: linear-gradient(
      180deg,
      ${token.colorBgContainer} 0%,
      rgba(255, 255, 255, 0) 10%
    );
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    > main {
      display: flex;
      height: 100%;

      > section {
        flex: 1;
        max-width: 100%;
      }
    }
  `,
  tocWrapper: css`
    position: sticky;
    top: 100px;
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
      font-size: 12px;
      line-height: 1;
    }
  `,
}));
