import { atom } from 'jotai';
import type {
  PalettesOptions,
  PalettesConfig,
  PaletteConfig,
  PaletteOptions,
  SwatchConfig,
  PaletteSwatchId,
} from '../entities';
import { PALETTE_IDS, SWATCH_IDS_BY_PALETTE_ID, PALETTES } from '../constants';
import { createColorToken } from '../createColorToken';
import { parseColor } from './parseColor';

export const defineColorsConfig = (options: PalettesOptions) => {
  const palettesConfig = {} as Record<string, PaletteConfig>;

  for (const paletteId of PALETTE_IDS) {
    const paletteBase = PALETTES[paletteId];

    const { base, swatches: swatchesOptions }: PaletteOptions<any> =
      options[paletteId];

    const baseAtom = atom(base);

    const paletteConfig: PaletteConfig = {
      ...paletteBase,
      base,
      baseAtom,
      swatchesById: SWATCH_IDS_BY_PALETTE_ID[paletteId].reduce(
        (result, swatchId) => {
          const swatchOptionsAtom = atom(swatchesOptions[swatchId]);
          const swatchColorAtom = atom((get) => {
            const swatchOptions = get(swatchOptionsAtom);
            const baseOptions = get(baseAtom);
            return parseColor(baseOptions, swatchOptions);
          });
          const swatchValueAtom = atom((get) => {
            // const swatchColor = get(swatchColorAtom);
            // TODO
            return 'TODO';
          });
          result[swatchId] = {
            paletteId,
            swatchId,
            colorToken: createColorToken({
              paletteId,
              swatchId,
            } as PaletteSwatchId),
            swatchOptionsAtom,
            swatchColorAtom,
            swatchValueAtom,
            ...swatchesOptions[swatchId],
          };
          return result;
        },
        {} as Record<string, SwatchConfig>,
      ) as PaletteConfig['swatchesById'],
    };
    palettesConfig[paletteId] = paletteConfig;
  }
  return palettesConfig as unknown as PalettesConfig;
};
