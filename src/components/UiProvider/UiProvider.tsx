import type { ReactElement } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { ColorsProvider } from '../ColorsProvider';

type ProviderProps = {
  children: ReactElement;
};

export function UiProvider({ children }: ProviderProps) {
  return (
    <JotaiProvider>
      <ColorsProvider>{children}</ColorsProvider>
    </JotaiProvider>
  );
}
