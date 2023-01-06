import { Theme } from '@/types/theme';
import { Interpolation } from '@emotion/styled';

export type CSSStyle<T = Theme> = Array<TemplateStringsArray | Interpolation<T>>;
