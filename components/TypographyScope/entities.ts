import { createContext } from 'react';
import type { TypographyThemeId } from '../../shared';

export const TypographyScopeContext = createContext<
  undefined | TypographyThemeId
>(undefined);
