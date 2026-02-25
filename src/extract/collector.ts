import type { BaseReturnType } from '@/types';

interface ExtractedChunk {
  styleId: string;
  styles: BaseReturnType;
  cssText: string;
}

const chunks = new Map<string, ExtractedChunk>();

export const pushExtractedChunk = (chunk: ExtractedChunk) => {
  chunks.set(chunk.styleId, chunk);
};

export const pullExtractedChunks = (): ExtractedChunk[] => {
  return Array.from(chunks.values());
};

export const clearExtractedChunks = () => {
  chunks.clear();
};

export type { ExtractedChunk };
