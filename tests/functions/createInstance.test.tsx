import { renderHook } from '@testing-library/react';
import { createInstance } from 'antd-style';

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
