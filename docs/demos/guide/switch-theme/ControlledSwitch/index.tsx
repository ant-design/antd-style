/**
 * compact: true
 * title: 受控模式下的主题切换
 * description: 该 Demo 中演示了受控模式的主题切换能力，使用了 zustand 作为全局状态管理方案。
 */
import { ThemeProvider } from 'antd-style';

import App from '../../../common/demo';
import Controller from './Controller';
import { useStore } from './useStore';

export default () => {
  const themeMode = useStore();

  return (
    <ThemeProvider themeMode={themeMode}>
      <App extra={<Controller />} />
    </ThemeProvider>
  );
};
