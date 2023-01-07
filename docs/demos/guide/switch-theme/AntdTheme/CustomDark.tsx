import { AppContainer } from 'antd-style';

import { theme } from 'antd';
import { MappingAlgorithm, ThemeConfig } from 'antd/es/config-provider/context';
import App from '../../../common/demo';

/**
 * 自定义主题算法
 * @param seedToken
 * @param mapToken
 */
const customDarkAlgorithm: MappingAlgorithm = (seedToken, mapToken) => {
  const mergeToken = theme.darkAlgorithm(seedToken, mapToken);

  return {
    ...mergeToken,
    // Layout 颜色
    colorBgLayout: '#20252b',
    // 容器颜色
    colorBgContainer: '#282c34',
    // 悬浮类面板颜色
    colorBgElevated: '#32363e',
  };
};

const darkThemeConfig: ThemeConfig = {
  token: { borderRadius: 2 },
  algorithm: [customDarkAlgorithm],
};

export default () => (
  <AppContainer
    themeMode={'auto'}
    theme={(appearance) => (appearance === 'dark' ? darkThemeConfig : undefined)}
  >
    <App />
  </AppContainer>
);
