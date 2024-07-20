import type { ComponentProps, ReactNode } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import type { Simplify, UnionToIntersection } from 'type-fest';
import { ColorsProvider } from '../ColorsProvider';
import { ColorSchemeProvider } from '../ColorSchemeProvider';
import { TypographyProvider } from '../TypographyProvider';

type UiProviderProps = Omit<
  Simplify<
    UnionToIntersection<
      ComponentProps<
        | typeof ColorSchemeProvider
        | typeof ColorsProvider
        | typeof TypographyProvider
      >
    >
  >,
  'children' | 'className' | 'style'
> & { children?: ReactNode };

// TODO: Verify Jotai is working in isolation.

export function UiProvider({
  colorScheme,
  defaultColors,
  defaultTypographyThemeId,
  children,
}: UiProviderProps) {
  return (
    <JotaiProvider>
      <ColorSchemeProvider colorScheme={colorScheme}>
        <ColorsProvider defaultColors={defaultColors}>
          <TypographyProvider
            defaultTypographyThemeId={defaultTypographyThemeId}
          >
            {children}
          </TypographyProvider>
        </ColorsProvider>
      </ColorSchemeProvider>
    </JotaiProvider>
  );
}
