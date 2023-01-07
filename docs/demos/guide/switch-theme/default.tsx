/**
 * compact: true
 */
import { AppContainer, ThemeAppearance } from 'antd-style';
import { useState } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import { Segmented } from 'antd';
import App from '../../common/demo';

const options = [
  { label: '亮色', value: 'light' },
  { label: '暗色', value: 'dark' },
];

export default () => {
  const [appearance, setTheme] = useState<ThemeAppearance>('light');
  return (
    <Flexbox horizontal gap={8}>
      <Center flex={1}>
        <Segmented onChange={(v) => setTheme(v as ThemeAppearance)} options={options} />
      </Center>
      <Flexbox flex={8}>
        <AppContainer appearance={appearance}>
          <App />
        </AppContainer>
      </Flexbox>
    </Flexbox>
  );
};
