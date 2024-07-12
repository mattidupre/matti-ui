import type { PaletteId, SwatchQuery } from '../../entities';
import { usePalette } from './usePalette';
import { usePaletteInfo } from './usePaletteInfo';
import { useSwatch } from './useSwatch';

function Swatch({ color }: { color: SwatchQuery }) {
  const { light, dark } = useSwatch(color);
  return JSON.stringify(light);
}

type ColorPaletteProps = {
  paletteId: PaletteId;
};

export function ColorPalette({ paletteId }: ColorPaletteProps) {
  const { paletteName, tokenNames } = usePaletteInfo(paletteId);
  const { color } = usePalette(paletteId);
  return (
    <div>
      <h2>{paletteName}</h2>
      <pre>{JSON.stringify(color, undefined, 2)}</pre>
      <div>
        {tokenNames.map((tokenName) => (
          <Swatch key={tokenName} color={tokenName} />
        ))}
      </div>
    </div>
  );
}
