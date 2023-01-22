import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token, stylish, isDarkMode }) => ({
  container: css`
    position: relative;
    //margin: -@s-header-height - 20 auto -160px auto;
    // max-width: ${token.contentMaxWidth}px;
    //height: 932px;
    padding-top: 80px;
    text-align: center;
    box-sizing: border-box;

    @media @mobile {
      //margin-top: -@s-header-height-m - 20;
      padding-top: 160px;
      height: 660px;
    }

    + * {
      position: relative;
    }

    > p {
      margin: 32px;
      color: ${token.colorTextSecondary};
      font-size: 20px;
      line-height: 1.6;

      @media @mobile {
        font-size: 16px;
      }
    }
  `,

  titleContainer: css`
    position: relative;
  `,
  title: css`
    font-size: 68px;
    z-index: 10;
    color: transparent;
    margin: 0;
    font-family: AliPuHui, ${token.fontFamily};

    @font-face {
      font-family: 'AliPuHui';
      src: url('https://at.alicdn.com/wf/webfont/exMpJIukiCms/Gsw2PSKrftc1yNWMNlXgw.woff2')
          format('woff2'),
        url('https://at.alicdn.com/wf/webfont/exMpJIukiCms/vtu73by4O2gEBcvBuLgeu.woff')
          format('woff');
    }

    b {
      position: relative;
      z-index: 5;
      ${stylish.heroGradient};
      ${stylish.heroGradientFlow}

      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `,
  titleShadow: css`
    position: absolute;
    z-index: 0;
    color: ${isDarkMode ? token.colorWhite : token.colorTextBase};

    top: 0;
    left: 0;
    font-size: 68px;

    font-family: AliPuHui, ${token.fontFamily};

    ${stylish.heroTextShadow}

    b {
      color: transparent;
    }
  `,

  desc: css`
    font-size: ${token.fontSizeHeading3}px;
    color: ${token.colorTextSecondary};
  `,

  actions: css`
    margin-top: 48px;
    display: flex;
    justify-content: center;
  `,
  canvas: css`
    z-index: 10;
    pointer-events: none;
    position: absolute;
    top: -250px;
    left: 50%;
    transform: translateX(-50%) scale(1.5);
    width: 600px;
    height: 400px;
    opacity: 0.2;
    ${stylish.heroBlurBall}
  `,
}));
