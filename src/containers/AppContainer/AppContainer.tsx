import { App } from 'antd';
import { memo, ReactElement } from 'react';

import { ThemeAppearance, ThemeMode } from '@/types';

import { ThemeProvider, ThemeProviderProps } from '../ThemeProvider';
import ThemeSwitcher from './ThemeSwitcher';

export interface AppContainerProps<T, S = Record<string, string>> extends ThemeProviderProps<T, S> {
  /**
   * 应用的展示外观主题，只存在亮色和暗色两种
   * @default light
   */
  appearance?: ThemeAppearance;
  defaultAppearance?: ThemeAppearance;
  onAppearanceChange?: (mode: ThemeAppearance) => void;
  /**
   * 主题的展示模式，有三种配置：跟随系统、亮色、暗色
   * 默认不开启自动模式，需要手动进行配置
   * @default light
   */
  themeMode?: ThemeMode;

  className?: string;
}

export const AppContainer: <T, S>(props: AppContainerProps<T, S>) => ReactElement | null = memo(
  ({
    children,
    appearance,
    defaultAppearance,
    onAppearanceChange,
    themeMode,
    customToken,
    customStylish,
    className,
    ...props
  }) => (
    <ThemeSwitcher
      themeMode={themeMode}
      defaultAppearance={defaultAppearance}
      appearance={appearance}
      onAppearanceChange={onAppearanceChange}
    >
      <ThemeProvider customStylish={customStylish} customToken={customToken} {...props}>
        <App className={className}>{children}</App>
      </ThemeProvider>
    </ThemeSwitcher>
  ),
);
