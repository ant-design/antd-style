import { ThemeConfig } from 'antd/es/config-provider/context';
import { FC, ReactNode } from 'react';

import AntdProvider from './AntdProvider';

export type DisplayTheme = 'dark' | 'light';

export type ThemeMode = 'auto' | 'dark' | 'light';

export interface AppContainerProps {
  /**
   * 应用的展示外观主题，只存在亮色和暗色两种
   */
  appearance?: DisplayTheme;
  defaultAppearance?: DisplayTheme;
  onAppearanceChange?: (mode: DisplayTheme) => void;
  /**
   * 主题的展示模式，有三种配置：跟随系统、亮色、暗色
   * 默认不开启自动模式，需要手动进行配置
   * @default light
   */
  themeMode?: ThemeMode;
  defaultThemeMode?: ThemeMode;
  onThemeModeChange?: (mode: ThemeMode) => void;

  /**
   * 透传到 antd CP 中的主题对象
   */
  antdTheme?: ThemeConfig;
  children: ReactNode;
}

export const AppContainer: FC<AppContainerProps> = ({ children }) => {
  return <AntdProvider>{children}</AntdProvider>;
};
