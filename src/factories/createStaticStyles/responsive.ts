/**
 * 固定的响应式断点映射（基于 antd 默认值）
 * 这些值是静态的，不依赖运行时 token
 */
export const responsive = {
  xs: '@media (max-width: 479.98px)',
  sm: '@media (max-width: 575.98px)',
  md: '@media (max-width: 767.98px)',
  lg: '@media (max-width: 991.98px)',
  xl: '@media (max-width: 1199.98px)',
  xxl: '@media (min-width: 1200px)',
} as const;

export type StaticResponsiveMap = typeof responsive;
