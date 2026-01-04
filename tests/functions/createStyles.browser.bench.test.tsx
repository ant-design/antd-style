import { render } from '@testing-library/react';
import { createStyles, css } from 'antd-style';
import { describe, expect, test } from 'vitest';

describe('useStyles browser bench', () => {
  const runBenchmark = (name: string, fn: () => void, iterations: number = 1000) => {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      fn();
    }
    const end = performance.now();
    const avgTime = (end - start) / iterations;
    return { name, avgTime, totalTime: end - start };
  };

  test('简单静态对象样式', () => {
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

    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();

    const result = runBenchmark('简单静态对象样式', () => render(<App />));
    console.log(`${result.name}: 平均耗时 ${result.avgTime.toFixed(4)} ms`);
  });

  test('带 token 的函数样式', () => {
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

    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();

    const result = runBenchmark('带 token 的函数样式', () => render(<App />));
    console.log(`${result.name}: 平均耗时 ${result.avgTime.toFixed(4)} ms`);
  });

  test('多个样式对象', () => {
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

    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();

    const result = runBenchmark('多个样式对象', () => render(<App />));
    console.log(`${result.name}: 平均耗时 ${result.avgTime.toFixed(4)} ms`);
  });

  test('复杂 CSS 模板样式', () => {
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

    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();

    const result = runBenchmark('复杂 CSS 模板样式', () => render(<App />));
    console.log(`${result.name}: 平均耗时 ${result.avgTime.toFixed(4)} ms`);
  });

  test('响应式样式', () => {
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

    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();

    const result = runBenchmark('响应式样式', () => render(<App />));
    console.log(`${result.name}: 平均耗时 ${result.avgTime.toFixed(4)} ms`);
  });

  test('带 cx 合并的样式', () => {
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

    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();

    const result = runBenchmark('带 cx 合并的样式', () => render(<App />));
    console.log(`${result.name}: 平均耗时 ${result.avgTime.toFixed(4)} ms`);
  });

  test('性能汇总', () => {
    const benchmarks = [
      () => {
        const useStyles = createStyles({
          container: { backgroundColor: '#f5f5f5', padding: 24 },
          card: { marginTop: 16 },
        });
        const App = () => {
          const { styles } = useStyles();
          return (
            <div className={styles.container}>
              <div className={styles.card}>card</div>
            </div>
          );
        };
        return render(<App />);
      },
      () => {
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
        return render(<App />);
      },
      () => {
        const useStyles = createStyles({
          container: { backgroundColor: '#f5f5f5', padding: 24 },
          card: { marginTop: 16 },
          header: { fontSize: 18, fontWeight: 'bold' },
          content: { color: '#333', lineHeight: 1.5 },
          footer: { marginTop: 24, borderTop: '1px solid #eee', paddingTop: 16 },
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
        return render(<App />);
      },
      () => {
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
        return render(<App />);
      },
      () => {
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
        return render(<App />);
      },
      () => {
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
        return render(<App />);
      },
    ];

    const names = [
      '简单静态对象样式',
      '带 token 的函数样式',
      '多个样式对象',
      '复杂 CSS 模板样式',
      '响应式样式',
      '带 cx 合并的样式',
    ];

    const results = benchmarks.map((fn, index) => runBenchmark(names[index], fn));

    console.log('\n=== 性能汇总 ===');
    results.forEach((r) => {
      console.log(`${r.name}: ${r.avgTime.toFixed(4)} ms`);
    });

    const avgWithoutCx = results.slice(0, 5).reduce((sum, r) => sum + r.avgTime, 0) / 5;
    const avgWithCx = results[5].avgTime;

    console.log(`\nuseStyles 平均耗时 (不含 cx): ${avgWithoutCx.toFixed(4)} ms`);
    console.log(`cx 平均耗时: ${avgWithCx.toFixed(4)} ms`);
    console.log(
      `cx 相对 useStyles 的性能损失: ${(((avgWithCx - avgWithoutCx) / avgWithoutCx) * 100).toFixed(
        2,
      )}%`,
    );

    expect(results.length).toBe(6);
  });
});
