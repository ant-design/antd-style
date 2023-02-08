import { useEmotion } from '@/hooks';
import { HashPriority } from '@/types';
import { insertStyles } from '@/utils/insertStyles';
import { Emotion } from '@emotion/css/create-instance';
import { serializeStyles } from '@emotion/serialize';
import { useCallback } from 'react';

export const useCss = (hashPriority: HashPriority = 'high'): Emotion['css'] => {
  const { cache } = useEmotion();

  return useCallback(
    (...args) => {
      let serialized = serializeStyles(args, cache.registered, undefined);
      insertStyles(cache, serialized, false, hashPriority);
      return `${cache.key}-${serialized.name}`;
    },
    [cache],
  );
};
