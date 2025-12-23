import { useMemo } from 'react';

import { AntdTheme } from '@/types';
import { theme } from 'antd';
import { useAntdStylish } from './useAntdStylish';

export const useAntdTheme = (): AntdTheme => {
  const { token, cssVar } = theme.useToken();
  const stylish = useAntdStylish();

  return useMemo(() => ({ ...token, stylish, cssVar }), [token, stylish, cssVar]);
};
