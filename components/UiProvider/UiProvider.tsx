import { useAtomValue } from 'jotai';
import { type ReactNode, useMemo, type ComponentProps } from 'react';
import type { PrimitiveAtom } from 'jotai/experimental';
import { type TypographyThemeId, asPrimitiveAtom } from '../../shared';
import { ColorSchemeScope } from '../ColorSchemeScope';
import { TypographyScope } from '../TypographyScope';
import { ColorsProvider } from '../ColorsProvider';

type UiProviderProps = Omit<
  ComponentProps<typeof ColorSchemeScope>,
  'children'
> & {
  typographyTheme?: PrimitiveAtom<undefined | TypographyThemeId>;
  children?: ReactNode;
};

export function UiProvider({
  typographyTheme: typographyThemeProp,
  colorScheme,
  children,
}: UiProviderProps) {
  const typographyThemeAtom = useMemo(
    () => asPrimitiveAtom(typographyThemeProp),
    [typographyThemeProp],
  );

  const typographyTheme = useAtomValue(typographyThemeAtom);

  return (
    <ColorSchemeScope isRoot colorScheme={colorScheme}>
      <TypographyScope isRoot theme={typographyTheme}>
        <ColorsProvider>{children}</ColorsProvider>
      </TypographyScope>
    </ColorSchemeScope>
  );
}
