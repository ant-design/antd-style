/**
 * defaultShowCode: true
 */
import { Button, Space } from 'antd';
import { ThemeProvider, createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css, prefixCls }) => ({
  override: css`
    &.${prefixCls}-btn {
      background-color: ${token.colorWarning};
    }
  `,
}));

const Demo = ({ text }: { text?: string }) => {
  const { styles } = useStyles();

  return <Button className={styles.override}>{text ?? 'override to warning color'}</Button>;
};

export default () => {
  return (
    <Space>
      <Demo />
      <ThemeProvider prefixCls={'abc'}>
        <Demo text={'prefixCls to abc'} />
      </ThemeProvider>
    </Space>
  );
};
