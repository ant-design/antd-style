import createEmotion from '@emotion/css/create-instance';

const {
  css,
  cx,
  injectGlobal,
  keyframes,
  sheet,
  flush,
  merge,
  hydrate,
  getRegisteredStyles,
  cache,
} = createEmotion({
  key: 'ant-css',
  speedy: false,
});

export { type CSSObject } from '@emotion/css';
export type { Emotion } from '@emotion/css/create-instance';
export {
  css,
  cx,
  injectGlobal,
  keyframes,
  sheet,
  flush,
  merge,
  hydrate,
  getRegisteredStyles,
  createEmotion,
  cache,
};
