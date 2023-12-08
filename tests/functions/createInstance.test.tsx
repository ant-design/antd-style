import { SmileOutlined } from '@ant-design/icons';
import { render, renderHook } from '@testing-library/react';
import { Button, ConfigProvider } from 'antd';
import { createInstance } from 'antd-style';
import { PropsWithChildren } from 'react';

interface TestCustomToken {
  x?: string;
  y?: number;
}

declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface CustomToken extends TestCustomToken {}
}

describe('createInstance', () => {
  const instance = createInstance({
    key: 'xxx',
    prefixCls: 'test',
    speedy: true,
    customToken: {
      x: '123',
      y: 12345,
    },
  });
  it('创建独立样式实例,key 为 xxx，speedy 为 true', () => {
    expect(instance.styleManager.sheet.key).toEqual('xxx');
    expect(instance.styleManager.sheet.speedy).toBeTruthy();
  });

  it('useTheme 拿到的 prefixCls 为 test', () => {
    const { result } = renderHook(instance.useTheme);

    expect(result.current.prefixCls).toEqual('test');
  });

  it('自定义 prefixCls 时，会采用 instance 的 prefixCls 而不是 CP 的prefixCls', () => {
    const useStyles = instance.createStyles(({ css, prefixCls, iconPrefixCls }) => {
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

  it('useTheme 拿到的 token 里有 x 为 123', () => {
    const { result } = renderHook(instance.useTheme);

    expect(result.current.x).toEqual('123');
  });

  it('创建实例时可以不填 key', () => {
    const instance = createInstance({
      prefixCls: 'test',
      speedy: true,
    });
    expect(instance.styleManager.sheet.key).toEqual('zcss');
  });

  describe('ThemeProvider', () => {
    it('包裹 ThemeProvider 时 x 也存在', () => {
      const { result } = renderHook(instance.useTheme, { wrapper: instance.ThemeProvider });

      expect(result.current.x).toEqual('123');
      expect(result.current.y).toEqual(12345);
    });

    it('可以包裹 ThemeProvider ，自定义 token 也存在', () => {
      const { ThemeProvider } = instance;
      const Wrapper = (props: any) => <ThemeProvider {...props} customToken={{ x: '222' }} />;
      const { result } = renderHook(instance.useTheme, { wrapper: Wrapper });

      expect(result.current.x).toEqual('222');
      expect(result.current.y).toEqual(12345);
    });
  });
});
