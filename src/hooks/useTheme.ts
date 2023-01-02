import { Theme } from '@/types';
import { useTheme as _useTheme } from '@emotion/react';

export const useTheme = () => _useTheme() as Theme;
