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
      ${isDarkMode
        ? stylish.heroGradient
        : css`
            background: linear-gradient(135deg, ${token.colorFill}, ${token.colorBgLayout});
          `};
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
    background: linear-gradient(135deg, ${token.colorFillContent}, ${token.colorFillQuaternary});

    h3 {
      font-size: 20px;
      color: ${token.colorText};
    }
    p {
      color: ${token.colorTextSecondary};

      quotient {
        color: ${token.colorTextDescription};
        display: block;
        margin: 12px 0;
        padding-left: 12px;
        position: relative;
        &:before {
          position: absolute;
          content: '';
          left: 0;
          display: block;
          border-radius: 2px;
          width: 4px;
          height: 100%;
          background: ${isDarkMode ? token.colorPrimary : token.colorPrimaryBgHover};
        }
      }
    }
  `,
  imgContainer: css`
    background: ${token.colorFillContent};
    border-radius: 8px;
    opacity: 0.8;

    &[image-style='primary'] {
      background: linear-gradient(135deg, ${token.gradientColor1}, ${token.gradientColor2});
    }

    &[image-style='light'] {
      background: ${token.colorBgContainer};
    }

    &[image-style='soon'] {
      opacity: 0.5;
      background: linear-gradient(
        135deg,
        ${chroma(token.gradientColor2).alpha(0.3).hex()},
        ${chroma(token.gradientColor2).alpha(0.3).hex()} 50%,
        ${chroma(token.gradientColor1).alpha(0.3).hex()}
      );
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
