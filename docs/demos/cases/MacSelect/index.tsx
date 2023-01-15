/**
 * compact: true
 * title: MacOS 选择器
 * description: 演示使用 antd-style 如何实现一个适配 antd 主题风格的组件
 */
import { App, Divider, Select } from 'antd';
import { ThemeMode, ThemeProvider, useTheme } from 'antd-style';
import { Center, Flexbox } from 'react-layout-kit';
import { create } from 'zustand';

import MacSelect from './Select';

import { ThemeController } from '../../common/ThemeController';

import { fruits } from './data';

const useStore = create<ThemeMode>(() => 'auto');
const Demo = () => {
  const theme = useTheme();
  return (
    <Center>
      <Flexbox style={{ background: theme.colorBgLayout, padding: 24 }}>
        <MacSelect value={4} options={fruits} />
        <Divider />
        <Select value={'Apple'} options={fruits} />
      </Flexbox>
    </Center>
  );
};

export default () => {
  const themeMode = useStore();
  return (
    <ThemeProvider
      theme={(appearance) =>
        appearance === 'dark'
          ? {
              token: {
                colorText: 'rgb(166,166,166)',
              },
            }
          : undefined
      }
      themeMode={themeMode}
    >
      <App>
        <ThemeController themeMode={themeMode} onThemeModeChange={useStore.setState}>
          <Demo />
        </ThemeController>
      </App>
    </ThemeProvider>
  );
};
