/**
 * iframe: 240
 */
import { Button, Space } from 'antd';
import { ThemeProvider } from 'antd-style';
import { MessageInstance } from 'antd/es/message/interface';
import { ModalStaticFunctions } from 'antd/es/modal/confirm';
import { NotificationInstance } from 'antd/es/notification/interface';
import { Center } from 'react-layout-kit';

let message: MessageInstance,
  modal: Omit<ModalStaticFunctions, 'warn'>,
  notification: NotificationInstance;

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
      <Button type={'primary'} onClick={showMessage}>
        Open message
      </Button>
      <Button onClick={showModal}>Open modal</Button>
      <Button onClick={showNotification}>Open notification</Button>
    </Space>
  );
};

export default () => {
  return (
    <Center style={{ height: '100vh', background: '#f5f5f5' }}>
      <ThemeProvider
        theme={{
          token: { colorPrimary: '#5bdbe6', colorInfo: '#5bdbe6', borderRadius: 2 },
        }}
        getStaticInstance={(instances) => {
          message = instances.message;
          modal = instances.modal;
          notification = instances.notification;
        }}
      >
        <App />
      </ThemeProvider>
    </Center>
  );
};
