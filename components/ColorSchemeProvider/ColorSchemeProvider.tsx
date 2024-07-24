import { useContext, type ReactNode } from 'react';
import { ColorSchemeRootContext } from './entities';
import { ColorSchemeRootProvider } from './lib/ColorSchemeRootProvider';
import { ColorSchemeScopedProvider } from './lib/ColorSchemeScopedProvider';

type ColorSchemeProviderProps = {
  defaultColorScheme?: undefined | 'light' | 'dark';
  onColorSchemeChange?: (colorScheme: undefined | 'light' | 'dark') => void;
  colorScheme?: undefined | 'light' | 'dark' | 'invert';
  children?: ReactNode;
};

export function ColorSchemeProvider({
  defaultColorScheme,
  onColorSchemeChange,
  colorScheme,
  children,
}: ColorSchemeProviderProps) {
  const isRoot = !useContext(ColorSchemeRootContext);

  if (isRoot && colorScheme !== undefined) {
    throw new Error(`Fixed color scheme cannot be set at the root level.`);
  } else if (!isRoot && defaultColorScheme !== undefined) {
    throw new Error(`Default color scheme can only be set at the root level.`);
  }

  return isRoot ? (
    <ColorSchemeRootProvider
      defaultColorScheme={defaultColorScheme}
      onColorSchemeChange={onColorSchemeChange}
    >
      {children}
    </ColorSchemeRootProvider>
  ) : (
    <ColorSchemeScopedProvider colorScheme={colorScheme}>
      {children}
    </ColorSchemeScopedProvider>
  );
}
