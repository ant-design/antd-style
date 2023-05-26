/**
 * iframe: 500
 * title: 使用 useThemeMode 切换主题
 * description: 该 Demo 中演示了使用 useThemeMode 切换主题的能力
 */
import { ThemeProvider } from 'antd-style';

import App from '../../../common/demo';
import Controller from './Controller';

export default () => {
  return (
    <ThemeProvider defaultThemeMode={'auto'}>
      <App extra={<Controller />} />
    </ThemeProvider>
  );
};
