import { createStyles, ThemeProvider } from 'antd-style';
import { Center } from 'react-layout-kit';
import { getClayStylish, getClayToken } from './theme';

const useStyles = createStyles(({ stylish, cx, css, token }) => {
  return {
    btn: cx(
      stylish.clay,
      css`
        padding: 24px;
        border-radius: 24px;
        width: 64px;
        color: ${token.colorPrimary};
        background: ${token.colorPrimaryBgHover};
      `,
    ),
  };
});

const App = () => {
  const { styles } = useStyles();
  return (
    <div>
      <Center className={styles.btn}>按钮</Center>
    </div>
  );
};

export default () => {
  return (
    <ThemeProvider customToken={getClayToken} customStylish={getClayStylish}>
      <App />
    </ThemeProvider>
  );
};
