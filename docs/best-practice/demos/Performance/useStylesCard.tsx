/**
 * 使用 createStyles 的卡片组件
 */
import { createStyles } from 'antd-style';
import { memo } from 'react';

const useStyles = createStyles(({ css, token }) => ({
  card: css`
    padding: ${token.paddingLG}px;
    background: ${token.colorBgContainer};
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadiusLG}px;
    margin-bottom: 8px;
  `,
  title: css`
    font-size: 14px;
    font-weight: 500;
    color: ${token.colorText};
    margin-bottom: 4px;
  `,
  content: css`
    font-size: 12px;
    color: ${token.colorTextSecondary};
  `,
}));

interface CardProps {
  index: number;
}

const UseStylesCard = memo(({ index }: CardProps) => {
  const { styles } = useStyles();

  return (
    <div className={styles.card}>
      <div className={styles.title}>Card #{index + 1}</div>
      <div className={styles.content}>使用 createStyles (Hook)</div>
    </div>
  );
});

export default UseStylesCard;
