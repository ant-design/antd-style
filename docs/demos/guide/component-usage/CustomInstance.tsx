/**
 * iframe: true
 * title: 创建独立的样式实例
 * description: createStyles 中将会注入默认的自定义 token，并可以实现主题切换
 */
import { Card } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import { Flexbox } from 'react-layout-kit';

import Button from './CustomTheme/Button';
import { ProDemoProvider } from './CustomTheme/styles';

const useStyles = createStyles(({ css, prefixCls }) => css``);

export default () => {
  const token = useTheme();
  const { styles } = useStyles();
  return (
    <Flexbox padding={24} gap={24} style={{ background: token.colorBgLayout }}>
      <Card>
        <Flexbox horizontal gap={8} className={styles}>
          <Button type={'primary'}>强调按钮</Button>
          <Button type={'filled'}>填充按钮</Button>
          <Button type={'default'}>默认按钮</Button>
          <Button type={'text'}>文本按钮</Button>
        </Flexbox>
      </Card>

      <ProDemoProvider themeMode={'dark'}>
        <Card>
          <Flexbox horizontal gap={8} className={styles}>
            <Button type={'primary'}>强调按钮</Button>
            <Button type={'filled'}>填充按钮</Button>
            <Button type={'default'}>默认按钮</Button>
            <Button type={'text'}>文本按钮</Button>
          </Flexbox>
        </Card>
      </ProDemoProvider>
    </Flexbox>
  );
};
