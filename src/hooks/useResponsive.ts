import { ResponsiveKey } from '@/types';
import { convertBreakpointToResponsive } from '@/utils/responsive';
import { Grid } from 'antd';
import { useMemo } from 'react';

export const useResponsive = (): Partial<Record<ResponsiveKey, boolean>> => {
  const breakpoints = Grid.useBreakpoint();

  return useMemo(() => convertBreakpointToResponsive(breakpoints), [breakpoints]);
};
