/**
 * title: 全局设定 Styled 配置
 * description: 在入口文件中设定 styled 的 ThemeContext 配置，可以让所有 ThemeProvider 都能响应自定义 token
 * iframe: 100
 */
import { setupStyled } from 'antd-style';
import { ThemeContext } from 'styled-components';

setupStyled({ ThemeContext });

import App from './App';

export default App;
