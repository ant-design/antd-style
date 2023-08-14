/**
 * iframe: 240
 */
import { ThemeProvider } from 'antd-style';
import { MessageInstance } from 'antd/es/message/interface';
import { ModalStaticFunctions } from 'antd/es/modal/confirm';
import { NotificationInstance } from 'antd/es/notification/interface';
import { PropsWithChildren } from 'react';
import { Center } from 'react-layout-kit';

export let message: MessageInstance,
  modal: Omit<ModalStaticFunctions, 'warn'>,
  notification: NotificationInstance;

export default ({ children }: PropsWithChildren) => {
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
        {children}
      </ThemeProvider>
    </Center>
  );
};
