import { ConfigProvider, message, Modal, notification, theme } from 'antd';
import { memo, useEffect, useMemo, type FC } from 'react';

import { ThemeProviderProps } from '@/containers';
import { useThemeMode } from '@/hooks';
import { ThemeConfig } from 'antd/es/config-provider/context';

type AntdProviderProps = Pick<
  ThemeProviderProps<any>,
  'theme' | 'prefixCls' | 'getStaticInstance' | 'children' | 'staticInstanceConfig'
>;

const AntdProvider: FC<AntdProviderProps> = memo(
  ({ children, theme: themeProp, prefixCls, getStaticInstance, staticInstanceConfig }) => {
    const { appearance, isDarkMode } = useThemeMode();

    const [messageInstance, messageContextHolder] = message.useMessage(
      staticInstanceConfig?.message,
    );
    const [notificationInstance, notificationContextHolder] = notification.useNotification(
      staticInstanceConfig?.notification,
    );
    const [modalInstance, modalContextHolder] = Modal.useModal();

    useEffect(() => {
      getStaticInstance?.({
        message: messageInstance,
        modal: modalInstance,
        notification: notificationInstance,
      });
    }, []);

    // 获取 antd 主题
    const antdTheme = useMemo<ThemeConfig>(() => {
      const baseAlgorithm = isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm;

      let antdTheme = themeProp as ThemeConfig | undefined;

      if (typeof themeProp === 'function') {
        antdTheme = themeProp(appearance);
      }

      if (!antdTheme) {
        return { algorithm: baseAlgorithm };
      }

      // 如果有 themeProp 说明是外部传入的 theme，需要对算法做一个合并处理，因此先把 themeProp 的算法规整为一个数组
      const algoProp = !antdTheme.algorithm
        ? []
        : antdTheme.algorithm instanceof Array
        ? antdTheme.algorithm
        : [antdTheme.algorithm];

      return {
        ...antdTheme,
        algorithm: !antdTheme.algorithm ? baseAlgorithm : [baseAlgorithm, ...algoProp],
      };
    }, [themeProp, isDarkMode]);

    return (
      <ConfigProvider prefixCls={prefixCls} theme={antdTheme}>
        {messageContextHolder}
        {notificationContextHolder}
        {modalContextHolder}
        {children}
      </ConfigProvider>
    );
  },
);

export default AntdProvider;
