import { renderHook } from '@testing-library/react';

import { useAntdToken } from 'antd-style';

describe('useAntdToken', () => {
  it('can get colorPrimary', () => {
    const { result } = renderHook(useAntdToken);
    expect(result.current.colorPrimary.toLowerCase()).toEqual('#1677ff');
  });

  it('TODO: 嵌套 CP 时能拿到准确的 token 值', () => {});
});
