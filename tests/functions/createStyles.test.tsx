import { SmileOutlined } from '@ant-design/icons';
import { render } from '@testing-library/react';
import { Button, ConfigProvider } from 'antd';
import { GetCustomToken, ThemeProvider, createStyles, css } from 'antd-style';
import { FC, PropsWithChildren } from 'react';

describe('createStyles', () => {
  describe('styles 对象的使用', () => {
    describe('createStyleFn 通过函数方式可以拿到 token 等信息', () => {
      it('字符串模板的对象模式用法', () => {
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

        expect(container.firstChild).toMatchSnapshot();

        expect(container.firstChild).toHaveStyle({ backgroundColor: '#f5f5f5' });
      });

      it('只返回一个 css 字符串，使用正常，类型定义也正常', () => {
        const useStyles = createStyles(
          ({ token, css }) => css`
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

      it('可以获取 prefixCls 与 iconPrefixCls', () => {
        const useStyles = createStyles(({ css, prefixCls, iconPrefixCls }) => {
          return {
            button: css`
              &.${prefixCls}-btn {
                background: lightsteelblue;
                border: none;
                color: royalblue;
              }

              .${iconPrefixCls} {
                color: darkblue;
              }
            `,
          };
        });

        const App = () => {
          const { styles } = useStyles();

          return (
            <Button className={styles.button} icon={<SmileOutlined />}>
              CP Button
            </Button>
          );
        };
        const wrapper = ({ children }: PropsWithChildren) => (
          <ConfigProvider prefixCls={'cp'} iconPrefixCls={'cpicon'}>
            {children}
          </ConfigProvider>
        );

        const { container } = render(<App />, { wrapper });

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    it('获取 antdPrefixCls，未通过ConfigProvider传入 prefixCls时，拿到的perfixCls应该为ant design默认的"ant"', () => {
      const useStyles = createStyles(({ css, antdPrefixCls }) => {
        return {
          button: css`
            &.${antdPrefixCls}-div {
              background: lightsteelblue;
              border: none;
              font-size: 10px;
            }
          `,
        };
      });

      const App = () => {
        const { styles } = useStyles();

        return <div className={`${styles.button} ant-div`}>my custom button</div>;
      };

      const { container } = render(<App />);
      expect(container.firstChild).toHaveStyle({ fontSize: '10px' });
    });

    it('获取 antdPrefixCls，通过ConfigProvider传入 prefixCls 时，拿到的值为传入的prefixCls', () => {
      const myCustomAntPrefix = 'my-custom-ant-prefix';
      const useStyles = createStyles(({ css, antdPrefixCls }) => {
        return {
          button: css`
            &.${antdPrefixCls}-div {
              background: lightsteelblue;
              border: none;
              font-size: 11px;
            }
          `,
        };
      });

      const App = () => {
        const { styles } = useStyles();

        return (
          <div className={`${styles.button} ${`${myCustomAntPrefix}-div`}`}>my custom Button</div>
        );
      };

      const wrapper = ({ children }: PropsWithChildren) => (
        <ConfigProvider prefixCls={myCustomAntPrefix}>{children}</ConfigProvider>
      );

      const { container } = render(<App />, { wrapper });
      expect(container.firstChild).toHaveClass(`${myCustomAntPrefix}-div`);
      expect(container.firstChild).toHaveStyle({ fontSize: '11px' });
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

    it('cx 的处理方式', () => {
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

      expect(container.firstChild).toMatchSnapshot();

      expect(container.firstChild).toHaveStyle({ backgroundColor: '#f5f5f5' });
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

  describe('响应主题', () => {
    it('嵌套主题', () => {
      const customTokenFn: GetCustomToken<any> = ({ token, isDarkMode }) => ({
        customColor: isDarkMode ? '#000' : token.colorPrimary,
        customBrandColor: isDarkMode ? token.colorPrimary : '#FFF',
      });

      const Wrapper: FC<PropsWithChildren> = ({ children }) => (
        <ThemeProvider customToken={customTokenFn}>
          <ThemeProvider customToken={{ a: 'red' }}>{children}</ThemeProvider>
        </ThemeProvider>
      );

      const useStyles = createStyles(({ token, css }) => ({
        container: css`
          background-color: ${token.customColor};
          color: ${token.a};
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

      const { container } = render(<App />, { wrapper: Wrapper });

      expect(container.firstChild).toMatchSnapshot();

      expect(container.firstChild).toHaveStyle({
        backgroundColor: '#1677ff',
        color: 'rgb(255, 0, 0)',
      });
    });
  });
});

describe('createStyles：响应式工具函数', () => {
  it('断点与设备查询', () => {
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

    expect(container.firstChild).toMatchInlineSnapshot(`
      .emotion-0 {
        background-color: blue;
      }

      @media (max-width: 575px) {
        .emotion-0 {
          background-color: red;
        }
      }

      @media (min-width: 1600px) {
        .emotion-0 {
          background-color: green;
        }
      }

      <div
        class="emotion-0"
      >
        container
      </div>
    `);
  });
  it('使用了不存在的断点，不输出样式', () => {
    const useStyles = createStyles(
      ({ css, responsive }) => css`
        background-color: blue;
        ${responsive({
          // @ts-ignore
          xxx: css`
            background-color: red;
          `,
        })}
      `,
    );

    const App = () => {
      const { styles } = useStyles();
      return <div className={styles}>container</div>;
    };

    const { container } = render(<App />);

    expect(container.firstChild).toMatchInlineSnapshot(`
      .emotion-0 {
        background-color: blue;
      }

      <div
        class="emotion-0"
      >
        container
      </div>
    `);
  });
});
