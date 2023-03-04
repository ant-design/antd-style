/**
 * defaultShowCode: true
 * codePlacement: left
 */
import { Divider } from 'antd';
import { ThemeProvider } from 'antd-style';
import { Container } from './style';
import App from './_app';

export default () => (
  <Container align={'center'} split={<Divider type={'vertical'} />} size={24}>
    <ThemeProvider theme={{ token: { colorPrimary: '#363eba' } }}>
      <App title={'包裹 ThemeProvider'} tokenName={'colorPrimary'} />
    </ThemeProvider>
    <App title={'未包裹 ThemeProvider 会显示默认值'} tokenName={'colorPrimary'} />
  </Container>
);
