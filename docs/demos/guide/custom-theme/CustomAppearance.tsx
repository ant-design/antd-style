/**
 * iframe: 450
 */
import { Segmented, theme } from 'antd';
import { ThemeAppearance, ThemeProvider } from 'antd-style';
import { darkAlgorithm } from 'dumi-theme-antd-style/dist/styles/theme/dark';
import { useState } from 'react';

import App from '../../common/demo';

type CustomAppearance = ThemeAppearance | 'grey';

export default () => {
  const [appearance, setAppearance] = useState<CustomAppearance>('light');

  return (
    <ThemeProvider
      appearance={appearance}
      theme={(appearance: CustomAppearance) => {
        switch (appearance) {
          case 'light':
            return {
              token: {
                colorPrimary: 'purple',
              },
            };
          case 'dark':
            return {
              token: {
                colorPrimary: 'cyan',
              },
              algorithm: theme.darkAlgorithm,
            };

          case 'grey':
            return {
              algorithm: darkAlgorithm,
            };
        }
      }}
    >
      <App
        extra={
          <Segmented
            options={[
              { label: '亮色', value: 'light' },
              { label: '暗色', value: 'dark' },
              { label: '灰色', value: 'grey' },
            ]}
            value={appearance}
            onChange={(e) => setAppearance(e as CustomAppearance)}
          />
        }
      />
    </ThemeProvider>
  );
};
