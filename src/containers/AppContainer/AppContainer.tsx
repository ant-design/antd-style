import { memo, ReactElement, ReactNode } from 'react';

import { ThemeAppearance, ThemeMode } from '@/types';

import { type AntdProviderProps } from './AntdProvider';
import ThemeContent, { ThemeContentProps } from './ThemeContent';
import ThemeSwitcher from './ThemeSwitcher';

export interface AppContainerProps<T, S = Record<string, string>>
  extends AntdProviderProps,
    ThemeContentProps<T, S> {
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

  children: ReactNode;

  className?: string;
  prefixCls?: string;
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
    ...props
  }) => (
    <ThemeSwitcher
      themeMode={themeMode}
      defaultAppearance={defaultAppearance}
      appearance={appearance}
      onAppearanceChange={onAppearanceChange}
    >
      <ThemeContent customStylish={customStylish} customToken={customToken} {...props}>
        {children}
      </ThemeContent>
    </ThemeSwitcher>
  ),
);
