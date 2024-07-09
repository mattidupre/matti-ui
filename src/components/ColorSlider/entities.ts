import type { ColorConfig } from '../../entities';

export const COLOR_DEFAULTS: ColorConfig = {
  lightness: 0,
  chroma: 0,
  hue: 0,
};

export const COLOR_LABELS: Record<keyof ColorConfig, string> = {
  lightness: 'Lightness',
  chroma: 'Chroma',
  hue: 'Hue',
};
