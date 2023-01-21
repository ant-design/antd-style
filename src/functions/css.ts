import createEmotion from '@emotion/css/create-instance';

export const emotion = createEmotion({
  key: 'ant-css',
  speedy: false,
});

export const {
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
} = emotion;
export { type CSSObject } from '@emotion/css';
export type { Emotion } from '@emotion/css/create-instance';
export { createEmotion };
