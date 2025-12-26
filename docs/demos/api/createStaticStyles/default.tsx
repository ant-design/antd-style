/**
 * inherit: true
 * defaultShowCode: true
 */
import { SmileOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { createStaticStylesFactory } from 'antd-style';

// 创建使用 site 前缀的静态样式实例
// 该前缀来自 dumi-theme-antd-style 主题的 ConfigProvider 配置
const { createStaticStyles } = createStaticStylesFactory({ prefix: 'site' });

// Styles defined at module level, computed once at import
const styles = createStaticStyles(({ cssVar, css, cx }) => {
  const commonCard = css`
    border-radius: ${cssVar.borderRadiusLG};
    padding: ${cssVar.paddingLG};
  `;

  return {
    container: css`
      background-color: ${cssVar.colorBgLayout};
      padding: 24px;
    `,

    defaultCard: css`
      ${commonCard};
      background: ${cssVar.colorBgContainer};
      color: ${cssVar.colorText};
    `,

    primaryCard: cx(
      commonCard,
      css`
        background: ${cssVar.colorPrimary};
        color: ${cssVar.colorTextLightSolid};
      `,
    ),
  };
});

const App = () => {
  // Use styles directly, no hook call needed
  return (
    <div className={styles.container}>
      <Space direction={'vertical'} style={{ width: '100%' }} size={16}>
        <Space>
          <Button title={'Function button description'} icon={<SmileOutlined />} />
          Action Button
        </Space>
        <div className={styles.defaultCard}>Default Card</div>
        <div className={styles.primaryCard}>Primary Card</div>
      </Space>
    </div>
  );
};

export default App;
