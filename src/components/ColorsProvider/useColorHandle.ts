import { useSetAtom } from 'jotai';
import type { ColorToken } from '../../entities';
import { useSwatchAtom } from './entities';

export const useColorHandle = (token: ColorToken) =>
  useSetAtom(useSwatchAtom(token));
