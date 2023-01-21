import { StyleProvider } from 'antd-style';
import { useOutlet } from 'dumi';

export default () => {
  const outlet = useOutlet();
  return <StyleProvider prefix={'demo'}>{outlet}</StyleProvider>;
};
