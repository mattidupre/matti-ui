import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import type { SwatchQuery } from '../../entities';
import { useSwatchAtoms } from './lib/ColorAtomsContext';

export const useSwatch = (query: SwatchQuery) => {
  const {
    swatchObjectAtom,
    swatchLightValueAtom,
    swatchDarkValueAtom,
    swatchLightDarkValueAtom,
  } = useSwatchAtoms(query);
  const swatchObject = useAtomValue(swatchObjectAtom);
  const swatchLightValue = useAtomValue(swatchLightValueAtom);
  const swatchDarkValue = useAtomValue(swatchDarkValueAtom);
  const swatchLightDarkValue = useAtomValue(swatchLightDarkValueAtom);
  return useMemo(
    () => ({
      swatchObject,
      swatchLightValue,
      swatchDarkValue,
      swatchLightDarkValue,
    }),
    [swatchDarkValue, swatchLightDarkValue, swatchLightValue, swatchObject],
  );
};
