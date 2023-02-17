import { serializeCSS } from '@/core';
import { useAntdToken } from '@/hooks';
import type {
  Breakpoint,
  BreakpointMapParams,
  CSSObject,
  ResponsiveMap,
  SerializedStyles,
} from '@/types';
import { isReactCssResult } from '@/utils';
import { convertBreakpointToResponsive } from '@/utils/responsive';
import { useMemo } from 'react';

export const useMediaQueryMap = (): ResponsiveMap => {
  const token = useAntdToken();

  const breakpoints: Record<Breakpoint, string> = {
    xs: `@media (max-width: ${token.screenXSMax}px)`,
    sm: `@media (max-width: ${token.screenSMMax}px)`,
    md: `@media (max-width: ${token.screenMDMax}px)`,
    lg: `@media (max-width: ${token.screenLGMax}px)`,
    xl: `@media (max-width: ${token.screenXLMax}px)`,
    xxl: `@media (min-width: ${token.screenXXLMin}px)`,
  };

  return useMemo(() => convertBreakpointToResponsive(breakpoints), [token]);
};

/**
 * 将响应式对象转换为字符串
 * @param obj
 * @param map
 */
export const convertResponsiveStyleToString = (
  obj: BreakpointMapParams,
  map: ResponsiveMap,
): any => {
  return Object.entries(obj)
    .map(([key, value]) => {
      let str = value as SerializedStyles | CSSObject;

      if (!isReactCssResult(value)) {
        str = serializeCSS(value);
      }

      // @ts-ignore
      return map[key] ? `${map[key]} {${str.styles}}` : '';
    })
    .join('');
};
