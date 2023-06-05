/**
 * compact: true
 * title: 响应式断点
 * description: 不同断点下，背景色和文本内容不同
 */
import { createStyles, useResponsive } from 'antd-style';

const useStyles = createStyles(({ css, responsive }) => ({
  container: css`
    height: 100px;
    display: flex;
    font-size: 24px;
    align-items: center;
    justify-content: center;

    background-color: lightskyblue;
    color: darkblue;

    ${responsive.tablet} {
      background: darkseagreen;
      color: darkgreen;
    }

    ${responsive.desktop} {
      background: darksalmon;
      color: saddlebrown;
    }

    ${responsive.mobile} {
      background: pink;
      color: deeppink;
    }
  `,
}));

const App = () => {
  const { styles } = useStyles();

  const { laptop, desktop, mobile } = useResponsive();
  return (
    <div className={styles.container}>
      {mobile ? 'mobile' : desktop ? 'desktop' : laptop ? 'laptop' : 'tablet'}
    </div>
  );
};

export default App;
