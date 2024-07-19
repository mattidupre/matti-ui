import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { useRequiredContext } from '../../shared';
import { TypographyContext } from './entities';

export const useTypographyTheme = () => {
  const { typographyThemeIdAtom } = useRequiredContext(
    TypographyContext,
    'TypographyContext',
  );
  const [typographyThemeId, setTypographyThemeId] = useAtom(
    typographyThemeIdAtom,
  );
  return useMemo(
    () => ({ typographyThemeId, setTypographyThemeId }),
    [typographyThemeId, setTypographyThemeId],
  );
};
