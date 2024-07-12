import type { SwatchOptions, Color, ColorParsed } from '../entities';

const DEFAULT_COLOR: Color = {
  lightness: 0,
  chroma: 0,
  hue: 0,
};

export const parseColor = (
  ...args: ReadonlyArray<undefined | SwatchOptions>
): ColorParsed => {
  const result = {
    light: { ...DEFAULT_COLOR },
    dark: { ...DEFAULT_COLOR },
  };
  for (const arg of args) {
    if (!arg) {
      continue;
    }
    const { light, dark, ...base } = arg;
    result.light = {
      ...result.light,
      ...base,
      ...light,
    };
    result.dark = {
      ...result.dark,
      ...base,
      ...dark,
    };
  }
  return result;
};
