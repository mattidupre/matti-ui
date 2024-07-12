import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { getSwatchConfig, type SwatchQuery } from './entities';

export const useSwatch = (query: SwatchQuery) => {
  const { swatchValueAtom, swatchColorAtom } = getSwatchConfig(query);
  const value = useAtomValue(swatchValueAtom);
  const color = useAtomValue(swatchColorAtom);
  return useMemo(() => ({ value, ...color }), [color, value]);
};
