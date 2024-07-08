import { type ReactElement, useMemo, useRef, useState } from 'react';
import type { PaletteOptionsById } from '../../entities';
import {
  ColorsContext,
  type ColorsContextValue,
  createSwatchAtoms,
} from './entities';

type ProviderProps = {
  initialSwatches?: PaletteOptionsById;
  children: ReactElement;
};

export function ColorsProvider({ children, initialSwatches }: ProviderProps) {
  const [swatchAtoms] = useState(() => createSwatchAtoms(initialSwatches));

  // HERE: Respond to swatches changes and update ref.current inline css vars
  // const [swatchesAtom] = useState(() => atom(swatchAtoms))

  const contextValue = useMemo<ColorsContextValue>(
    () => ({ swatchAtoms }),
    [swatchAtoms],
  );

  const ref = useRef<HTMLDivElement>(null);

  return (
    <ColorsContext.Provider value={contextValue}>
      <div ref={ref}>{children}</div>
    </ColorsContext.Provider>
  );
  //
}
