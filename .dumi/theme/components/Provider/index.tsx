import { App } from 'antd';
import { ThemeProvider } from 'antd-style';
import { PropsWithChildren } from 'react';

import { getAntdTheme, getCustomToken } from './customTheme';

export default ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider themeMode={'auto'} theme={getAntdTheme} customToken={getCustomToken}>
      <App>{children}</App>
    </ThemeProvider>
  );
};
