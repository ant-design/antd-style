/**
 * iframe: 50
 */
import { createStyles, css, StyleProvider } from 'antd-style';

const useStyles = createStyles({
  text: css`
    color: hotpink;
  `,
});

const Text = () => {
  const { styles } = useStyles();
  return <div className={styles.text}>插入的 style 节点在第一个 meta 标签之后</div>;
};

export default () => {
  const firstMeta = document.getElementsByTagName('meta')[0];

  return (
    <StyleProvider insertionPoint={firstMeta}>
      <Text />
    </StyleProvider>
  );
};
