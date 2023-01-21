import { GetAntdTheme, ThemeConfig } from 'antd-style';
import { darkAlgorithm, lightAlgorithm } from './algorithms';

export const getAntdTheme: GetAntdTheme = (appearance) => {
  const theme: ThemeConfig = {
    token: {
      colorTextBase: '#3d3e40',
    },
    algorithm: lightAlgorithm,
  };

  if (appearance === 'dark') {
    theme.token = {
      colorTextBase: '#a3b2cc',
    };

    theme.algorithm = darkAlgorithm;
  }

  return theme;
};
