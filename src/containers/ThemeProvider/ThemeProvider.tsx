import { ReactElement } from 'react';

import AntdProvider from './AntdProvider';
import TokenContainer from './TokenContainer';
import { ThemeProviderProps } from './type';

export const ThemeProvider: <T, S>(props: ThemeProviderProps<T, S>) => ReactElement | null = ({
  children,
  customToken,
  customStylish,
  theme: themeProp,
  prefixCls,
}) => {
  return (
    <AntdProvider prefixCls={prefixCls} theme={themeProp}>
      <TokenContainer customToken={customToken} customStylish={customStylish}>
        {children}
      </TokenContainer>
    </AntdProvider>
  );
};
