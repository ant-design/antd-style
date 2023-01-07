import { AntdTheme } from '@/types';
import { useAntdStylish } from './useAntdStylish';
import { useAntdToken } from './useAntdToken';

export const useAntdTheme = (): AntdTheme => {
  const token = useAntdToken();
  const antdStylish = useAntdStylish();

  return { stylish: antdStylish, ...token };
};
