import { App, ConfigProvider } from 'antd';
import { ConfigProviderProps } from 'antd/es/config-provider';
import { type FC } from 'react';

import StaticMethod from './AntdStaticMethod';

export interface AntdProviderProps extends ConfigProviderProps {
  className?: string;
}

export const AntdProvider: FC<AntdProviderProps> = ({ children, className, ...props }) => {
  return (
    <ConfigProvider {...props}>
      <App className={className}>
        <StaticMethod />
        {children}
      </App>
    </ConfigProvider>
  );
};
