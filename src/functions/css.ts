import { ClassNamesUtil } from '@/types';
import { createCX } from '@/utils';
import createEmotion from '@emotion/css/create-instance';

export const emotion = createEmotion({
  key: 'ant-css',
  speedy: false,
});

export const { injectGlobal, keyframes, sheet, flush, merge, hydrate, getRegisteredStyles, cache } =
  emotion;

export type { Emotion } from '@emotion/css/create-instance';
export { css } from '@emotion/react';
export { createEmotion };

/**
 * 用于将 css 生成的 styles 创建为 className
 * @param classNames
 */
export const cx: ClassNamesUtil = createCX(emotion.css, emotion.cx);
