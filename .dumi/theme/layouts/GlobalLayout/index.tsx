import { createCache, StyleProvider } from '@ant-design/cssinjs';
import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import { styleManager } from 'antd-style';
import { useOutlet } from 'dumi';

const antdCache = createCache();

// @ts-ignore
global.__ANTD_CACHE__ = antdCache;

// @ts-ignore
global.__EMOTION_CACHE__ = cache;

// @ts-ignore
global.__ANTD_STYLE_CACHE__ = styleManager.cache;

export default () => {
  const Outlet = useOutlet();

  return (
    <CacheProvider value={styleManager.cache}>
      <StyleProvider cache={antdCache}>{Outlet}</StyleProvider>
    </CacheProvider>
  );
};
