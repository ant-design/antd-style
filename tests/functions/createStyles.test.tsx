import { render } from '@testing-library/react';
import { createStyles, css } from 'antd-style';

describe('createStyles', () => {
  describe('styles 对象的使用', () => {
    describe('createStyleFn 通过函数方式可以拿到 token 等信息', () => {
      it('字符串模板的对象模式用法', () => {
        const useStyles = createStyles(({ token }) => ({
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

        expect(container.firstChild).toMatchSnapshot();

        expect(container.firstChild).toHaveStyle({ backgroundColor: '#f5f5f5' });
      });

      it('只返回一个 css 字符串，使用正常，类型定义也正常', () => {
        const useStyles = createStyles(
          ({ token }) => css`
            background-color: ${token.colorBgContainer};
            padding: 24px;
          `,
        );

        const App = () => {
          const { styles } = useStyles();

          return <div className={styles}>card</div>;
        };

        const { container } = render(<App />);

        expect(container.firstChild).toMatchSnapshot();
        expect(container.firstChild).toHaveStyle({ backgroundColor: '#fff' });
      });
    });

    describe('styleObject 方法', () => {
      it('对象模式的用法', () => {
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

        expect(container.firstChild).toMatchSnapshot();
        expect(container.firstChild).toHaveStyle({ backgroundColor: '#f5f5f5' });
      });

      it('css模式的写法', () => {
        const useStyles = createStyles({
          container: css`
            background-color: #f5f5f5;
            padding: 24px;
          `,
          card: css`
            margin-top: 16px;
          `,
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

        expect(container.firstChild).toMatchSnapshot();
        expect(container.firstChild).toHaveStyle({ backgroundColor: '#f5f5f5' });
      });

      it('只返回一个 css 字符串，使用正常，类型定义也正常', () => {
        const useStyles = createStyles(
          css`
            background-color: #f5f5f5;
            padding: 24px;
          `,
        );

        const App = () => {
          const { styles } = useStyles();

          return <div className={styles}>card</div>;
        };

        const { container } = render(<App />);

        expect(container.firstChild).toMatchSnapshot();
        expect(container.firstChild).toHaveStyle({ backgroundColor: '#f5f5f5' });
      });
    });
  });

  describe('theme 对象使用', () => {
    it('默认用法', () => {
      const useStyles = createStyles(({ token }) => ({
        container: {
          color: token.colorPrimary,
        },
      }));

      const App = () => {
        const { styles, theme } = useStyles();

        return (
          <div className={styles.container} style={{ background: theme.colorBgLayout }}>
            123
          </div>
        );
      };

      const { container } = render(<App />);

      expect(container.firstChild).toMatchSnapshot();
      expect(container.firstChild).toHaveStyle({ color: '#1677FF', background: '#f5f5f5' });
    });
  });
});
