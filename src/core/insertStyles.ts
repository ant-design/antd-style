// copied from https://github.com/emotion-js/emotion/blob/main/packages/utils/src/index.js
import { ClassNameGeneratorOption } from '@/types';
import type { EmotionCache } from '@emotion/css/create-instance';
import type { SerializedStyles } from '@emotion/serialize';
import { registerStyles } from '@emotion/utils';

const isBrowser = typeof document !== 'undefined';

export interface InternalClassNameOption extends ClassNameGeneratorOption {
  /**
   *  用于生成 className 的文件名，用于 babel 插件使用，不对用户透出
   */
  __BABEL_FILE_NAME__?: string;
}

export const createHashStyleName = (
  cacheKey: string,
  hash: string,
  options?: InternalClassNameOption,
) => {
  const fileName = options?.__BABEL_FILE_NAME__;
  const label = options?.label;

  const babelSuffix = fileName ? `__${fileName}` : '';
  const labelSuffix = label ? `__${label}` : '';

  const prefix = `${cacheKey}-${hash}`;

  return prefix + labelSuffix + babelSuffix;
};

/**
 * 向浏览器插入样式表
 * @param cache
 * @param serialized
 * @param isStringTag
 * @param options
 */
export const insertStyles = (
  cache: EmotionCache,
  serialized: SerializedStyles,
  isStringTag: boolean,
  options: InternalClassNameOption,
) => {
  const hashPriority = options.hashPriority || 'high';
  registerStyles(cache, serialized, isStringTag);

  const hashClassName = `.${createHashStyleName(cache.key, serialized.name, options)}`;

  const hashSelector = hashPriority === 'low' ? `:where(${hashClassName})` : hashClassName;

  /* c8 ignore start */
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
/* c8 ignore end */
