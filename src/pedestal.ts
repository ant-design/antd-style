export { css as reactCss } from '@emotion/react';
// styled 配套的
export { ThemeProvider as PedestalProvider, useTheme, withTheme } from 'styled-components';

//  styled 方法
import type { CreateStyled } from '@/types';
import _styled from 'styled-components';
export const styled = _styled as unknown as CreateStyled;
