/**
 * defaultShowCode: true
 * codePlacement: top
 */
import { createStyles, css } from 'antd-style';

const useStyles = createStyles({
  container: {
    padding: 24,
    background: 'lightslategrey',
  },
  header: css`
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: white;
  `,
  text: {
    color: 'lightblue',
  },
});

export default () => {
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.header}>用法一</div>
      <p className={styles.text}>普通对象，无需动态性</p>
    </div>
  );
};
