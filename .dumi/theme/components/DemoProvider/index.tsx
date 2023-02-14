import { StyleProvider } from 'antd-style';
import type { PropsWithChildren } from 'react';

export default ({ children }: PropsWithChildren) => {
  return <StyleProvider prefix={'demo'}>{children}</StyleProvider>;
};
