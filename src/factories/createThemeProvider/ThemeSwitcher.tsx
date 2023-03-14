import { useMergeValue } from '@/utils/useMergeValue';
import { FC, memo, ReactNode, useEffect, useLayoutEffect, useMemo, useState } from 'react';

import { ThemeModeContext } from '@/context';
import { BrowserPrefers, ThemeAppearance, ThemeMode, UseTheme } from '@/types';
import { matchBrowserPrefers } from '@/utils/matchBrowserPrefers';

let darkThemeMatch: MediaQueryList;

const ThemeObserver: FC<{
  themeMode: ThemeMode;
  setAppearance: (value: ThemeAppearance) => void;
  setBrowserPrefers: (value: BrowserPrefers) => void;
}> = ({ themeMode, setAppearance, setBrowserPrefers }) => {
  const matchBrowserTheme = () => {
    if (matchBrowserPrefers('dark').matches) {
      setAppearance('dark');
    } else {
      setAppearance('light');
    }
  };

  const updateBrowserTheme = () => {
    if (matchBrowserPrefers('dark').matches) {
      setBrowserPrefers('dark');
    } else {
      setBrowserPrefers('light');
    }
  };

  // 自动监听系统主题变更
  useLayoutEffect(() => {
    // 如果不是自动，就明确设定亮暗色
    if (themeMode !== 'auto') {
      setAppearance(themeMode);
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

  useEffect(() => {
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
  onAppearanceChange?: (mode: ThemeAppearance) => void;
  /**
   * 主题的展示模式，有三种配置：跟随系统、亮色、暗色
   * 默认不开启自动模式，需要手动进行配置
   * @default light
   */
  themeMode?: ThemeMode;

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
    useTheme,
  }) => {
    const { appearance: upperAppearance, themeMode: upperThemeMode } = useTheme();

    const themeMode = useMemo(
      () => themeModeProps ?? upperThemeMode,
      [themeModeProps, upperThemeMode],
    );

    const [appearance, setAppearance] = useMergeValue<ThemeAppearance>('light', {
      value: appearanceProp,
      defaultValue: defaultAppearance ?? upperAppearance,
      onChange: onAppearanceChange,
    });

    const [browserPrefers, setBrowserPrefers] = useState<BrowserPrefers>(
      matchBrowserPrefers('dark')?.matches ? 'dark' : 'light',
    );

    const [startObserver, setStartObserver] = useState(false);

    // Wait until after client-side hydration to show
    useEffect(() => {
      setStartObserver(true);
    }, []);

    return (
      <ThemeModeContext.Provider
        value={{
          themeMode,
          appearance,
          isDarkMode: appearance === 'dark',
          browserPrefers,
        }}
      >
        {startObserver && (
          <ThemeObserver
            themeMode={themeMode}
            setAppearance={setAppearance}
            setBrowserPrefers={setBrowserPrefers}
          />
        )}
        {children}
      </ThemeModeContext.Provider>
    );
  },
);

export default ThemeSwitcher;
