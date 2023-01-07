import { FC, memo, ReactNode, useCallback, useLayoutEffect } from 'react';
import useControlledState from 'use-merge-value';

import { ThemeModeContext } from '@/context';
import { ThemeAppearance, ThemeMode } from '@/types';

let darkThemeMatch: MediaQueryList;

const matchThemeMode = (mode: ThemeAppearance) => matchMedia(`(prefers-color-scheme: ${mode})`);

export interface ThemeSwitcherProps {
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
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(
  ({
    children,
    appearance: appearanceProp,
    defaultAppearance,
    onAppearanceChange,
    themeMode = 'light',
  }) => {
    const [appearance, setAppearance] = useControlledState<ThemeAppearance>('light', {
      value: appearanceProp,
      defaultValue: defaultAppearance,
      onChange: onAppearanceChange,
    });

    const matchBrowserTheme = useCallback(() => {
      if (matchThemeMode('dark').matches) {
        setAppearance('dark');
      } else {
        setAppearance('light');
      }
    }, [setAppearance]);

    useLayoutEffect(() => {
      // 如果是自动的话，则去做一次匹配
      if (themeMode === 'auto') matchBrowserTheme();
      // 否则就明确设定亮暗色
      else setAppearance(themeMode);
    }, [themeMode]);

    useLayoutEffect(() => {
      if (!darkThemeMatch) {
        darkThemeMatch = matchThemeMode('dark');
      }

      if (!themeMode || themeMode === 'auto') {
        setTimeout(() => {
          matchBrowserTheme();
        }, 1);
      }

      darkThemeMatch.addEventListener('change', matchBrowserTheme);

      return () => {
        darkThemeMatch.removeEventListener('change', matchBrowserTheme);
      };
    }, []);

    return (
      <ThemeModeContext.Provider
        value={{
          themeMode,
          appearance,
          isDarkMode: appearance === 'dark',
        }}
      >
        {children}
      </ThemeModeContext.Provider>
    );
  },
);

export default ThemeSwitcher;
