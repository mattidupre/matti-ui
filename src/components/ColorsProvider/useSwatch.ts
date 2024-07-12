import { useAtomValue } from 'jotai';
import type { SwatchQuery } from '../../entities';
import { useSwatchAtoms } from './lib/paletteAtoms';

export const useSwatch = (query: SwatchQuery) => {
  const { swatchObjectAtom } = useSwatchAtoms(query);
  return useAtomValue(swatchObjectAtom);
};
