import { useMemo } from 'react';
import type { SwatchQuery } from '../../shared';
import { oklchInGamut } from '../../shared';
import { useSwatch } from './useSwatch';

// Kept separate from useSwatch to avoid bundled dependency bloat.

export type SwatchGamut = {
  isInGamut: boolean;
};

export const useSwatchGamut = (swatchQuery: SwatchQuery): SwatchGamut => {
  const swatch = useSwatch(swatchQuery);

  // TODO: isInGamut is potentially expensive.
  //   Maybe cache the result so it is not calculated individually for every
  //   component calling this hook?
  //   IMPORTANT: Still keep oklchInGamut tree-shakeable.

  return useMemo(() => {
    const isLightInGamut = oklchInGamut(swatch.light);
    const isDarkInGamut = oklchInGamut(swatch.dark);
    return {
      isInGamut: isLightInGamut && isDarkInGamut,
      isLightInGamut,
      isDarkInGamut,
    };
  }, [swatch.dark, swatch.light]);
};
