import { useContext, useMemo } from 'react';
import { TYPOGRAPHY_CONFIG } from '../../shared';
import { TypographyScopeContext } from './entities';

const { defaultThemeId: themeIdDefault } = TYPOGRAPHY_CONFIG;

export const useScopedTypography = () => {
  const typographyThemeId =
    useContext(TypographyScopeContext) ?? themeIdDefault;
  return useMemo(() => ({ typographyThemeId }), [typographyThemeId]);
};
