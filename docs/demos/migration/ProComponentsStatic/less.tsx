/**
 * compact: true
 */
import { App, ConfigProvider, theme } from 'antd';
import { Flexbox } from 'react-layout-kit';
import Statistic from './LessComponent';

export default () => {
  return (
    <ConfigProvider
      prefixCls={'ant'}
      theme={{
        inherit: false,
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <App>
        <Flexbox horizontal padding={24} gap={40} style={{ background: '#f1f2f5' }}>
          <Statistic description={'inline'} layout={'inline'} value={12312} />
          <Statistic description={'vertical'} layout={'vertical'} value={12312} />
          <Statistic description={'horizontal'} trend={'up'} layout={'horizontal'} value={12312} />
        </Flexbox>
      </App>
    </ConfigProvider>
  );
};
