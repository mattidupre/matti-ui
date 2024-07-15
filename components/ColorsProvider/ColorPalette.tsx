import { useMemo } from 'react';
import { mapSwatches, type Color, type PaletteId } from '../../shared';
import { usePaletteInfo } from './usePaletteInfo';
import { ColorSwatch } from './ColorSwatch';
import { ColorField } from './ColorField';

type ColorKeys = keyof Pick<Color, 'chroma' | 'hue'>;

type ColorPaletteProps = {
  paletteId: PaletteId;
  colorScheme?: 'dark' | 'light' | 'auto';
  adjust?: ColorKeys | ReadonlyArray<ColorKeys>;
};

export function ColorPalette({ paletteId, adjust }: ColorPaletteProps) {
  const { paletteName, isAdjustable } = usePaletteInfo(paletteId);
  return (
    <div>
      <h2>{paletteName}</h2>
      <div>
        {adjust && isAdjustable && (
          <ColorField paletteId={paletteId} pick={adjust} />
        )}
        {useMemo(
          () =>
            mapSwatches(
              ({ colorToken, paletteId: thisPaletteId }) =>
                paletteId === thisPaletteId && (
                  <ColorSwatch key={colorToken} color={colorToken} />
                ),
            ),
          [paletteId],
        )}
      </div>
    </div>
  );
}
