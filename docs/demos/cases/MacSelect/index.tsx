/**
 * compact: true
 */
import { App } from 'antd';
import { ThemeMode, ThemeProvider, useTheme } from 'antd-style';
import { Center } from 'react-layout-kit';
import { create } from 'zustand';

import MacSelect from './Select';

import { ThemeController } from '../../common/ThemeController';

import { fruits } from './data';

const useStore = create<ThemeMode>(() => 'auto');
const Demo = () => {
  const theme = useTheme();
  return (
    <Center style={{ background: theme.colorBgLayout, padding: 24 }}>
      <MacSelect options={fruits} />
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
