import { App } from 'antd';
import { ThemeProvider } from 'antd-style';
import { PropsWithChildren } from 'react';

import { useThemeStore } from '../../store/useThemeStore';
import { getAntdTheme, getCustomToken } from './customTheme';

export default ({ children }: PropsWithChildren) => {
  const themeMode = useThemeStore((s) => s.themeMode);

  return (
    <ThemeProvider themeMode={themeMode} theme={getAntdTheme} customToken={getCustomToken}>
      <App>{children}</App>
    </ThemeProvider>
  );
};
