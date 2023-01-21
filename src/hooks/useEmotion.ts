import { useContext } from 'react';

import { EmotionContext } from '@/context';
import { Emotion } from '../functions';

export const useEmotion = (): Emotion => useContext(EmotionContext);
