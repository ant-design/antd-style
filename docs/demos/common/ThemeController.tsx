import { Card, Divider, Segmented, Typography } from 'antd';
import { ThemeMode, useTheme, useThemeMode } from 'antd-style';
import { FC, PropsWithChildren } from 'react';
import { Flexbox } from 'react-layout-kit';

const { Text } = Typography;

const options = [
  { label: '自动', value: 'auto' },
  { label: '亮色', value: 'light' },
  { label: '暗色', value: 'dark' },
];
interface ThemeControllerProps {
  themeMode?: ThemeMode;
  onThemeModeChange?: (themeMode: ThemeMode) => void;
}

export const ThemeController: FC<PropsWithChildren<ThemeControllerProps>> = ({
  children,
  themeMode,
  onThemeModeChange,
}) => {
  const { appearance } = useThemeMode();
  const theme = useTheme();
  return (
    <Flexbox padding={24} style={{ background: theme.colorBgLayout }}>
      <Flexbox horizontal align={'center'} distribution={'space-between'}>
        <Flexbox horizontal align={'center'}>
          <Text type={'secondary'}>主题模式：</Text>
          {themeMode}
          <Divider type={'vertical'} />
          <Text type={'secondary'}>外观模式：</Text>
          {appearance}
        </Flexbox>
        <Card size={'small'}>
          <Flexbox horizontal align={'center'} gap={16}>
            主题模式:
            <Segmented
              value={themeMode}
              onChange={(v) => onThemeModeChange?.(v as ThemeMode)}
              options={options}
            />
          </Flexbox>
        </Card>
      </Flexbox>
      <Divider />
      {children}
    </Flexbox>
  );
};
