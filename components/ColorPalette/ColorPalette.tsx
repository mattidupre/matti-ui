import { useMemo, useState } from 'react';
import { mapSwatches, type PaletteId } from '../../shared';
import { ColorField } from '../ColorField';
import { css } from '../../styled-system/css';
import { usePaletteGamut } from '../ColorsProvider/usePaletteGamut';
import { ColorSchemeProvider } from '../ColorSchemeProvider';
import { usePaletteHandle } from '../ColorsProvider';
import { IsInGamut } from './lib/IsInGamut';
import { ColorSwatch } from '.';

type ColorPaletteProps = {
  paletteId: PaletteId;
  colorScheme?: 'light' | 'dark';
};

export function ColorPalette({ paletteId, colorScheme }: ColorPaletteProps) {
  const { paletteName, isAdjustable, resetBaseColor } =
    usePaletteHandle(paletteId);
  const { isInGamut } = usePaletteGamut(paletteId);

  const [keyState, setKeyState] = useState(0);

  return (
    <ColorSchemeProvider colorScheme={colorScheme}>
      <div
        className={css({
          width: '[20rem]',
          px: '2rem',
          py: '2rem',
          backgroundColor: 'grey.200',
        })}
      >
        <h2>{paletteName}</h2>
        <IsInGamut isInGamut={isInGamut} />
        <div>
          {isAdjustable && (
            <>
              <ColorField
                label={`Adjust ${paletteName}`}
                paletteId={paletteId}
                adjust={['chroma', 'hue']}
                key={keyState}
              />
              <button
                onClick={() => {
                  resetBaseColor();
                  setKeyState((n) => n + 1);
                }}
              >
                Reset
              </button>
            </>
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
    </ColorSchemeProvider>
  );
}
