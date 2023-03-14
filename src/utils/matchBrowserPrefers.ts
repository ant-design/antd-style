import { ThemeAppearance } from '@/types';

export const matchBrowserPrefers = (mode: ThemeAppearance): MediaQueryList => {
  if (typeof window !== 'undefined') {
    return matchMedia && matchMedia(`(prefers-color-scheme: ${mode})`);
  }
  // 针对 ssr 做特处
  return { matches: false } as MediaQueryList;
};
