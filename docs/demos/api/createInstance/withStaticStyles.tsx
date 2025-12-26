/**
 * title: createStaticStyles 与 cssVar
 * description: createInstance 返回的 createStaticStyles 和 cssVar 会自动使用配置的 prefixCls
 */
import { ConfigProvider, Space } from 'antd';
import { createInstance } from 'antd-style';

// 创建自定义前缀的样式实例
const { createStaticStyles, cssVar } = createInstance({
  prefixCls: 'my-app',
});

// cssVar 会自动使用 my-app 前缀，并带有 ant fallback
// cssVar.colorPrimary => 'var(--my-app-color-primary, var(--ant-color-primary))'

const styles = createStaticStyles(({ css, cssVar }) => ({
  container: css`
    padding: 16px;
    background: ${cssVar.colorBgLayout};
  `,
  card: css`
    background: ${cssVar.colorBgContainer};
    border: 1px solid ${cssVar.colorBorder};
    border-radius: ${cssVar.borderRadiusLG};
    padding: ${cssVar.paddingLG};
  `,
  title: css`
    color: ${cssVar.colorPrimary};
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  `,
  text: css`
    color: ${cssVar.colorText};
  `,
}));

const Demo = () => {
  return (
    <div className={styles.container}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div className={styles.card}>
          <div className={styles.title}>自定义前缀卡片</div>
          <div className={styles.text}>
            使用 cssVar.colorPrimary 会生成:
            <br />
            <code>var(--my-app-color-primary, var(--ant-color-primary))</code>
          </div>
        </div>
      </Space>
    </div>
  );
};

export default () => {
  return (
    // ConfigProvider 需要配置相同的 prefixCls 以注入对应的 CSS 变量
    <ConfigProvider prefixCls="my-app">
      <Demo />
    </ConfigProvider>
  );
};
