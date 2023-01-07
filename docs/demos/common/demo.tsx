import { Button, Card, Divider, Modal, Typography } from 'antd';
import { useTheme, useThemeMode } from 'antd-style';
import { FC, ReactNode } from 'react';
import { Flexbox } from 'react-layout-kit';

const StaticModal = Modal._InternalPanelDoNotUseOrYouWillBeFired;
const { Text } = Typography;

interface AppProps {
  extra?: ReactNode;
}
const App: FC<AppProps> = ({ extra }) => {
  const theme = useTheme();
  const { appearance, themeMode } = useThemeMode();
  return (
    <Flexbox
      gap={theme.paddingLG}
      style={{
        background: theme.colorBgLayout,
        padding: `${theme.paddingXL}px ${theme.paddingLG}px`,
      }}
    >
      <Flexbox horizontal align={'center'} distribution={'space-between'}>
        <Flexbox horizontal align={'center'}>
          <Text type={'secondary'}>主题模式：</Text>
          {themeMode}
          <Divider type={'vertical'} />
          <Text type={'secondary'}>外观模式：</Text>
          {appearance}
        </Flexbox>
        {extra}
      </Flexbox>

      <Divider style={{ margin: '8px 0' }} orientation={'left'}>
        组件示例
      </Divider>
      <Flexbox horizontal gap={8}>
        <Flexbox gap={theme.paddingLG}>
          <Flexbox horizontal gap={8}>
            <Button>默认按钮</Button>
            <Button ghost type={'primary'}>
              次强调按钮
            </Button>
            <Button type={'primary'}>强调按钮</Button>
          </Flexbox>
          <Card>卡片效果</Card>
        </Flexbox>

        <StaticModal type={'success'} title={'成功'}>
          这是一个静态化呈现的成功弹窗
        </StaticModal>
      </Flexbox>
    </Flexbox>
  );
};
export default App;
