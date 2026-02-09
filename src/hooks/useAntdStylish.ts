import { useContext, useMemo } from 'react';

import { AppearanceContext } from '@/context';
import { serializeCSS } from '@/core';
import { createAntdStylish } from '@/stylish/button';
import { AntdStylish } from '@/types';

import { convertStylishToString } from '@/utils/convertStylish';
import { useAntdToken } from './useAntdToken';

export const useAntdStylish = (): AntdStylish => {
  const token = useAntdToken();
  const appearance = useContext(AppearanceContext);
  const isDarkMode = appearance === 'dark';

  return useMemo(
    () =>
      convertStylishToString(
        createAntdStylish({ token, css: serializeCSS, appearance, isDarkMode }),
      ),
    [token, appearance, isDarkMode],
  );
};
