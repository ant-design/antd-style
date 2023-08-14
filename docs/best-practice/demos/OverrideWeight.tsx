/**
 * defaultShowCode: true
 */
import { App, Layout } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css, prefixCls }) => ({
  default: css`
    .${prefixCls}-layout-header {
      background-color: ${token.colorPrimary};
    }
  `,
  moreWeight: css`
    // ↓
    &.${prefixCls}-layout-header {
      background-color: ${token.colorPrimary};
    }
  `,
}));

export default () => {
  const { styles } = useStyles();

  return (
    <App>
      <Layout>
        <Layout.Header className={styles.default}>无法覆盖</Layout.Header>
        <Layout.Header className={styles.moreWeight}>可正常覆盖</Layout.Header>
      </Layout>
    </App>
  );
};
