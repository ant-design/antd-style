/* istanbul ignore file */

// copied from https://github.com/emotion-js/emotion/blob/main/packages/utils/src/index.js
import type { HashPriority } from '@/types';
import type { EmotionCache } from '@emotion/css/create-instance';
import type { SerializedStyles } from '@emotion/serialize';
import { registerStyles } from '@emotion/utils';

const isBrowser = typeof document !== 'undefined';

/**
 * 向浏览器插入样式表
 * @param cache
 * @param serialized
 * @param isStringTag
 * @param hashPriority
 */
export const insertStyles = (
  cache: EmotionCache,
  serialized: SerializedStyles,
  isStringTag: boolean,
  hashPriority: HashPriority = 'high',
) => {
  registerStyles(cache, serialized, isStringTag);

  const hashClassName = `.${cache.key}-${serialized.name}`;

  const hashSelector = hashPriority === 'low' ? `:where(${hashClassName})` : hashClassName;

  if (cache.inserted[serialized.name] === undefined) {
    let stylesForSSR = '';
    let current = serialized;
    do {
      let maybeStyles = cache.insert(
        serialized === current ? hashSelector : '',
        current,
        cache.sheet,
        true,
      );
      if (!isBrowser && maybeStyles !== undefined) {
        stylesForSSR += maybeStyles;
      }
      // @ts-ignore
      current = current.next;
    } while (current !== undefined);

    if (!isBrowser && stylesForSSR.length !== 0) {
      return stylesForSSR;
    }
  }
};
