import { useContext } from 'react';

import { ThemeModeContext } from '@/context';

export const useThemeMode = () => {
  const value = useContext(ThemeModeContext);

  if (value === undefined)
    throw Error(
      '[WrapperError]你可能没有使用 <AppContainer /> 组件，请确保在组件顶层包裹 AppContainer 组件后再使用该 hooks。',
    );

  return value;
};
