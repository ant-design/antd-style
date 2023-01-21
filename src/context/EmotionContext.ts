import { createContext } from 'react';

import { emotion, type Emotion } from '@/functions';

export interface CommonStyleUtils {
  cx: Emotion['cx'];
  css: Emotion['css'];
}

export const EmotionContext = createContext<Emotion>(emotion);
