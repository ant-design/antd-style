/**
 * iframe: true
 */
import { Button } from 'antd';
import { createInstance } from 'antd-style';

const { css, StyleProvider, createStyles } = createInstance({
  key: 'test',
});

const useStyles = createStyles({
  text: css`
    color: red;
  `,
});

const Text = () => {
  const { styles } = useStyles();
  return <div className={styles.text}>我是文本</div>;
};

export default () => {
  return (
    <>
      <StyleProvider prefix={'abc'} container={document.body}>
        <Text />
        <Button>按钮</Button>
      </StyleProvider>
      <Text />
    </>
  );
};
