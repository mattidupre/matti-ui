import type { Oklch } from './types';

export const OKLCH_BOUNDS = {
  lightness: [0, 1],
  chroma: [0, 0.37],
  hue: [0, 360],
} as const satisfies Record<keyof Oklch, [max: number, min: number]>;
