import { ClassNamesUtil } from '@/types';
import { isReactCssResult } from '@/utils';
import { Emotion } from '@emotion/css/create-instance';

export const createCX =
  (css: Emotion['css'], cx: Emotion['cx']): ClassNamesUtil =>
  (...classNames) => {
    return cx(
      ...(classNames.map((c) =>
        // 由于使用了 reactCss 作为基础样式工具，因此在使用 cx 级联 className 时需要使用特殊处理的 cx
        // 要将 reactCss 的产出转为 css 产物
        isReactCssResult(c) ? css(c) : c,
      ) as any[]),
    );
  };
