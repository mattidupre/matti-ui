import { useAtomValue } from 'jotai';
import type { ColorToken } from '../../entities';
import { useSwatchAtom } from './entities';

// TODO: Add selector (as array of swatch config keys)

export const useColorValue = (token: ColorToken) =>
  useAtomValue(useSwatchAtom(token));
