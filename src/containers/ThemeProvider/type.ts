import { GetAntdThemeConfig, GetCustomStylish, GetCustomToken } from '@/types';
import { ThemeConfig } from 'antd/es/config-provider/context';
import { MessageInstance } from 'antd/es/message/interface';
import { ModalStaticFunctions } from 'antd/es/modal/confirm';
import { NotificationInstance } from 'antd/es/notification/interface';
import { ReactNode } from 'react';

export interface ThemeProviderProps<T, S = Record<string, string>> {
  children: ReactNode;
  /**
   * 自定义 Token
   */
  customToken?: T | GetCustomToken<T>;
  /**
   * 自定义 Stylish
   */
  customStylish?: S | GetCustomStylish<S>;
  /**
   * 直接传入 antd 主题，或者传入一个函数，根据当前的主题模式返回对应的主题
   */
  theme?: ThemeConfig | GetAntdThemeConfig;
  prefixCls?: string;
  /**
   * 从 ThemeProvider 中获取静态方法的实例对象
   * @param instances
   */
  getStaticInstance?: (instances: StaticInstance) => void;
}

export interface StaticInstance {
  message: MessageInstance;
  notification: NotificationInstance;
  modal: Omit<ModalStaticFunctions, 'warn'>;
}
