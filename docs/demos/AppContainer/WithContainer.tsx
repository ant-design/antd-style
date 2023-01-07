/**
 * title: AppContainer
 * description: 由于 AppContainer 有 DOM 节点，能限制作用域来修改 DOM 原生样式，因此可以重置原生节点样式。建议将其作为应用的顶层节点包裹
 * iframe: 80
 */
import { AppContainer } from 'antd-style';
import App from './demo';

export default () => {
  return (
    <>
      <AppContainer>
        <App />
      </AppContainer>
    </>
  );
};
