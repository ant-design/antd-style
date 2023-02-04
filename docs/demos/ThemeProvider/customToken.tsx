/**
 * compact: true
 */
import { Divider } from 'antd';
import { ThemeProvider } from 'antd-style';
import { Container } from './style';
import App from './_app';

export default () => (
  <Container align={'center'} split={<Divider type={'vertical'} />} size={24}>
    <ThemeProvider>
      <App title={'antd Token'} tokenName={'colorPrimary'} />
    </ThemeProvider>
    <ThemeProvider customToken={{ customBrandColor: '#c956df' }}>
      <App title={'自定义 Token'} tokenName={'customBrandColor'} />
    </ThemeProvider>
    <App title={'未包裹 ThemeProvider 时使用自定义 Token 无效'} tokenName={'customBrandColor'} />
  </Container>
);
