/**
 * iframe: 240
 */
import { Button, Space } from 'antd';
import { AppContainer, message, modal, notification } from 'antd-style';

const App = () => {
  const showMessage = () => {
    message.success('Success!');
  };

  const showModal = () => {
    modal.warning({
      title: 'This is a warning message',
      content: 'some messages...some messages...',
    });
  };

  const showNotification = () => {
    notification.info({
      message: `Notification topLeft`,
      description: 'Hello, Ant Design!!',
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
    <>
      <AppContainer appearance={'dark'}>
        <App />
      </AppContainer>
    </>
  );
};
