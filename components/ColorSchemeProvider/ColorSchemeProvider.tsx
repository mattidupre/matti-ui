import { useContext, useMemo, type ReactElement } from 'react';
import { useAtomValue } from 'jotai';
import { COLOR_SCHEME_CONFIG, useSystemColorScheme } from '../../shared';
import { ColorSchemeContext, colorSchemePreferenceAtom } from './entities';

type ColorSchemeProviderProps = {
  colorScheme?: 'light' | 'dark';
  children: ReactElement | ReadonlyArray<ReactElement>;
};

export function ColorSchemeProvider({
  colorScheme: colorSchemeProp,
  children,
}: ColorSchemeProviderProps) {
  const { colorScheme: colorSchemeParent } =
    useContext(ColorSchemeContext) ?? {};

  const colorSchemePreference = useAtomValue(colorSchemePreferenceAtom);

  const colorSchemeSystem = useSystemColorScheme();

  const colorScheme =
    colorSchemeProp ??
    colorSchemeParent ??
    colorSchemePreference ??
    colorSchemeSystem ??
    COLOR_SCHEME_CONFIG.colorSchemeSsr;

  const contextValue = useMemo(() => ({ colorScheme }), [colorScheme]);

  return (
    <ColorSchemeContext.Provider value={contextValue}>
      <div className={COLOR_SCHEME_CONFIG.className[colorScheme]}>
        {children}
      </div>
    </ColorSchemeContext.Provider>
  );
}
