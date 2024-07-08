import { mapValues } from 'lodash-es';
import type { ColorsOptions } from './types';
import type { PalettesConfig } from './definePalettes';

export const extendSwatches = <TOptions extends ColorsOptions>(
  palettes: PalettesConfig,
  colors: TOptions,
): Pick<PalettesConfig['swatches'], keyof TOptions> => {
  const extendedPalettes = {} as Pick<
    PalettesConfig['swatches'],
    keyof TOptions
  >;

  for (const paletteId of Object.keys(colors) as ReadonlyArray<
    keyof typeof colors
  >) {
    if (!colors[paletteId]) {
      continue;
    }
    const {
      light: lightOptions,
      dark: darkOptions,
      ...baseOptions
    } = colors[paletteId];
    const swatches = mapValues(
      palettes[paletteId].swatches,
      ({ light, dark }) => ({
        light: {
          ...light,
          ...baseOptions,
          ...lightOptions,
        },
        dark: {
          ...dark,
          ...baseOptions,
          ...darkOptions,
        },
      }),
    );
    extendedPalettes[paletteId] = swatches;
  }
  return extendedPalettes;
};
