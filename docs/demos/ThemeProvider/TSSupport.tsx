/**
 * compact: true
 */
import { ThemeProvider, useTheme } from 'antd-style';

interface NewToken {
  customBrandColor: string;
}

// 通过给 antd-style 扩展 CustomToken 对象类型定义，可以为 useTheme 中增加相应的 token 对象
declare module 'antd-style' {
  export interface CustomToken extends NewToken {}
}

const App = () => {
  const token = useTheme();
  return <div>{token.customBrandColor}</div>;
};

export default () => (
  // 给 `ThemeProvider` 对象添加泛型，可以约束 `customToken` 的入参定义。
  <ThemeProvider<NewToken> customToken={{ customBrandColor: '#c956df' }}>
    <App />
  </ThemeProvider>
);

/**
 * In some instances, if you are using a previous version of React and/or Typescript,
 * you may get an error like this:
 *
 * 'ThemeProvider' cannot be used as a JSX component.
 * Its return type 'ReactNode' is not a valid JSX element.
 * Type 'undefined' is not assignable to type 'Element | null'.
 *
 * You can fix this by either upgrading React and/or Typescript, or by overriding the
 * ThemeProvider type definition like this:
 *
 * import { ThemeProviderProps } from 'antd-style'
 * ...
 * const ThemeProviderComponent = ThemeProvider as <T = any, S = any>(
 *   props: ThemeProviderProps<T, S>
 * ) => JSX.Element
 *
 * and then use ThemeProviderComponent instead of ThemeProvider.
 */
