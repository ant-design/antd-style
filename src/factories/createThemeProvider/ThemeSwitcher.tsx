import { FC, memo, ReactNode, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import useControlledState from 'use-merge-value';

import { ThemeModeContext } from '@/context';
import { ThemeAppearance, ThemeMode, UseTheme } from '@/types';

let darkThemeMatch: MediaQueryList;

const matchThemeMode = (mode: ThemeAppearance) =>
  matchMedia && matchMedia(`(prefers-color-scheme: ${mode})`);

const ThemeObserver: FC<{
  themeMode: ThemeMode;
  setAppearance: (value: ThemeAppearance) => void;
}> = ({ themeMode, setAppearance }) => {
  const matchBrowserTheme = () => {
    if (matchThemeMode('dark').matches) {
      setAppearance('dark');
    } else {
      setAppearance('light');
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
      darkThemeMatch = matchThemeMode('dark');
    }
    darkThemeMatch.addEventListener('change', matchBrowserTheme);

    return () => {
      darkThemeMatch.removeEventListener('change', matchBrowserTheme);
    };
  }, [themeMode]);

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

    const [appearance, setAppearance] = useControlledState<ThemeAppearance>('light', {
      value: appearanceProp,
      defaultValue: defaultAppearance ?? upperAppearance,
      onChange: onAppearanceChange,
    });

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
        }}
      >
        {startObserver && <ThemeObserver themeMode={themeMode} setAppearance={setAppearance} />}
        {children}
      </ThemeModeContext.Provider>
    );
  },
);

export default ThemeSwitcher;
