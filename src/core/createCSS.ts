import { createHashStyleName, insertStyles } from '@/core/insertStyles';
import { ClassNameGenerator, ClassNameGeneratorOption, ClassNamesUtil } from '@/types';
import { classnames, isReactCssResult, mergeCSS } from '@/utils';
import { EmotionCache } from '@emotion/css/create-instance';
import { serializeStyles } from '@emotion/serialize';

const createClassNameGenerator =
  (cache: EmotionCache, options: ClassNameGeneratorOption): ClassNameGenerator =>
  (...args) => {
    const serialized = serializeStyles(args, cache.registered, undefined);

    insertStyles(cache, serialized, false, options);

    return createHashStyleName(cache.key, serialized.name, options);
  };

const createCX =
  (cache: EmotionCache, classNameGenerator: ClassNameGenerator): ClassNamesUtil =>
  (...classNames) => {
    // 由于使用了 reactCss 作为基础样式工具，因此在使用 cx 级联 className 时需要使用特殊处理的 cx
    // 要将 reactCss 的产出转为 css 产物
    const className = classNames.map((c) => (isReactCssResult(c) ? classNameGenerator(c) : c));

    return mergeCSS(cache.registered, classNameGenerator, classnames(className));
  };

/**
 * CSS相关方法生成器 用于序列化的样式转换生成 className
 * @param cache
 * @param options
 */
export const createCSS = (cache: EmotionCache, options: ClassNameGeneratorOption) => {
  const css = createClassNameGenerator(cache, {
    hashPriority: options.hashPriority || 'high',
    label: options.label,
    __BABEL_FILE_NAME__: options.__BABEL_FILE_NAME__,
  });

  const cx = createCX(cache, css);

  return { css, cx };
};
