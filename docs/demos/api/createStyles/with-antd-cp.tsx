import { SmileOutlined } from '@ant-design/icons';
import { Button, ConfigProvider } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, prefixCls, iconPrefixCls }) => ({
  button: css`
    &.${prefixCls}-btn {
      background: lightsteelblue;
      border: none;
      color: royalblue;
    }

    .${iconPrefixCls} {
      color: darkblue;
    }
  `,
}));

const App = () => {
  const { styles } = useStyles();

  return (
    <Button className={styles.button} icon={<SmileOutlined />}>
      CP Button
    </Button>
  );
};
export default () => (
  <ConfigProvider prefixCls={'cp'} iconPrefixCls={'cpicon'}>
    <App />
  </ConfigProvider>
);
