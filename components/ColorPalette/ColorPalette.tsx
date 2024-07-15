import { useMemo } from 'react';
import { mapSwatches, type PaletteId, getPaletteConfig } from '../../shared';
import { ColorField } from '../ColorField';
import { css } from '../../styled-system/css';
import { usePaletteGamut } from '../ColorsProvider/usePaletteGamut';
import { ColorSwatch } from '.';

type ColorPaletteProps = {
  paletteId: PaletteId;
  colorScheme?: 'light' | 'dark';
};

export function ColorPalette({ paletteId }: ColorPaletteProps) {
  const { paletteName, isAdjustable } = getPaletteConfig(paletteId);
  const { isInGamut } = usePaletteGamut(paletteId);
  return (
    <div
      className={css({
        width: '20rem',
        px: '2rem',
        py: '2rem',
        backgroundColor: 'background.900',
      })}
    >
      <h2>{paletteName}</h2>
      <pre>{isInGamut ? 'In gamut' : 'Not in gamut'}</pre>
      <div>
        {isAdjustable && (
          <ColorField paletteId={paletteId} adjust={['chroma', 'hue']} />
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
