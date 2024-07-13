import { merge } from 'lodash-es';
import { parseLightOrDarkOrBase, type LightOrDarkOrBase } from '../../../utils';
import type { Color, ColorParsed } from '../types';
import { COLOR_DEFAULT } from '../constants';

const DEFAULT_COLOR_PARSED: ColorParsed = {
  light: COLOR_DEFAULT,
  dark: COLOR_DEFAULT,
};

type PartialColor = LightOrDarkOrBase<Partial<Color>>;

export const extendColor = (...colors: ReadonlyArray<PartialColor>) => {
  const color = globalThis.structuredClone(DEFAULT_COLOR_PARSED);
  for (const partialColor of colors) {
    merge(color, parseLightOrDarkOrBase(partialColor));
  }
  return color;
};
