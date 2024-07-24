import type { ReactNode } from 'react';
import {
  type AtomOrValue,
  ProviderElement,
  type TypographyThemeId,
  useAtomOrValue,
} from '../../shared';
import { TYPOGRAPHY_CONFIG } from '../../shared';
import { TypographyScopeContext } from './entities';
import { useScopedTypography } from './useScopedTypography';

const { themesById } = TYPOGRAPHY_CONFIG;

type TypographyScopeProps = {
  isRoot?: boolean;
  theme: AtomOrValue<undefined | TypographyThemeId>;
  children?: ReactNode;
};

export function TypographyScope({
  isRoot,
  theme: themeProp,
  children,
}: TypographyScopeProps) {
  const themeIdProp = useAtomOrValue(themeProp);
  const themeIdParent = useScopedTypography().typographyThemeId;
  const themeId = themeIdProp ?? themeIdParent;

  return (
    <TypographyScopeContext.Provider value={themeId}>
      <ProviderElement
        rootQuery={isRoot ? 'body' : undefined}
        className={themesById[themeId].themeClassName}
      >
        {children}
      </ProviderElement>
    </TypographyScopeContext.Provider>
  );
}
