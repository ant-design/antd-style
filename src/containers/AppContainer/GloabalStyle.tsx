import { createGlobalStyle, GlobalTheme } from '@/functions';
import { CSSStyle } from '@/types';
import { FC, memo } from 'react';

export interface GlobalStyleProps {
  /**
   * 全局样式
   */
  globalStyle?: CSSStyle<GlobalTheme>;
}

export const GlobalStyle: FC<GlobalStyleProps> = memo(({ globalStyle }) => {
  const Style = createGlobalStyle(...(globalStyle || []));

  return <Style />;
});
