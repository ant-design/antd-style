/**
 * compact: true
 */
import { Flexbox } from 'react-layout-kit';

import { Card, Segmented } from 'antd';
import { ThemeMode } from 'antd-style';
import { useStore } from './useStore';

const options = [
  { label: '自动', value: 'auto' },
  { label: '亮色', value: 'light' },
  { label: '暗色', value: 'dark' },
];

export default () => {
  const themeMode = useStore();

  return (
    <Card size={'small'}>
      <Flexbox horizontal align={'center'} gap={16}>
        主题模式:
        <Segmented
          value={themeMode}
          onChange={(v) => useStore.setState(v as ThemeMode)}
          options={options}
        />
      </Flexbox>
    </Card>
  );
};
