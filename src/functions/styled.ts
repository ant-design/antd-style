// ===========  styled 方案  =========== //
// 适用场景：看上去像是一个自定义样式组件的场景，且可能会有相应的入参
// 推荐使用 styled 将其包裹为一个样式组件

import _styled from '@emotion/styled';

import type { CreateStyled } from '@/types/styled';

export const styled = _styled as CreateStyled;
