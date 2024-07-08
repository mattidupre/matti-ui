import { useMemo } from 'react';
import type { ColorToken } from '../../entities';
import { useColorHandle } from './useColorHandle';
import { useColorValue } from './useColorValue';

export const useColor = (token: ColorToken) => {
  const value = useColorValue(token);
  const handle = useColorHandle(token);
  return useMemo(() => [value, handle] as const, [value, handle]);
};
