import { useSetAtom } from 'jotai';
import { useMemo } from 'react';
import { useRequiredContext } from '../../shared';
import { TypographyContext } from './entities';

export const useTypographyThemeIdHandle = () => {
  const { typographyThemeIdAtom } = useRequiredContext(
    TypographyContext,
    'TypographyContext',
  );

  const setTypographyThemeId = useSetAtom(typographyThemeIdAtom);

  return useMemo(() => ({ setTypographyThemeId }), [setTypographyThemeId]);
};
