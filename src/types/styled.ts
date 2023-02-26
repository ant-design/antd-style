import { Context, FC, ReactNode } from 'react';
import { Theme } from './theme';

export interface StyledConfig {
  /**
   * styled 对象所对应的 ThemeContext
   * @requires
   */
  ThemeContext: Context<any>;
  /**
   * 可以注入相应 styled 方法的 ThemeProvider，或其他自己定义的ThemeProvider
   */
  ThemeProvider?: StyledThemeProvider;
}

export type StyledThemeProvider = FC<{ theme: Theme; children: ReactNode }>;
