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

      it.skip('TODO: 对象模式的用法，可以不包含 css，类型定义与提示正常，使用也正常', () => {
        const useStyles = createStyles(({ token }) => ({
          container: `
        background-color: ${token.colorBgLayout};
        padding: 24px;
      `,
          card: `
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
