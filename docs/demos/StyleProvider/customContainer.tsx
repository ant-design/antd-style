/**
 * iframe: 100
 */
import { Button } from 'antd';
import { createStyles, css, StyleProvider } from 'antd-style';

const useStyles = createStyles({
  text: css`
    color: blue;
  `,
});

const Text = () => {
  const { styles } = useStyles();
  return <div className={styles.text}>样式将插入在 body 节点</div>;
};

export default () => {
  return (
    <StyleProvider container={document.body}>
      <Text />
      <Button>按钮</Button>
    </StyleProvider>
  );
};
