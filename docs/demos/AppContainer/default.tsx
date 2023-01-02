/**
 * iframe: true
 */
import { Button, Divider, Space } from 'antd';
import { AppContainer, message } from 'antd-style';

const App = () => {
  return (
    <Space>
      <Button
        onClick={() => {
          message.success('成功');
        }}
      >
        打开 message
      </Button>
      <a href="">节点样式</a>
    </Space>
  );
};
export default () => {
  return (
    <>
      <AppContainer appearance={'dark'}>
        <App />
      </AppContainer>

      <Divider>没有包裹</Divider>

      <App />
    </>
  );
};
