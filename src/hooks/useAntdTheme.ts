import { useMemo } from 'react';

import { AntdTheme } from '@/types';
import { useAntdStylish } from './useAntdStylish';
import { useAntdToken } from './useAntdToken';

export const useAntdTheme = (): AntdTheme => {
  const token = useAntdToken();
  const stylish = useAntdStylish();

  return useMemo(() => ({ ...token, stylish }), [token, stylish]);
};
