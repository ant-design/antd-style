import { Global, css as emotionCss } from '@emotion/react';
import { serializeStyles } from '@emotion/serialize';
import { memo } from 'react';

import { CSSStyle, FullToken, Theme } from '@/types';

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

export const createGlobalFactory =
  (useTheme: () => Theme) =>
  (
    styleFn: ({
      token,
      css,
    }: {
      token: FullToken;
      css: typeof emotionCss;
    }) => ReturnType<typeof emotionCss>,
  ) => {
    return memo(() => {
      const token = useTheme();
      return <Global styles={styleFn({ token, css: emotionCss })} />;
    });
  };
