import { useContext, useState, type ReactElement } from 'react';
import {
  createPaletteAtoms,
  mapPalettesToIds,
  type PaletteConfig,
  type PaletteId,
} from '../../shared';
import { ColorsElement } from './lib/ColorsElement';
import {
  ColorAtomsContext,
  type ColorAtomsContextValue,
} from './lib/ColorAtomsContext';

type ProviderProps = {
  defaultColors?: Partial<Record<PaletteId, PaletteConfig['base']>>;
  children: ReactElement;
};

export function ColorsProvider({
  defaultColors = {},
  children,
}: ProviderProps) {
  const parentContext = useContext(ColorAtomsContext);
  const [colorAtomsContextValue] = useState(
    () =>
      ({
        palettes: mapPalettesToIds(({ paletteId }) => {
          if (defaultColors[paletteId]) {
            return createPaletteAtoms(paletteId, defaultColors[paletteId]);
          } else if (parentContext?.palettes?.[paletteId]) {
            return parentContext.palettes[paletteId];
          }
          return createPaletteAtoms(paletteId);
        }),
      }) as ColorAtomsContextValue,
  );
  return (
    <ColorAtomsContext.Provider value={colorAtomsContextValue}>
      <ColorsElement>{children}</ColorsElement>
    </ColorAtomsContext.Provider>
  );
}
