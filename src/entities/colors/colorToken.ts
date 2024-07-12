import type { PaletteId, PaletteSwatchId, SwatchId } from './types';

export type ColorToken<
  TPaletteId extends PaletteId = PaletteId,
  TSwatchId extends SwatchId<TPaletteId> = never,
> = TPaletteId extends unknown
  ? [TSwatchId] extends [never]
    ? `${TPaletteId}.${SwatchId<TPaletteId>}`
    : `${TPaletteId}.${TSwatchId}`
  : never;

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

export const parseColorToken = <const TToken extends ColorToken>(
  token: TToken,
) => {
  const [paletteId, swatchId] = token.split('.');
  return { paletteId, swatchId } as TToken extends ColorToken<
    infer TPaletteId,
    infer TSwatchId
  >
    ? {
        paletteId: TPaletteId;
        swatchId: TSwatchId;
      }
    : never;
};
