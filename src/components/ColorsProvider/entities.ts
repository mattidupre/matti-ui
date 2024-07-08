import { createContext } from 'react';
import type { PaletteOptions } from '../../entities/colors/entities';

export type ColorsContextValue = { options: PaletteOptions };

export const ColorsContext = createContext<undefined | ColorsContextValue>(
  undefined,
);
