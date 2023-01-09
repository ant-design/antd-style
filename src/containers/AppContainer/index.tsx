import { App } from 'antd';
import { memo, ReactElement } from 'react';

import { ThemeProvider, ThemeProviderProps } from '../ThemeProvider';

export interface AppContainerProps<T, S = Record<string, string>> extends ThemeProviderProps<T, S> {
  className?: string;
}

export const AppContainer: <T, S>(props: AppContainerProps<T, S>) => ReactElement | null = memo(
  ({
    children,

    className,
    ...props
  }) => (
    <ThemeProvider {...props}>
      <App className={className}>{children}</App>
    </ThemeProvider>
  ),
);
