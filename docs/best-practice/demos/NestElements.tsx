import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, cx }) => {
  // 使用 cx 包裹 css
  const child = cx(css`
    background: red;
    width: 100px;
    height: 100px;
  `);

  return {
    parent: css`
      cursor: pointer;

      &:hover {
        .${child} {
          background: blue;
        }
      }
    `,
    child,
  };
});

const Demo = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.parent}>
      <div className={styles.child} />
      hover to change color
    </div>
  );
};

export default Demo;
