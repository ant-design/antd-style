/**
 * iframe: 50
 */
import { createStyles, css, StyleProvider } from 'antd-style';

const useStyles = createStyles({
  text: css`
    color: blue;
  `,
});

const Text = () => {
  const { styles } = useStyles();
  return <div className={styles.text}> 开启 speedy 模式后，style 标签中将不存在具体样式</div>;
};

export default () => {
  return (
    <StyleProvider speedy>
      <Text />
    </StyleProvider>
  );
};
