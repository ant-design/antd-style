/**
 * iframe: 460
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
