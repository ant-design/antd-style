import { theme } from 'antd';

import { AntdToken } from './types';

export const useToken = (): AntdToken => {
  const { token } = theme.useToken();

  return token;
};
