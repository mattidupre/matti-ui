import { merge } from 'lodash-es';
import { parseLightOrDarkOrBase, type LightOrDarkOrBase } from '../../utils';
import { type Color, type ColorConfig, COLOR_DEFAULTS } from '.';

const COLOR_CONFIG_DEFAULT: ColorConfig = {
  light: COLOR_DEFAULTS,
  dark: COLOR_DEFAULTS,
};

type PartialColor = LightOrDarkOrBase<Partial<Color>>;

export const extendColor = (
  ...colors: ReadonlyArray<Partial<Color> | undefined>
) => {
  const color = globalThis.structuredClone(COLOR_DEFAULTS);
  for (const partialColor of colors) {
    merge(color, partialColor);
  }
  return color;
};

export const extendColorConfig = (...colors: ReadonlyArray<PartialColor>) => {
  const color = globalThis.structuredClone(COLOR_CONFIG_DEFAULT);
  for (const partialColor of colors) {
    merge(color, parseLightOrDarkOrBase(partialColor));
  }
  return color;
};
