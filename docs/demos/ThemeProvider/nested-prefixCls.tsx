/**
 * debug: true
 * iframe: true
 */
import { Button } from 'antd';
import { ThemeProvider, createStyles } from 'antd-style';

const useStyles = createStyles(({ css, prefixCls }) => ({
  button: css`
    .${prefixCls}-btn {
      background: pink;
    }
  `,
}));

const Demo = () => {
  const { styles } = useStyles();
  return (
    <div className={styles.button}>
      <Button>按钮</Button>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider appearance={'dark'} prefixCls={'a'}>
      <ThemeProvider appearance={'light'}>
        <Demo />
      </ThemeProvider>
    </ThemeProvider>
  );
};
export default App;
