import { createStyles } from 'antd-style';
import chroma from 'chroma-js';

export type Breakpoint =
  | 'xxl'
  | 'xl'
  | 'lg'
  | 'md'
  /**
   *
   */
  | 'sm'
  /**
   * 最小断点，可以作为移动端的判断断点
   */
  | 'xs';

export type ResponseKey = Breakpoint | 'mobile' | 'tablet' | 'desktop' | 'wide';

// const r = {
//   xs: `@media (max-width: ${token.screenXSMax}px)`,
//   mobile: `@media (max-width: ${token.screenXSMax}px)`,
//   sm: `@media (max-width: ${token.screenSMMax}px)`,
//   md: `@media (max-width: ${token.screenMDMax}px)`,
//   lg: `@media (max-width: ${token.screenLGMax}px)`,
//   xl: `@media (max-width: ${token.screenXLMax}px)`,
//   xxl: `@media (min-width: ${token.screenXXLMin}px)`,
// };

export const useStyles = createStyles(({ token, css, stylish, isDarkMode }) => ({
  container: css`
    max-width: ${token.contentMaxWidth}px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: row dense;
    grid-auto-rows: 24px;
    gap: 16px;
    margin: 0 16px;

    @media (max-width: ${token.screenXSMax}px) {
      flex-direction: column;
      display: flex;
    }

    @media (max-width: ${token.screenMDMax}px) {
      grid-template-columns: repeat(2, 1fr);
    }

    // @media (min-width: ${token.screenXXLMin}px) {
    //   grid-template-columns: repeat(4, 1fr);
    //   max-width: 1540px;
    // }
  `,

  cell: css`
    z-index: 1;
    padding: 24px;
    border-radius: 24px;
    background: linear-gradient(135deg, ${token.colorFillContent}, ${token.colorFillQuaternary});
    position: relative;

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

  blur: css`
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    ${stylish.heroBlurBall};
    scale: 2;
    opacity: 0.05;
  `,
}));
