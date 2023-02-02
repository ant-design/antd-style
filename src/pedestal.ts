export {
  css as reactCss,
  ThemeProvider as EmotionThemeProvider,
  useTheme,
  withTheme,
} from '@emotion/react';

//  styled 方法
import type { CreateStyled } from '@/types';
import _styled from '@emotion/styled';
export const styled = _styled as CreateStyled;
