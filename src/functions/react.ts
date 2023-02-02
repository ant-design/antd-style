import _styled from '@emotion/styled';

import type { CreateStyled } from '@/types';

export const styled = _styled as CreateStyled;
export { css as reactCss, ThemeProvider as EmotionThemeProvider, withTheme } from '@emotion/react';
