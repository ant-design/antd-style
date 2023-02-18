import { Theme } from 'antd-style/src';
import { FC, ReactNode } from 'react';

export interface StyledConfig {
  ThemeProvider?: StyledThemeProvider;
  useTheme?: () => any;
}

export type StyledThemeProvider = FC<{ theme: Theme; children: ReactNode }>;
