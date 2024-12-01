import {
  GetAntdTheme,
  GetCustomStylish,
  GetCustomToken,
  StyledConfig,
  ThemeAppearance,
  ThemeMode,
} from '@/types';
import { ThemeConfig } from 'antd/es/config-provider/context';
import { ConfigOptions as MessageConfig } from 'antd/es/message/interface';
import { NotificationConfig } from 'antd/es/notification/interface';
import { ReactNode } from 'react';

export interface ThemeProviderProps<T, S = Record<string, string>> {
  children?: ReactNode;
  // --------------------- 自定义主题 --------------------- //
  /**
   * 自定义 Token
   */
  customToken?: T | GetCustomToken<T>;
  /**
   * 自定义 Stylish
   */
  customStylish?: GetCustomStylish<S>;
  styled?: StyledConfig;

  // --------------------- antd 主题 --------------------- //
  prefixCls?: string;
  /**
   * 直接传入 antd 主题，或者传入一个函数，根据当前的主题模式返回对应的主题
   */
  theme?: ThemeConfig | GetAntdTheme;

  /**
   * 静态方法的入参
   */
  staticInstanceConfig?: {
    message?: MessageConfig;
    notification?: NotificationConfig;
  };
  // --------------------- 主题切换 --------------------- //
  /**
   * 应用的展示外观主题，默认提供亮色和暗色两种，用户可以自行扩展
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
  onThemeModeChange?: (mode: ThemeMode) => void;
}
