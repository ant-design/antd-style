import { renderHook } from '@testing-library/react';

import { useAntdToken } from 'antd-style';

describe('useAntdToken', () => {
  it('can get colorPrimary', () => {
    const { result } = renderHook(useAntdToken);
    expect(result.current.colorPrimary.toLowerCase()).toEqual('#1677ff');
  });
});
