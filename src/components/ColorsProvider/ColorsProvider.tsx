import { useContext, useState, type ReactElement } from 'react';
import {
  PALETTE_IDS,
  type PalettesOptions,
  type PalettesAtoms,
  createPaletteAtoms,
} from '../../entities';
import { ColorsElement } from './lib/ColorsElement';
import { ColorAtomsContext } from './lib/ColorAtomsContext';

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
  const [colorAtomsContextValue] = useState(() => ({
    palettes: Object.fromEntries(
      PALETTE_IDS.map((paletteId) => {
        if (defaultColors[paletteId]) {
          return [
            paletteId,
            createPaletteAtoms(paletteId, defaultColors[paletteId]),
          ];
        } else if (parentContext?.palettes?.[paletteId]) {
          return [paletteId, parentContext.palettes[paletteId]] as const;
        }
        return [paletteId, createPaletteAtoms(paletteId)] as const;
      }),
    ) as PalettesAtoms,
  }));
  return (
    <ColorAtomsContext.Provider value={colorAtomsContextValue}>
      <ColorsElement>{children}</ColorsElement>
    </ColorAtomsContext.Provider>
  );
}
