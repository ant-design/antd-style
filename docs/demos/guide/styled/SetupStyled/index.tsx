/**
 * title: styled-components
 * description: 只有注入了 styled-components 的 ThemeProvider ，才能响应自定义 token
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
