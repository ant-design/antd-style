import { Theme as AntdStyleTheme } from 'antd-style';

// 为 emotion 的 styled 注入 antd-style 的主题类型
declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends AntdStyleTheme {}
}
