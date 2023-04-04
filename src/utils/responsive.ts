import { Breakpoint } from '@/types';

export const convertBreakpointToResponsive = <T extends Partial<Record<Breakpoint, any>>>(
  breakpoints: T,
): any => ({
  ...breakpoints,
  mobile: breakpoints.xs,
  tablet: breakpoints.md,
  laptop: breakpoints.lg,
  desktop: breakpoints.xxl,
});
