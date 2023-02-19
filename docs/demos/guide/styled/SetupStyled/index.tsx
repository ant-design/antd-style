/**
 * title: 全局设定 Styled 配置
 * description: 在入口文件中设定 styled 配置，可以让所有 ThemeProvider 都能响应自定义 token
 * iframe: 100
 */
import { setupStyled } from 'antd-style';
import { ThemeProvider as StyledThemeProvider, useTheme } from 'styled-components';

setupStyled({
  ThemeProvider: StyledThemeProvider,
  useTheme,
});

import App from './App';

export default App;
