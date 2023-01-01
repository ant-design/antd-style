import { renderHook } from '@testing-library/react';

import { useToken } from 'antd-style';

describe('useToken', () => {
  it('can get colorPrimary', () => {
    const { result } = renderHook(useToken);
    expect(result.current.colorPrimary.toLowerCase()).toEqual('#1677ff');
  });

  it('TODO: 嵌套 CP 时能拿到准确的 token 值', () => {});
});
