import type { ReactElement } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { ColorsProvider } from '../ColorsProvider';
import { ColorSchemeProvider } from '../ColorSchemeProvider';
import { TypographyProvider } from '../TypographyProvider';

type ProviderProps = {
  children: ReactElement;
};

// TODO: Verify Jotai is working in isolation.

export function UiProvider({ children }: ProviderProps) {
  return (
    <JotaiProvider>
      <ColorSchemeProvider>
        <ColorsProvider>
          <TypographyProvider>{children}</TypographyProvider>
        </ColorsProvider>
      </ColorSchemeProvider>
    </JotaiProvider>
  );
}
