import { useAtomValue } from 'jotai';
import type { ColorToken } from '../../entities';
import { useSwatchAtom } from './entities';

export const useColorValue = (token: ColorToken) =>
  useAtomValue(useSwatchAtom(token));
