import { Global } from '@emotion/react';
import { serializeStyles } from '@emotion/serialize';
import { memo } from 'react';

import { useTheme } from '@/hooks';
import { CSSStyle, StyledTheme } from '@/types';

export interface GlobalTheme {
  theme: StyledTheme;
}

/**
 * 创建全局样式
 * @param styles
 */
export const createGlobalStyle = (...styles: CSSStyle<GlobalTheme>) =>
  memo((props) => {
    const theme = useTheme();
    return <Global styles={serializeStyles(styles, undefined, { ...props, theme })} />;
  });
