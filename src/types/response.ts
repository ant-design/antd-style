import { SerializedStyles } from './css';

export type Breakpoint =
  | 'xxl'
  | 'xl'
  | 'lg'
  | 'md'
  | 'sm'
  /**
   * 最小断点，可以作为移动端的判断断点
   */
  | 'xs';

export type DeviceScreen = 'mobile' | 'tablet' | 'laptop' | 'desktop';

export type ResponsiveKey = Breakpoint | DeviceScreen;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ResponsiveMap extends Record<ResponsiveKey, SerializedStyles> {
  // 在此处扩展响应式映射表
}
