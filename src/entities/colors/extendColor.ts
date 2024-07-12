import { merge } from 'lodash-es';
import { parseLightOrDarkOrBase, type LightOrDarkOrBase } from '../../utils';
import type { Color, ColorParsed } from './types';
import { DEFAULT_COLOR } from './constants';

const DEFAULT_COLOR_PARSED: ColorParsed = {
  light: DEFAULT_COLOR,
  dark: DEFAULT_COLOR,
};

type PartialColor = LightOrDarkOrBase<Partial<Color>>;

export const extendColor = (...colors: ReadonlyArray<PartialColor>) => {
  const color = globalThis.structuredClone(DEFAULT_COLOR_PARSED);
  for (const partialColor of colors) {
    merge(color, parseLightOrDarkOrBase(partialColor));
  }
  console.log(Object.keys(color));
  return color;
};
