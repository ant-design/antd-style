/**
 * iframe: 240
 */
import { message, modal, notification } from './layout';

export const showMessage = () => {
  message.success('Success!');
};

export const showNotification = () => {
  notification.info({
    message: `Notification`,
    description: 'Hello, Ant Design Style',
  });
};

export const showModal = () => {
  modal.warning({
    title: 'This is a warning message',
    content: 'some messages...some messages...',
    centered: true,
    maskClosable: true,
  });
};
