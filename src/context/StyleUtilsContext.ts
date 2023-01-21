import { createContext } from 'react';

import { css, cx, type Emotion } from '@/functions';

export interface CommonStyleUtils {
  cx: Emotion['cx'];
  css: Emotion['css'];
}

export const StyleUtilsContext = createContext<CommonStyleUtils>({
  css,
  cx,
});
