import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token, stylish, isDarkMode }) => {
  return {
    button: css`
      border: none;
      //background: #1677FF;
      //background: #f2056f;

      ${{
        background: isDarkMode
          ? `linear-gradient(90deg, ${token.blue} 0%, ${token.pink} 100%);`
          : `linear-gradient(90deg, ${token.blue} 0%, ${token.cyan} 100%);`,
      }}

      ${stylish.heroGradientFlow}

      background-size: 200% 100%;

      &:hover {
        animation: none;
      }
    `,
  };
});
