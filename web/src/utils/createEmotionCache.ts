// utils/createEmotionCache.ts
import createCache from '@emotion/cache';

// Create a cache with a specific key
export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
