import type { Color, PaletteId } from '../../entities';
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
  const { paletteName, tokenNames } = usePaletteInfo(paletteId);
  return (
    <div>
      <h2>
        {paletteName} {colorScheme}
      </h2>
      {adjust && <ColorField paletteId={paletteId} pick={adjust} />}
      {tokenNames.map((tokenName) => (
        <ColorSwatch
          key={tokenName}
          color={tokenName}
          colorScheme={colorScheme}
        />
      ))}
    </div>
  );
}
