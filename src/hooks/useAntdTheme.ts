import { AntdTheme } from '@/types';
import { useMemo } from 'react';
import { useAntdStylish } from './useAntdStylish';
import { useAntdToken } from './useAntdToken';

export const useAntdTheme = (): AntdTheme => {
  const token = useAntdToken();
  const antdStylish = useAntdStylish();

  return useMemo(() => ({ stylish: antdStylish, ...token }), [token, antdStylish]);
};
