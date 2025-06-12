import { StyleEngine, Theme } from '@/types';
import { Context, useContext, useMemo } from 'react';

import { DEFAULT_THEME_CONTEXT } from '@/functions/setupStyled';
import { useAntdTheme } from '@/hooks/useAntdTheme';
import { useThemeMode } from '@/hooks/useThemeMode';
import { ConfigProvider } from 'antd';

interface CreateUseThemeOptions {
  StyleEngineContext: Context<StyleEngine>;
}

export const createUseTheme = (options: CreateUseThemeOptions) => (): Theme => {
  const { StyleEngineContext } = options;
  const {
    StyledThemeContext,
    CustomThemeContext,
    prefixCls: outPrefixCls,
  } = useContext(StyleEngineContext);

  const antdTheme = useAntdTheme();
  const themeState = useThemeMode();

  const defaultCustomTheme = useContext(CustomThemeContext);
  const styledTheme = useContext(StyledThemeContext ?? DEFAULT_THEME_CONTEXT) || {};

  const { iconPrefixCls, getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const antdPrefixCls = getPrefixCls();
  // 只有当用户在 createInstance 中传入与字符串 'ant' 不一样的 prefixCls 时，才会使用用户的 prefixCls
  // 否则其他情况下都优先使用 antd 的 prefixCls
  const prefixCls = outPrefixCls && outPrefixCls !== 'ant' ? outPrefixCls : antdPrefixCls;

  const initTheme = useMemo<Theme>(
    () => ({
      ...antdTheme,
      ...themeState,
      ...defaultCustomTheme,
      prefixCls,
      iconPrefixCls,
      antdPrefixCls,
    }),
    [antdTheme, themeState, defaultCustomTheme, prefixCls, iconPrefixCls, antdPrefixCls],
  );

  //  如果是个空值，说明没有套 Provider，返回 antdTheme 的默认值
  if (!styledTheme || Object.keys(styledTheme).length === 0) {
    return initTheme;
  }

  return { ...styledTheme, prefixCls, iconPrefixCls, antdPrefixCls } as Theme;
};
