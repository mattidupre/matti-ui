import type { ColorToken, PaletteSwatchId } from './entities';

export const createColorToken = <
  const TPaletteSwatchIds extends PaletteSwatchId,
>({
  paletteId,
  swatchId,
}: TPaletteSwatchIds) =>
  `${paletteId}.${swatchId}` as ColorToken<
    TPaletteSwatchIds['paletteId'],
    TPaletteSwatchIds['swatchId']
  >;
