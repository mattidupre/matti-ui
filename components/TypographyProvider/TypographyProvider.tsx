import { useContext, useState, type ReactNode } from 'react';
import type { TypographyThemeId } from '../../shared';
import { TypographyContext, createTypographyAtoms } from './entities';
import { TypographyCssVars } from './lib/TypographyCssVars';

type TypographyProviderProps = {
  defaultTypographyThemeId?: TypographyThemeId;
  children?: ReactNode;
};

export function TypographyProvider({
  defaultTypographyThemeId,
  children,
}: TypographyProviderProps) {
  const { typographyThemeIdAtom: typographyThemeIdAtomParent } =
    useContext(TypographyContext) ?? {};

  const [contextValue] = useState(() =>
    createTypographyAtoms({
      typographyThemeIdAtomParent,
      typographyThemeIdDefault: defaultTypographyThemeId,
    }),
  );

  return (
    <TypographyContext.Provider value={contextValue}>
      <TypographyCssVars>{children}</TypographyCssVars>
    </TypographyContext.Provider>
  );
}
