/**
 * inherit: true
 * defaultShowCode: true
 */
import { SmileOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { createStaticStyles } from 'antd-style';

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
