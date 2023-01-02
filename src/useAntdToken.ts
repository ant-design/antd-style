import { theme } from 'antd';

import { AntdToken } from './types';

export const useAntdToken = (): AntdToken => {
  const { token } = theme.useToken();

  return token;
};
