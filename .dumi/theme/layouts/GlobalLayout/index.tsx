import { createCache, StyleProvider } from '@ant-design/cssinjs';
import { styleManager } from 'antd-style';
import { useOutlet } from 'dumi';

// @ts-ignore
global.__ANTD_STYLE_CACHE__ = styleManager.cache;

const styleCache = createCache();

// @ts-ignore
global.__ANTD_CACHE__ = styleCache;

export default () => {
  const Outlet = useOutlet();
  return <StyleProvider cache={styleCache}>{Outlet}</StyleProvider>;
};
