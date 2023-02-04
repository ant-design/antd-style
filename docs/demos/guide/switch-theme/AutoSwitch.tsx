/**
 * iframe: 460
 * title: 自动响应系统主题
 * description: 当切换系统的主题时，该 demo 会响应系统主题的切换，用户无需做任何操作
 */
import { ThemeProvider } from 'antd-style';

import App from '../../common/demo';

export default () => {
  return (
    <ThemeProvider themeMode={'auto'}>
      <App />
    </ThemeProvider>
  );
};
