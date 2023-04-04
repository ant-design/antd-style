/**
 * compact: true
 * defaultShowCode: true
 * codePlacement: left
 */
import { ThemeProvider, useTheme } from 'antd-style';
import { Flexbox } from 'react-layout-kit';
import App from './_app';

export default () => {
  const theme = useTheme();
  return (
    <Flexbox padding={24} gap={24} style={{ background: theme.colorBgLayout }}>
      <ThemeProvider>
        <App title={'antd Token'} tokenName={'colorPrimary'} />
      </ThemeProvider>
      <ThemeProvider customToken={{ customBrandColor: '#c956df' }}>
        <App title={'自定义 Token'} tokenName={'customBrandColor'} />
      </ThemeProvider>
      <App title={'未包裹 ThemeProvider 时使用自定义 Token 无效'} tokenName={'customBrandColor'} />
    </Flexbox>
  );
};
