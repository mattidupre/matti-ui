export type Oklch = {
  lightness: number;
  chroma: number;
  hue: number;
};

export const OKLCH_LABELS = {
  lightness: 'Lightness',
  chroma: 'Chroma',
  hue: 'Hue',
} as const satisfies Record<keyof Oklch, string>;

export const OKLCH_DEFAULTS = {
  lightness: 0,
  chroma: 0,
  hue: 0,
} as const satisfies Oklch;

export const OKLCH_BOUNDS = {
  lightness: [0, 1],
  chroma: [0, 0.37],
  hue: [0, 360],
} as const satisfies Record<keyof Oklch, [max: number, min: number]>;
