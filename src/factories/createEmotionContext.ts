import { createContext } from 'react';

import { Emotion } from '@/core';

export const createEmotionContext = (emotion: Emotion) => createContext<Emotion>(emotion);
