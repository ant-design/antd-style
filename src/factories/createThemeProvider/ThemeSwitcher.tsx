import { FC, memo, ReactNode, useLayoutEffect, useState } from 'react';
import useMergeValue from 'use-merge-value';

import { ThemeModeContext } from '@/context';
import { BrowserPrefers, ThemeAppearance, ThemeMode, UseTheme } from '@/types';
import { matchBrowserPrefers } from '@/utils/matchBrowserPrefers';
import { safeStartTransition } from '@/utils/safeStartTransition';

let darkThemeMatch: MediaQueryList;

const ThemeObserver: FC<{
  themeMode: ThemeMode;
  setAppearance: (value: ThemeAppearance) => void;
  setBrowserPrefers: (value: BrowserPrefers) => void;
}> = ({ themeMode, setAppearance, setBrowserPrefers }) => {
  const matchBrowserTheme = () => {
    safeStartTransition(() => {
      if (matchBrowserPrefers('dark').matches) {
        setAppearance('dark');
      } else {
        setAppearance('light');
      }
    });
  };

  const updateBrowserTheme = () => {
    safeStartTransition(() => {
      if (matchBrowserPrefers('dark').matches) {
        setBrowserPrefers('dark');
      } else {
        setBrowserPrefers('light');
      }
    });
  };

  // 自动监听系统主题变更
  useLayoutEffect(() => {
    // 如果不是自动，就明确设定亮暗色
    if (themeMode !== 'auto') {
      safeStartTransition(() => {
        setAppearance(themeMode);
      });
      return;
    }
    // 如果是自动的话，则去做一次匹配，并开始监听
    setTimeout(matchBrowserTheme, 1);

    if (!darkThemeMatch) {
      darkThemeMatch = matchBrowserPrefers('dark');
    }
    darkThemeMatch.addEventListener('change', matchBrowserTheme);

    return () => {
      darkThemeMatch.removeEventListener('change', matchBrowserTheme);
    };
  }, [themeMode]);

  useLayoutEffect(() => {
    if (!darkThemeMatch) {
      darkThemeMatch = matchBrowserPrefers('dark');
    }

    darkThemeMatch.addEventListener('change', updateBrowserTheme);

    return () => {
      darkThemeMatch.removeEventListener('change', updateBrowserTheme);
    };
  }, []);

  return null;
};

export interface ThemeSwitcherProps {
  /**
   * 应用的展示外观主题，只存在亮色和暗色两种
   * @default light
   */
  appearance?: ThemeAppearance;
  defaultAppearance?: ThemeAppearance;
  onAppearanceChange?: (appearance: ThemeAppearance) => void;
  /**
   * 主题的展示模式，有三种配置：跟随系统、亮色、暗色
   * 默认不开启自动模式，需要手动进行配置
   * @default light
   */
  themeMode?: ThemeMode;
  defaultThemeMode?: ThemeMode;
  onThemeModeChange?: (themeMode: ThemeMode) => void;

  children: ReactNode;
  useTheme: UseTheme;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(
  ({
    children,
    appearance: appearanceProp,
    defaultAppearance,
    onAppearanceChange,
    themeMode: themeModeProps,
    defaultThemeMode,
    onThemeModeChange,
    useTheme,
  }) => {
    const { appearance: upperAppearance, themeMode: upperThemeMode } = useTheme();

    const [themeMode, setThemeMode] = useMergeValue<ThemeMode>('light', {
      value: themeModeProps,
      defaultValue: defaultThemeMode ?? upperThemeMode,
      onChange: (v) => onThemeModeChange?.(v),
    });

    const [appearance, setAppearance] = useMergeValue<ThemeAppearance>('light', {
      value: appearanceProp,
      defaultValue: defaultAppearance ?? upperAppearance,
      onChange: (v) => onAppearanceChange?.(v),
    });

    const [browserPrefers, setBrowserPrefers] = useState<BrowserPrefers>(
      matchBrowserPrefers('dark')?.matches ? 'dark' : 'light',
    );

    return (
      <ThemeModeContext.Provider
        value={{
          themeMode,
          setThemeMode,
          appearance,
          setAppearance,
          isDarkMode: appearance === 'dark',
          browserPrefers,
        }}
      >
        {
          // Wait until after client-side hydration to show
          typeof window !== 'undefined' && (
            <ThemeObserver
              themeMode={themeMode}
              setAppearance={setAppearance}
              setBrowserPrefers={setBrowserPrefers}
            />
          )
        }
        {children}
      </ThemeModeContext.Provider>
    );
  },
);

ThemeSwitcher.displayName = 'ThemeSwitcher';

export default ThemeSwitcher;
