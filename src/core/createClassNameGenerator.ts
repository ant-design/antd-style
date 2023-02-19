import { insertStyles } from '@/core/insertStyles';
import { ClassNameGenerator, HashPriority } from '@/types';
import { EmotionCache } from '@emotion/css/create-instance';
import { serializeStyles } from '@emotion/serialize';

/**
 * 样式名称生成器 用于序列化的样式转换生成 className
 * @param cache
 * @param hashPriority
 */
export const createClassNameGenerator =
  (cache: EmotionCache, hashPriority: HashPriority = 'high'): ClassNameGenerator =>
  (...args) => {
    const serialized = serializeStyles(args, cache.registered, undefined);
    insertStyles(cache, serialized, false, hashPriority);
    return `${cache.key}-${serialized.name}`;
  };
