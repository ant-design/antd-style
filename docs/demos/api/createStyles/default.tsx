/**
 * inherit: true
 * defaultShowCode: true
 */
import { SmileOutlined } from '@ant-design/icons';
import { Button, Space, version } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ cssVar, css, cx }) => {
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
  const { styles } = useStyles();

  return (
    <div className={styles.container} data-antd-ver={version}>
      <Space direction={'vertical'} style={{ width: '100%' }} size={16}>
        <Space>
          <Button title={'功能按钮的说明'} icon={<SmileOutlined />} />
          操作按钮
        </Space>
        <div className={styles.defaultCard}>普通卡片</div>
        <div className={styles.primaryCard}>主要卡片</div>
      </Space>
    </div>
  );
};

export default App;
