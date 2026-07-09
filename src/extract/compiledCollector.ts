import type { ExtractStyleChunk } from './types';

const compiledChunks = new Map<string, ExtractStyleChunk>();

export const pushCompiledExtractChunk = (chunk: ExtractStyleChunk) => {
  compiledChunks.set(chunk.styleId, chunk);
};

export const pullCompiledExtractChunks = (): ExtractStyleChunk[] => {
  return Array.from(compiledChunks.values());
};

export const clearCompiledExtractChunks = () => {
  compiledChunks.clear();
};
