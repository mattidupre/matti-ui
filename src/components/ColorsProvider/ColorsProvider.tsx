import { useContext, useState, type ReactElement } from 'react';
import { PALETTE_IDS } from '../../entities';
import type { PalettesOptions } from '../../entities';
import { ColorsElement } from './lib/ColorsElement';
import { ColorAtomsContext } from './lib/ColorAtomsContext';
import { type ColorAtoms, createPaletteAtoms } from './lib/paletteAtoms';

type ProviderProps = {
  defaultColors?: PalettesOptions;
  children: ReactElement;
};

// TODO: Verify Jotai is working in isolation.

export function ColorsProvider({
  defaultColors = {},
  children,
}: ProviderProps) {
  const parentContext = useContext(ColorAtomsContext);
  const [colorAtomsContextValue] = useState(
    () =>
      Object.fromEntries(
        PALETTE_IDS.map((paletteId) => {
          if (defaultColors[paletteId]) {
            return [
              paletteId,
              createPaletteAtoms(paletteId, defaultColors[paletteId]),
            ];
          } else if (parentContext?.[paletteId]) {
            return [paletteId, parentContext[paletteId]] as const;
          }
          return [paletteId, createPaletteAtoms(paletteId)] as const;
        }),
      ) as ColorAtoms,
  );
  return (
    <ColorAtomsContext.Provider value={colorAtomsContextValue}>
      <ColorsElement>{children}</ColorsElement>
    </ColorAtomsContext.Provider>
  );
}
