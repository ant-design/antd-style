/**
 * iframe: 100
 */
import { Button } from 'antd';
import { createInstance } from 'antd-style';

const { css, StyleProvider, createStyles } = createInstance({
  key: 'test',
  container: document.body,
});

const useStyles = createStyles({
  text: css`
    color: blue;
  `,
});

const Text = () => {
  const { styles } = useStyles();
  return <div className={styles.text}>我是文本</div>;
};

export default () => {
  return (
    <StyleProvider>
      <Text />
      <Button>按钮</Button>
    </StyleProvider>
  );
};
