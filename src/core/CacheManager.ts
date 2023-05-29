import { cache } from '@emotion/css';
import { EmotionCache } from '@emotion/css/create-instance';

export class CacheManager {
  private _cacheList: EmotionCache[] = [cache];

  add(cache: EmotionCache) {
    if (this.hasCache(cache)) return;

    this._cacheList.push(cache);
  }

  private hasCache(cache: EmotionCache) {
    return this._cacheList.some((c) => c.key === cache.key);
  }

  getCacheList() {
    return this._cacheList;
  }
}
