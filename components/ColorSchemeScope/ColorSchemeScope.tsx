import type { ReactNode } from 'react';
import {
  type AtomOrValue,
  COLOR_SCHEME_CONFIG,
  ProviderElement,
  useAtomOrValue,
  useSystemColorScheme,
} from '../../shared';
import { useScopedColorScheme } from './useScopedColorScheme';
import { ColorSchemeScopeContext } from './entities';

type ColorScopeProps = {
  isRoot?: boolean;
  colorScheme: AtomOrValue<undefined | 'system' | 'light' | 'dark' | 'invert'>;
  children?: ReactNode;
};

export function ColorSchemeScope({
  isRoot,
  colorScheme: colorSchemeProp,
  children,
}: ColorScopeProps) {
  const colorSchemeOption = useAtomOrValue(colorSchemeProp);
  const colorSchemeSystem = useSystemColorScheme();
  const colorSchemeParent = useScopedColorScheme();

  let colorScheme: 'light' | 'dark' = colorSchemeParent;
  if (colorSchemeOption === 'system') {
    colorScheme = colorSchemeSystem;
  } else if (colorSchemeOption === 'invert') {
    colorScheme = colorSchemeParent === 'light' ? 'dark' : 'light';
  } else if (colorSchemeOption === 'light') {
    colorScheme = 'light';
  } else if (colorSchemeOption === 'dark') {
    colorScheme = 'dark';
  }

  return (
    <ColorSchemeScopeContext.Provider value={colorScheme}>
      <ProviderElement
        rootQuery={isRoot ? ':root' : undefined}
        className={COLOR_SCHEME_CONFIG.className[colorScheme]}
      >
        {children}
      </ProviderElement>
    </ColorSchemeScopeContext.Provider>
  );
}
