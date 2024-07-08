import { createContext } from 'react';
import type { ColorsOptions } from '../../entities/colors/types';

export type ColorsContextValue = { options: ColorsOptions };

export const ColorsContext = createContext<undefined | ColorsContextValue>(
  undefined,
);
