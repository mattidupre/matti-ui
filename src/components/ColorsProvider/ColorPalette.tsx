import { useMemo } from 'react';
import { mapSwatches, type Color, type PaletteId } from '../../../shared';
import { usePaletteInfo } from './usePaletteInfo';
import { ColorSwatch } from './ColorSwatch';
import { ColorField } from './ColorField';

type ColorPaletteProps = {
  paletteId: PaletteId;
  colorScheme?: 'dark' | 'light' | 'auto';
  adjust?: keyof Color | ReadonlyArray<keyof Color>;
};

export function ColorPalette({
  paletteId,
  colorScheme = 'auto',
  adjust,
}: ColorPaletteProps) {
  const { paletteName } = usePaletteInfo(paletteId);
  return (
    <div>
      <h2>{paletteName}</h2>
      {adjust && <ColorField paletteId={paletteId} pick={adjust} />}
      {useMemo(
        () =>
          mapSwatches(({ colorToken }) => (
            <ColorSwatch
              key={colorToken}
              color={colorToken}
              colorScheme={colorScheme}
            />
          )),
        [colorScheme],
      )}
    </div>
  );
}
