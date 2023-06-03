/**
 * iframe: 150
 */

import { Button, Divider } from 'antd';
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
      <Divider>下方 style 插入在 head</Divider>
      <Text />
    </>
  );
};
