import { createStyles, css } from 'antd-style';
import { useStylish } from './commonStylish';

const useStyles = createStyles({
  // 支持 css object 的写法
  container: {
    backgroundColor: '#f5f5f5',
    maxWidth: 400,
    width: '100%',
    height: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 也支持通过 css 字符串模板获得和 普通 css 一致的书写体验
  btn: css`
    padding: 24px;
  `,
});

export default () => {
  const { styles, cx } = useStyles();
  const stylish = useStylish();

  return (
    <div className={styles.container}>
      <div className={cx(styles.btn, stylish.defaultButton)}>stylish Button</div>
    </div>
  );
};
