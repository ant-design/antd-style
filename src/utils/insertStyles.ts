// copied from https://github.com/emotion-js/emotion/blob/main/packages/utils/src/index.js
import type { HashPriority } from '@/types';
import type { EmotionCache } from '@emotion/css/create-instance';
import type { SerializedStyles } from '@emotion/serialize';

const isBrowser = typeof document !== 'undefined';

const registerStyles = (
  cache: EmotionCache,
  serialized: SerializedStyles,
  isStringTag: boolean,
) => {
  let className = `${cache.key}-${serialized.name}`;
  if (
    // we only need to add the styles to the registered cache if the
    // class name could be used further down
    // the tree but if it's a string tag, we know it won't
    // so we don't have to add it to registered cache.
    // this improves memory usage since we can avoid storing the whole style string
    (isStringTag === false ||
      // we need to always store it if we're in compat mode and
      // in node since emotion-server relies on whether a style is in
      // the registered cache to know whether a style is global or not
      // also, note that this check will be dead code eliminated in the browser
      (isBrowser === false && cache.compat !== undefined)) &&
    cache.registered[className] === undefined
  ) {
    cache.registered[className] = serialized.styles;
  }
};

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
