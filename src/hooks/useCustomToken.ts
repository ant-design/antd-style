import { CustomToken } from '@/types';
import { useCacheToken } from '@ant-design/cssinjs';
import { useToken as useInternalToken } from 'antd/lib/theme/internal';
import React from 'react';

function useCssVarConf() {
  const [theme, realToken, hashId, token, cssVar, zeroRuntime] = useInternalToken();
  const themeKey = React.useId();

  const mergeCssVar = {
    ...cssVar,
    key: `antd-style-${cssVar?.key}-${themeKey.replace(/:/g, '')}`,
  };

  // copied from https://github.com/ant-design/ant-design/blob/4e8d79581e4ec2b4a4cf7abf2e1ee4e939ba1a90/components/theme/util/genStyleUtils.ts#L25-L27
  return { theme, realToken, hashId, token, cssVar: mergeCssVar, zeroRuntime };
}

export function useCustomToken(customToken: CustomToken) {
  const { theme, cssVar } = useCssVarConf();

  const [token, hashId, realToken] = useCacheToken<CustomToken>(theme, [], {
    salt: 'antd-style',
    override: customToken || {},
    getComputedToken: (_, override) => override as any,
    cssVar,
  });

  return {
    token,
    hashId,
    realToken,
    cssVarCls: cssVar.key ?? '',
  };
}
