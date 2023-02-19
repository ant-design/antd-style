import { renderHook } from '@testing-library/react';
import { useResponsive } from 'antd-style';

describe('useResponsive', () => {
  it('获取响应式结果', () => {
    const { result } = renderHook(useResponsive);
    expect(result.current).toMatchInlineSnapshot(`
      {
        "desktop": false,
        "laptop": false,
        "lg": false,
        "md": false,
        "mobile": false,
        "sm": false,
        "tablet": false,
        "xl": false,
        "xs": false,
        "xxl": false,
      }
    `);
  });
});
