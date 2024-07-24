import { type ContextType, useMemo, type ReactNode } from 'react';
import { ColorSchemeScopedContext } from '../entities';
import { useColorScheme } from '../useColorScheme';

type ColorSchemeScopedProviderProps = {
  colorScheme: undefined | 'invert' | 'light' | 'dark';
  children?: ReactNode;
};

export function ColorSchemeScopedProvider({
  colorScheme: colorSchemeProp,
  children,
}: ColorSchemeScopedProviderProps) {
  const { colorSchemeCurrent } = useColorScheme();
  const colorScheme: 'light' | 'dark' =
    colorSchemeProp === 'invert'
      ? colorSchemeCurrent === 'light'
        ? 'dark'
        : 'light'
      : colorSchemeProp ?? colorSchemeCurrent;

  const providerValue = useMemo(
    (): ContextType<typeof ColorSchemeScopedContext> => ({ colorScheme }),
    [colorScheme],
  );

  return (
    <ColorSchemeScopedContext.Provider value={providerValue}>
      {children}
    </ColorSchemeScopedContext.Provider>
  );
}
