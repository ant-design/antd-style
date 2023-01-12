import { GetCustomStylish, GetCustomToken, ThemeAppearance, ThemeMode } from '@/types';
import { ThemeConfig } from 'antd/es/config-provider/context';
import { ConfigOptions as MessageConfig, MessageInstance } from 'antd/es/message/interface';
import { ModalStaticFunctions } from 'antd/es/modal/confirm';
import { NotificationConfig, NotificationInstance } from 'antd/es/notification/interface';
import { ReactNode } from 'react';

export interface GetAntdTheme {
  (appearance: ThemeAppearance): ThemeConfig | undefined;
}

export interface ThemeProviderProps<T, S = Record<string, string>> {
  children: ReactNode;
  // --------------------- 自定义主题 --------------------- //
  /**
   * 自定义 Token
   */
  customToken?: T | GetCustomToken<T>;
  /**
   * 自定义 Stylish
   */
  customStylish?: S | GetCustomStylish<S>;
  // --------------------- antd 主题 --------------------- //
  /**
   * 直接传入 antd 主题，或者传入一个函数，根据当前的主题模式返回对应的主题
   */
  theme?: ThemeConfig | GetAntdTheme;
  prefixCls?: string;

  /**
   * 从 ThemeProvider 中获取静态方法的实例对象
   * @param instances
   */
  getStaticInstance?: (instances: StaticInstance) => void;

  /**
   * 静态方法的入参
   */
  staticInstanceConfig?: {
    message?: MessageConfig;
    notification?: NotificationConfig;
  };
  // --------------------- 主题切换 --------------------- //
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
}

export interface StaticInstance {
  message: MessageInstance;
  notification: NotificationInstance;
  modal: Omit<ModalStaticFunctions, 'warn'>;
}
