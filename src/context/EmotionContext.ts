import { createContext } from 'react';

import { emotion, type Emotion } from '@/functions';

export const EmotionContext = createContext<Emotion>(emotion);
