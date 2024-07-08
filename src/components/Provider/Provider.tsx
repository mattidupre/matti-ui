import type { ReactElement } from 'react';
import { ColorsProvider } from '../ColorsProvider';

type ProviderProps = {
  children: ReactElement;
};

export function Provider({ children }: ProviderProps) {
  return <ColorsProvider>{children}</ColorsProvider>;
}
