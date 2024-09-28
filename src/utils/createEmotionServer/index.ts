// copy from
// https://github.com/emotion-js/emotion/blob/main/packages/server/src/create-instance/extract-critical.js

import { EmotionCache } from '@emotion/utils';

export const createExtractCritical = (cache: EmotionCache) => {
  if (cache.compat !== true) {
    // is this good? should we do this automatically?
    // this is only for when using the new apis (not emotion or create-emotion)
    cache.compat = true;
  }

  return (html: string) => {
    // parse out ids from html
    // reconstruct css/rules/cache to pass
    let RGX = new RegExp(cache.key + '-([a-zA-Z0-9-_]+)', 'gm');
    let o: {
      html: string;
      ids: string[];
      css: string;
    } = {
      html: html,
      ids: [],
      css: '',
    };
    let match;
    let ids: Record<string, boolean> = {};

    while ((match = RGX.exec(html)) !== null) {
      if (ids[match[1]] === undefined) {
        ids[match[1]] = true;
      }
    }

    o.ids = Object.keys(cache.inserted).filter((id) => {
      if (
        (ids[id] !== undefined || cache.registered[cache.key + '-' + id] === undefined) &&
        cache.inserted[id] !== true
      ) {
        o.css += cache.inserted[id];
        return true;
      }

      return false;
    });

    return o;
  };
};
