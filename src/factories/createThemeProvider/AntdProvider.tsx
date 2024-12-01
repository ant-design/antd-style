import { ConfigProvider, theme, ThemeConfig } from 'antd';
import { memo, useLayoutEffect, useMemo, type FC } from 'react';

import { useThemeMode } from '@/hooks';
import type { ThemeProviderProps } from './type';

type AntdProviderProps = Pick<ThemeProviderProps<any>, 'theme' | 'prefixCls' | 'children'>;

const Provider: FC<AntdProviderProps> = memo(({ children, theme: themeProp, prefixCls }) => {
  const { appearance, isDarkMode } = useThemeMode();

  // 获取 antd 主题
  const antdTheme = useMemo<ThemeConfig>(() => {
    const baseAlgorithm = isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm;

    let antdTheme = themeProp as ThemeConfig | undefined;

    if (typeof themeProp === 'function') {
      antdTheme = themeProp(appearance);
    }

    if (!antdTheme) {
      return { algorithm: baseAlgorithm };
    }

    // 如果有 themeProp 说明是外部传入的 theme，需要对算法做一个合并处理，因此先把 themeProp 的算法规整为一个数组
    const algoProp = !antdTheme.algorithm
      ? []
      : antdTheme.algorithm instanceof Array
      ? antdTheme.algorithm
      : [antdTheme.algorithm];

    return {
      ...antdTheme,
      algorithm: !antdTheme.algorithm ? baseAlgorithm : [baseAlgorithm, ...algoProp],
    };
  }, [themeProp, isDarkMode]);

  return (
    <ConfigProvider prefixCls={prefixCls} theme={antdTheme}>
      {children}
    </ConfigProvider>
  );
});

Provider.displayName = 'AntdProvider';

const AntdProvider = memo<AntdProviderProps>(({ children, theme, prefixCls }) => {
  useLayoutEffect(() => {
    ConfigProvider.config({
      holderRender: (children) => (
        <Provider theme={theme} prefixCls={prefixCls}>
          {children}
        </Provider>
      ),
    });
  }, [prefixCls, theme]);

  return (
    <Provider theme={theme} prefixCls={prefixCls}>
      {children}
    </Provider>
  );
});

export default AntdProvider;
