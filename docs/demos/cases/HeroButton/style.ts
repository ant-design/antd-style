import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => {
  const blush = css`
    position: absolute;
    bottom: -15px;
    width: 100px;
    height: 30px;
    filter: blur(20px);
  `;

  return {
    container: css`
      position: relative;
    `,
    button: css`
      border: none;
      //background: #1677FF;
      //background: #f2056f;
      //background: ${token.purple};
      &:hover {
        background: linear-gradient(
          90deg,
          ${token.blue} 0%,
          ${token.geekblue} 30%,
          ${token.cyan} 70%
        );
      }

      canvas {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    `,
    pink: css`
      ${blush};
      right: 20px;
      z-index: 10;
      background: ${token.cyan};
    `,
    blue: css`
      ${blush};
      right: 20px;
      z-index: 10;
      background: ${token.purple};
    `,

    canvas: css`
      z-index: 20;
      position: absolute;
      top: -100px;
      bottom: -100px;
      left: -100px;
      right: -100px;
      width: calc(100% + 200px);
      pointer-events: none;
    `,
  };
});
