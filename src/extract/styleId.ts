/**
 * Generate stable style id for createStaticStyles call sites.
 *
 * This id is designed to be injected by compile-time transforms.
 */
export const createStyleId = (input: string) => {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  // keep positive 32-bit and compact base36
  return `as-${(hash >>> 0).toString(36)}`;
};
