export interface CreateStyleIdOptions {
  salt?: string;
}

/**
 * Generate stable style id for createStaticStyles call sites.
 *
 * Stability source = transform input + optional salt.
 * Salt priority: explicit options.salt > ANTD_STYLE_EXTRACT_SALT env.
 */
export const createStyleId = (input: string, options?: CreateStyleIdOptions) => {
  const salt = options?.salt ?? process.env.ANTD_STYLE_EXTRACT_SALT ?? '';
  const source = `${salt}::${input}`;

  let hash = 5381;
  for (let i = 0; i < source.length; i++) {
    hash = (hash * 33) ^ source.charCodeAt(i);
  }

  // keep positive 32-bit and compact base36
  return `as-${(hash >>> 0).toString(36)}`;
};
