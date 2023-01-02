import { useTheme } from '@/styled';
import { Global, Theme } from '@emotion/react';
import { serializeStyles } from '@emotion/serialize';
import { Interpolation } from '@emotion/styled';
import { memo } from 'react';

interface GlobalTheme {
  theme: Theme;
}

/**
 * 创建全局样式
 * @param styles
 */
export const createGlobalStyle = (
  ...styles: Array<TemplateStringsArray | Interpolation<GlobalTheme>>
) =>
  memo((props) => {
    const theme = useTheme();
    return <Global styles={serializeStyles(styles, undefined, { ...props, theme })} />;
  });
