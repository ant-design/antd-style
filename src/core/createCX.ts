import { ClassNameGenerator, ClassNamesUtil } from '@/types';
import { classnames, isReactCssResult, mergeCSS } from '@/utils';
import { EmotionCache } from '@emotion/css/create-instance';

export const createCX =
  (cache: EmotionCache, classNameGenerator: ClassNameGenerator): ClassNamesUtil =>
  (...classNames) => {
    // 由于使用了 reactCss 作为基础样式工具，因此在使用 cx 级联 className 时需要使用特殊处理的 cx
    // 要将 reactCss 的产出转为 css 产物
    const className = classNames.map((c) => (isReactCssResult(c) ? classNameGenerator(c) : c));

    return mergeCSS(cache.registered, classNameGenerator, classnames(className));
  };
