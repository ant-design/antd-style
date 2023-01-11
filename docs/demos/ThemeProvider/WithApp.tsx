/**
 * title: ThemeProvider + App
 * description: 由于 App 有 DOM 节点，能限制作用域来修改 DOM 原生样式，因此可以重置原生节点样式
 * iframe: 80
 */
import { App } from 'antd';
import { ThemeProvider } from 'antd-style';

import Demo from './demo';

export default () => {
  return (
    <ThemeProvider>
      <App>
        <Demo />
      </App>
    </ThemeProvider>
  );
};
