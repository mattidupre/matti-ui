import type { ReactNode } from 'react';
import { COLOR_SCHEME_CONFIG, ProviderElement } from '../../shared';
import { useScopedColorScheme } from './useScopedColorScheme';

type ColorScopeProps = {
  isRoot?: boolean;
  colorScheme: undefined | 'invert' | 'light' | 'dark';
  children?: ReactNode;
};

const parseColorScheme = ({
  colorSchemeParent,
  colorSchemeProp,
}: {
  colorSchemeParent: 'light' | 'dark';
  colorSchemeProp: ColorScopeProps['colorScheme'];
}): 'light' | 'dark' => {
  if (colorSchemeProp === undefined) {
    return colorSchemeParent;
  } else if (colorSchemeProp === 'invert') {
    if (colorSchemeParent === 'light') {
      return 'dark';
    }
    if (colorSchemeParent === 'dark') {
      return 'light';
    }
  } else if (colorSchemeProp === 'light') {
    return 'light';
  } else if (colorSchemeProp === 'dark') {
    return 'dark';
  }

  throw new Error(`Invalid color scheme prop "${colorSchemeProp}".`);
};

export function ColorSchemeScope({
  isRoot,
  colorScheme: colorSchemeProp,
  children,
}: ColorScopeProps) {
  const colorScheme = parseColorScheme({
    colorSchemeProp,
    colorSchemeParent: useScopedColorScheme(),
  });
  return (
    <ProviderElement
      rootQuery={isRoot ? ':root' : undefined}
      className={COLOR_SCHEME_CONFIG.className[colorScheme]}
    >
      {children}
    </ProviderElement>
  );
}
