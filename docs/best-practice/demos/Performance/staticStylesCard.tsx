/**
 * 使用 createStaticStyles 的卡片组件
 */
import { createStaticStylesFactory } from 'antd-style';
import { memo } from 'react';

// 该前缀来自 dumi-theme-antd-style 主题的 ConfigProvider 配置
const { createStaticStyles } = createStaticStylesFactory({ prefix: 'site' });

// 样式在模块加载时计算一次，组件渲染时零开销
const styles = createStaticStyles(({ css, cssVar }) => ({
  card: css`
    padding: ${cssVar.paddingLG};
    background: ${cssVar.colorBgContainer};
    border: 1px solid ${cssVar.colorBorder};
    border-radius: ${cssVar.borderRadiusLG};
    margin-bottom: 8px;
  `,
  title: css`
    font-size: 14px;
    font-weight: 500;
    color: ${cssVar.colorText};
    margin-bottom: 4px;
  `,
  content: css`
    font-size: 12px;
    color: ${cssVar.colorTextSecondary};
  `,
}));

interface CardProps {
  index: number;
}

const StaticStylesCard = memo(({ index }: CardProps) => {
  // 无需调用 hook，直接使用样式对象
  return (
    <div className={styles.card}>
      <div className={styles.title}>Card #{index + 1}</div>
      <div className={styles.content}>使用 createStaticStyles (静态)</div>
    </div>
  );
});

export default StaticStylesCard;
