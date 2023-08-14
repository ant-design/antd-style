/**
 * defaultShowCode: true
 */
import { Input } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css, prefixCls }) => ({
  bg: css`
    background: ${token.colorBgLayout};
    padding: 24px;
  `,
  input: css`
    background: transparent;
  `,
  wrapper: css`
    background: transparent;
    border: 2px solid ${token.colorBorder};
  `,
  suffix: css`
    color: ${token.colorTextQuaternary};
  `,
}));

export default () => {
  const { styles } = useStyles();

  return (
    <div className={styles.bg}>
      <Input
        placeholder={'自定义Input classNames'}
        suffix={'$'}
        classNames={{ affixWrapper: styles.wrapper, input: styles.input, suffix: styles.suffix }}
      />
    </div>
  );
};
