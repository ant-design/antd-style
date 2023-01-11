/**
 * compact: true
 * title: 传入 Antd Theme 主题
 * description: 传入不同的 token 、算法组成的 theme ，可以实现主题风格的自定义
 */
import { Divider, theme } from 'antd';
import { ThemeProvider } from 'antd-style';

import App from '../../../common/demo';
import CustomDark from './CustomDark';

const themeConfig = {
  token: { colorPrimary: '#000000' },
  algorithm: theme.compactAlgorithm,
};
export default () => {
  return (
    <>
      <ThemeProvider theme={themeConfig}>
        <App />
      </ThemeProvider>
      <Divider orientation={'left'}>定制主题： ☝️修改主色与紧凑模式 👇 自定义暗色风格</Divider>
      <CustomDark />
    </>
  );
};
