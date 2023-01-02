import { App, ConfigProvider } from 'antd';
import { ConfigProviderProps } from 'antd/es/config-provider';
import { type FC } from 'react';

import StaticMethod from './AntdStaticMethod';

const AntdProvider: FC<ConfigProviderProps> = ({ children, ...props }) => {
  return (
    <ConfigProvider {...props}>
      <App>
        <StaticMethod />
        {children}
      </App>
    </ConfigProvider>
  );
};

export default AntdProvider;
