/**
 * title: ThemeProvider
 * description: 由于 ThemeProvider 没有有根 DOM 节点，因此无法修改原生节点样式（除非搭配 GlobalStyle，而搭配 GlobalStyle 则会污染全局样式）
 * iframe: 80
 */
import { ThemeProvider } from 'antd-style';
import App from './demo';

export default () => {
  return (
    <>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </>
  );
};
