import { parseLightOrDarkOrBase } from '../../utils';
import { PALETTE_IDS, SWATCH_IDS_BY_PALETTE_ID } from './constants';
import type {
  PalettesConfig,
  PaletteConfig,
  PaletteOptions,
  SwatchOptions,
} from './types';
import type { PaletteId, SwatchId } from '.';

type DefineOptions = {
  [TPaletteId in PaletteId]: {
    base: PaletteOptions['base'];
    swatches: Record<SwatchId<TPaletteId>, SwatchOptions>;
  };
};

const definePalettesConfig = (options: DefineOptions): PalettesConfig => {
  const palettesConfig = {} as Record<string, PaletteConfig>;
  for (const paletteId of PALETTE_IDS) {
    const { base, swatches } = options[paletteId];
    const paletteConfig = {
      base: { ...base },
      swatches: {},
    } as PaletteConfig;
    for (const swatchId of SWATCH_IDS_BY_PALETTE_ID[paletteId]) {
      paletteConfig.swatches[swatchId] = parseLightOrDarkOrBase(
        swatches[swatchId as keyof typeof swatches],
      );
    }
    palettesConfig[paletteId] = paletteConfig;
  }
  return palettesConfig as PalettesConfig;
};

export const PALETTE_CONFIGS_BASE = definePalettesConfig({
  site: {
    base: { hue: 0 },
    swatches: {
      fill: { light: { lightness: 0 }, dark: { lightness: 1 } },
      background: { light: { lightness: 1 }, dark: { lightness: 0 } },
      browser: {
        /* extends: 'primary.500' */
      },
    },
  },
  fill: {
    base: { chroma: 0 },
    swatches: {
      '100': { light: { lightness: 1 } },
      '200': {},
      '300': {},
      '400': {},
      '500': {},
    },
  },
  background: {
    base: { chroma: 0 },
    swatches: {
      '500': {},
      '600': {},
      '700': {},
      '800': {},
      '900': {},
    },
  },
  primary: {
    base: { hue: 0 },
    swatches: {
      '100': {},
      '200': {},
      '300': {},
      '400': {},
      '500': {},
      '600': {},
      '700': {},
      '800': {},
      '900': {},
    },
  },
  accent: {
    base: { hue: 120 },
    swatches: {
      '100': {},
      '200': {},
      '300': {},
      '400': {},
      '500': {},
      '600': {},
      '700': {},
      '800': {},
      '900': {},
    },
  },
  form: {
    base: { chroma: 0 },
    swatches: {
      fill: {},
      background: {},
      disabled: {},
      outline: {},
      highlight: {},
    },
  },
});
