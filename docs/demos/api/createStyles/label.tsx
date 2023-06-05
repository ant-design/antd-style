import { createStyles } from 'antd-style';

const useStyles = createStyles(
  ({ css }) => ({
    text: css`
      color: blue;
    `,
  }),
  { label: 'with-label' },
);

export default () => {
  const { styles } = useStyles();
  return <div className={styles.text}>赋予 with-label 标签</div>;
};
