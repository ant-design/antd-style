import { useAntdToken } from '@/hooks/useAntdToken';
import { AntdStylish } from '@/types';
import { useMemo } from 'react';

export const useAntdStylish = (): AntdStylish => {
  const token = useAntdToken();

  return useMemo(() => {
    return {};
  }, [token]);
};
