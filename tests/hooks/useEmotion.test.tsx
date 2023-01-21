import { renderHook } from '@testing-library/react';
import { useEmotion } from 'antd-style';
import { FC, PropsWithChildren } from 'react';
import { StyleProvider } from '../../src';

describe('useEmotion', () => {
  it('没有 Provider 的 useEmotion 会拿到 antd-style 声明的 emotion 实例', () => {
    const { result } = renderHook(useEmotion);

    expect(result.current.sheet.key).toEqual('ant-css');
  });

  it('useEmotion 方法可以拿到 StyleProvider 下的对象', () => {
    const wrapper: FC<PropsWithChildren> = ({ children }) => (
      <StyleProvider prefix={'test'}>{children}</StyleProvider>
    );

    const { result } = renderHook(useEmotion, { wrapper });
    expect(result.current.sheet.key).toEqual('test');
  });
});
