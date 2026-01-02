import { render } from '@testing-library/react';
import { createStyles, css } from 'antd-style';
import { bench, describe } from 'vitest';

describe('useStyles bench', () => {
  bench('简单静态对象样式', () => {
    const useStyles = createStyles({
      container: {
        backgroundColor: '#f5f5f5',
        padding: 24,
      },
      card: {
        marginTop: 16,
      },
    });

    const App = () => {
      const { styles } = useStyles();
      return (
        <div className={styles.container}>
          <div className={styles.card}>card</div>
        </div>
      );
    };

    render(<App />);
  });

  bench('带 token 的函数样式', () => {
    const useStyles = createStyles(({ token, css }) => ({
      container: css`
        background-color: ${token.colorBgLayout};
        padding: 24px;
      `,
      card: css`
        margin-top: ${token.marginLG}px;
      `,
    }));

    const App = () => {
      const { styles } = useStyles();
      return (
        <div className={styles.container}>
          <div className={styles.card}>card</div>
        </div>
      );
    };

    render(<App />);
  });

  bench('多个样式对象', () => {
    const useStyles = createStyles({
      container: {
        backgroundColor: '#f5f5f5',
        padding: 24,
      },
      card: {
        marginTop: 16,
      },
      header: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      content: {
        color: '#333',
        lineHeight: 1.5,
      },
      footer: {
        marginTop: 24,
        borderTop: '1px solid #eee',
        paddingTop: 16,
      },
    });

    const App = () => {
      const { styles } = useStyles();
      return (
        <div className={styles.container}>
          <div className={styles.header}>Header</div>
          <div className={styles.content}>Content</div>
          <div className={styles.card}>Card</div>
          <div className={styles.footer}>Footer</div>
        </div>
      );
    };

    render(<App />);
  });

  bench('复杂 CSS 模板样式', () => {
    const useStyles = createStyles(
      css`
        background-color: #f5f5f5;
        padding: 24px;
        color: #333;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      `,
    );

    const App = () => {
      const { styles } = useStyles();
      return <div className={styles}>card</div>;
    };

    render(<App />);
  });

  bench('响应式样式', () => {
    const useStyles = createStyles(({ css, responsive }) => ({
      container: css`
        background-color: blue;
        ${responsive({
          xs: css`
            background-color: red;
          `,
          desktop: {
            backgroundColor: 'green',
          },
        })}
      `,
    }));

    const App = () => {
      const { styles } = useStyles();
      return <div className={styles.container}>container</div>;
    };

    render(<App />);
  });

  bench('带 cx 合并的样式', () => {
    const useStyles = createStyles(({ token, cx, css }) => ({
      container: cx(
        css`
          background-color: ${token.colorBgLayout};
          padding: 24px;
        `,
        'with-cx',
      ),
      card: css`
        margin-top: ${token.marginLG}px;
      `,
    }));

    const App = () => {
      const { styles } = useStyles();
      return (
        <div className={styles.container}>
          <div className={styles.card}>card</div>
        </div>
      );
    };

    render(<App />);
  });
});
