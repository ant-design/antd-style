/**
 * compact: true
 * title: Responsive Breakpoints
 * description: Different background colors at different breakpoints
 */
import { createStaticStyles } from 'antd-style';

// Static responsive uses fixed breakpoints
const styles = createStaticStyles(({ css, responsive }) => ({
  container: css`
    height: 100px;
    display: flex;
    font-size: 24px;
    align-items: center;
    justify-content: center;

    background-color: lightskyblue;
    color: darkblue;

    ${responsive.md} {
      background: darkseagreen;
      color: darkgreen;
    }

    ${responsive.lg} {
      background: darksalmon;
      color: saddlebrown;
    }

    ${responsive.sm} {
      background: pink;
      color: deeppink;
    }
  `,
}));

const App = () => {
  return <div className={styles.container}>Resize window to see breakpoint changes</div>;
};

export default App;
