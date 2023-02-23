import { cache } from '@emotion/css';
import { EmotionCache } from '@emotion/css/create-instance';

export class CacheManager {
  private _cacheList: EmotionCache[] = [cache];

  add(cache: EmotionCache) {
    if (!this._cacheList.includes(cache)) this._cacheList.push(cache);
  }

  getCacheList() {
    return this._cacheList;
  }
}
