import { createStyles } from 'antd-style';
import chroma from 'chroma-js';

export const useStyles = createStyles(({ token, css, stylish, isDarkMode }) => ({
  container: css`
    max-width: ${token.contentMaxWidth}px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    position: relative;

    &:after {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      ${isDarkMode ? stylish.heroGradient : ''};
      border-radius: 24px;
      content: '';
      inset: 0;
      opacity: 0.05;
    }
  `,

  cell: css`
    z-index: 1;
    padding: 24px;
    border-radius: 24px;
    ${isDarkMode
      ? css`
          background: linear-gradient(
            135deg,
            ${token.colorFillSecondary},
            ${token.colorFillQuaternary}
          );
        `
      : css`
          background: ${token.colorFillTertiary};
        `}

    h3 {
      font-size: 20px;
      color: ${token.colorText};
    }
    p {
      color: ${token.colorTextSecondary};
    }
  `,
  imgContainer: css`
    background: ${token.colorFillContent};
    background: linear-gradient(
      135deg,
      ${chroma(token.gradientColor2).brighten(1).hex()},
      ${token.gradientColor2} 50%,
      ${token.gradientColor1}
    );
    border-radius: 8px;
    opacity: 0.8;

    &[image-style='light'] {
      background: ${token.colorBgContainer};
    }
  `,

  img: css`
    width: 20px;
    height: 20px;
    color: ${token.colorWhite};
  `,
  link: css`
    margin-top: 24px;

    a {
      ${stylish.resetLinkColor};

      color: ${token.colorTextDescription};
      &:hover {
        color: ${token.colorPrimaryHover};
      }
    }
  `,
}));
