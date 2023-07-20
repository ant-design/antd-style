import { cache } from '@emotion/css';
import { EmotionCache } from '@emotion/css/create-instance';

export class CacheManager {
  private _cacheList: EmotionCache[] = [cache];

  add(cache: EmotionCache): EmotionCache {
    const existCache = this.getCache(cache.key);
    if (existCache) {
      return existCache;
    } else {
      this._cacheList.push(cache);
      return cache;
    }
  }

  delete(cache: EmotionCache) {
    this._cacheList = this._cacheList.filter((c) => c.key !== cache.key);
  }

  hasCache(cache: EmotionCache) {
    return this._cacheList.some((c) => c.key === cache.key);
  }

  getCache(key: string) {
    return this._cacheList.find((c) => c.key === key);
  }

  getCacheList() {
    return this._cacheList;
  }
}
