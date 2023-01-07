/**
 * iframe: 240
 */
import { Button, Space } from 'antd';
import { AppContainer, message, modal, notification } from 'antd-style';
import { Center } from 'react-layout-kit';

const App = () => {
  const showMessage = () => {
    message.success('Success!');
  };

  const showModal = () => {
    modal.warning({
      title: 'This is a warning message',
      content: 'some messages...some messages...',
      centered: true,
      maskClosable: true,
    });
  };

  const showNotification = () => {
    notification.info({
      message: `Notification`,
      description: 'Hello, Ant Design Style',
    });
  };

  return (
    <Space>
      <Button onClick={showMessage}>Open message</Button>
      <Button onClick={showModal}>Open modal</Button>
      <Button onClick={showNotification}>Open notification</Button>
    </Space>
  );
};

export default () => {
  return (
    <Center style={{ height: '100vh', background: '#f5f5f5' }}>
      <AppContainer>
        <App />
      </AppContainer>
    </Center>
  );
};
