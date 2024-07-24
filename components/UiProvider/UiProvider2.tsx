import { useAtomValue } from 'jotai';
import { type ReactNode, useMemo } from 'react';
import type { PrimitiveAtom } from 'jotai/experimental';
import { asPrimitiveAtom } from '../../shared';
import { ColorSchemeScope } from '../ColorSchemeScope';
import { ColorSchemeAtomContext } from './entities';

type UiProviderProps = {
  colorScheme?: PrimitiveAtom<undefined | 'light' | 'dark'>;
  children?: ReactNode;
};

export function UiProvider2({
  colorScheme: colorSchemeProp,
  children,
}: UiProviderProps) {
  const colorSchemeAtom = useMemo(
    () => asPrimitiveAtom(colorSchemeProp),
    [colorSchemeProp],
  );

  const colorScheme = useAtomValue(colorSchemeAtom);
  return (
    <ColorSchemeAtomContext.Provider value={colorSchemeAtom}>
      <ColorSchemeScope isRoot colorScheme={colorScheme}>
        {children}
      </ColorSchemeScope>
    </ColorSchemeAtomContext.Provider>
  );
}
