import { useAtomValue } from 'jotai';
import type { SwatchQuery } from '../../../shared';
import { useSwatchAtom } from './lib/ColorAtomsContext';

export const useSwatch = (query: SwatchQuery) =>
  useAtomValue(useSwatchAtom(query));
