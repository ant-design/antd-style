import { cache } from '@emotion/css';
import { EmotionCache } from '@emotion/css/create-instance';

export class CacheManager {
  private static _cacheList: EmotionCache[] = [cache];

  static add(cache: EmotionCache) {
    if (!this._cacheList.includes(cache)) this._cacheList.push(cache);
  }

  static getCacheList() {
    return this._cacheList;
  }
}
