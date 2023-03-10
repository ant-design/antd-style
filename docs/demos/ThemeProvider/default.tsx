/**
 * compact: true
 */
import { Divider, Space } from 'antd';
import { ThemeProvider } from 'antd-style';
import App from './_app';

export default () => (
  <Space
    align={'center'}
    split={<Divider type={'vertical'} />}
    style={{ padding: 40, background: '#fafafa' }}
    size={24}
  >
    <ThemeProvider>
      <App title={'包裹 ThemeProvider'} tokenName={'colorPrimary'} />
    </ThemeProvider>
    <App title={'未包裹 ThemeProvider'} tokenName={'colorPrimary'} />
  </Space>
);
