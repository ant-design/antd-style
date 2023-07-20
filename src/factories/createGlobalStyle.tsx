import { Global } from '@emotion/react';
import { serializeStyles } from '@emotion/serialize';
import { memo } from 'react';

import { CSSStyle, Theme } from '@/types';

export interface GlobalTheme {
  theme: Theme;
}

/**
 * 创建全局样式
 */
export const createGlobalStyleFactory =
  (useTheme: () => Theme) =>
  (...styles: CSSStyle<GlobalTheme>) =>
    memo((props) => {
      const theme = useTheme();
      return <Global styles={serializeStyles(styles, undefined, { ...props, theme })} />;
    });
