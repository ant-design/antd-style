import { reactCss } from '@/functions/react';
import { useAntdToken } from '@/hooks';
import type { Breakpoint, ResponsiveKey, ResponsiveMap } from '@/types';
import { isReactCssResult } from '@/utils';
import type { SerializedStyles } from '@emotion/react';
import type { CSSObject } from '@emotion/serialize';
import { useMemo } from 'react';

export const useResponsiveMap = (): ResponsiveMap => {
  const token = useAntdToken();

  const breakpoints: Record<Breakpoint, string> = {
    xs: `@media (max-width: ${token.screenXSMax}px)`,
    sm: `@media (max-width: ${token.screenSMMax}px)`,
    md: `@media (max-width: ${token.screenMDMax}px)`,

    lg: `@media (max-width: ${token.screenLGMax}px)`,
    xl: `@media (max-width: ${token.screenXLMax}px)`,
    xxl: `@media (min-width: ${token.screenXXLMin}px)`,
  };

  return useMemo(
    () => ({
      ...breakpoints,
      mobile: breakpoints.xs,
      tablet: breakpoints.md,
      laptop: breakpoints.lg,
      desktop: breakpoints.xxl,
    }),
    [token],
  );
};

/**
 * 将响应式对象转换为
 * @param obj
 * @param map
 */
export const convertResponsiveStyleToString = (
  obj: Partial<Record<ResponsiveKey, SerializedStyles | CSSObject>>,
  map: ResponsiveMap,
): any => {
  return Object.entries(obj)
    .map(([key, value]) => {
      let str: SerializedStyles | CSSObject = value;

      if (!isReactCssResult(value)) {
        str = reactCss(value);
      }

      // @ts-ignore
      return map[key] ? `${map[key]} {${str.styles}}` : '';
    })
    .join('');
};
