import type { SimplifyDeep } from 'type-fest';
import {
  parseLightOrDarkOrBase,
  type LightOrDarkOrBase,
  type LightAndDark,
  type TuplePluck,
  type CssVariable,
  type CssVariableWrapped,
  createCssVariable,
  createCssVariableWrapped,
} from '../../utils';
import type { Color } from '../../entities/colors';

type CreateColorToken<
  TPaletteId extends string,
  TSwatchId extends string,
  TColorScheme extends 'light' | 'dark' | undefined =
    | 'light'
    | 'dark'
    | undefined,
> = TColorScheme extends undefined
  ? `${TPaletteId}.${TSwatchId}`
  : `${TPaletteId}.${TSwatchId}.${TColorScheme}`;

const createColorToken = <
  TPaletteId extends string,
  TSwatchId extends string,
  TColorScheme extends 'light' | 'dark' | undefined = undefined,
>(
  paletteId: TPaletteId,
  swatchId: TSwatchId,
  colorScheme?: TColorScheme,
) => {
  type TResult = CreateColorToken<TPaletteId, TSwatchId, TColorScheme>;
  if (!colorScheme) {
    return `${paletteId}.${swatchId}` as TResult;
  }
  return `${paletteId}.${swatchId}.${colorScheme}` as TResult;
};

type DefineSwatchOptions = {
  id: string;
  color: LightOrDarkOrBase<Partial<Pick<Color, 'lightness' | 'chroma'>>>;
};

type InferSwatchConfig<
  TPaletteId extends string,
  TOptions extends DefineSwatchOptions,
> = {
  paletteId: TPaletteId;
  swatchId: TOptions['id'];
  colorToken: CreateColorToken<TPaletteId, TOptions['id'], undefined>;
  colorTokenLight: CreateColorToken<TPaletteId, TOptions['id'], 'light'>;
  colorTokenDark: CreateColorToken<TPaletteId, TOptions['id'], 'dark'>;
  color: LightAndDark<Partial<Pick<Color, 'lightness' | 'chroma'>>>;
};

type DefinePaletteOptions = {
  id: string;
  name: string;
  isAdjustable: boolean;
  base: Partial<Pick<Color, 'hue' | 'chroma'>>;
  swatches: ReadonlyArray<DefineSwatchOptions>;
};

type InferPaletteConfig<TOptions extends DefinePaletteOptions> = {
  paletteId: TOptions['id'];
  paletteName: TOptions['name'];
} & Pick<TOptions, 'isAdjustable' | 'base'> & {
    swatchIds: TuplePluck<'id', TOptions['swatches']>;
    swatches: {
      [TIndex in number &
        keyof TOptions['swatches'] as TOptions['swatches'][TIndex]['id']]: InferSwatchConfig<
        TOptions['id'],
        TOptions['swatches'][TIndex]
      >;
    };
  };

type InferPalettesConfig<TOptions extends ReadonlyArray<DefinePaletteOptions>> =
  {
    paletteIds: TuplePluck<'id', TOptions>;
    palettesById: {
      [TPalette in TOptions[number] as TPalette['id']]: InferPaletteConfig<TPalette>;
    };
    swatchIdsByPaletteId: {
      [TPalette in TOptions[number] as TPalette['id']]: ReadonlyArray<
        TPalette['swatches'][number]['id']
      >;
    };
    swatchesByPaletteId: {
      [TPalette in TOptions[number] as TPalette['id']]: {
        [TSwatch in TPalette['swatches'][number] as TSwatch['id']]: InferSwatchConfig<
          TPalette['id'],
          TSwatch
        >;
      };
    };
    colorTokens: ReadonlyArray<
      {
        [TPalette in TOptions[number] as string]: {
          [TSwatch in TPalette['swatches'][number] as string]: CreateColorToken<
            TPalette['id'],
            TSwatch['id']
          >;
        }[string];
      }[string]
    >;
    swatchesByColorToken: {
      [TPalette in TOptions[number] as string]: {
        [TSwatch in TPalette['swatches'][number] as CreateColorToken<
          TPalette['id'],
          TSwatch['id']
        >]: InferSwatchConfig<TPalette['id'], TSwatch>;
      };
    }[string];
  };

export const defineColorsConfig = <
  const TOptions extends ReadonlyArray<DefinePaletteOptions>,
>(
  options: TOptions,
) => {
  const palettes: Array<unknown> = [];
  const paletteIds: Array<string> = [];
  const palettesById: Record<string, unknown> = {};
  const swatchIdsByPaletteId: Record<string, Array<string>> = {};
  const swatchesByPaletteId: Record<string, Record<string, unknown>> = {};
  const colorTokens: Array<string> = [];
  const swatchesByColorToken: Record<string, unknown> = {};
  for (const {
    id: paletteId,
    name: paletteName,
    isAdjustable,
    base,
    swatches: swatchOptions,
  } of options) {
    const swatchIds: Array<string> = [];
    const swatches: Record<string, unknown> = {};
    swatchIdsByPaletteId[paletteId] = [];
    swatchesByPaletteId[paletteId] = {};
    for (const { id: swatchId, color } of swatchOptions) {
      const colorToken = createColorToken(paletteId, swatchId);
      const colorTokenLight = createColorToken(paletteId, swatchId, 'light');
      const colorTokenDark = createColorToken(paletteId, swatchId, 'dark');

      const swatch = {
        paletteId,
        swatchId,
        colorToken,
        colorTokenLight,
        colorTokenDark,
        color: parseLightOrDarkOrBase(color),
      } satisfies InferSwatchConfig<string, any>;
      swatchIds.push(swatchId);
      swatches[swatchId] = swatch;
      swatchIdsByPaletteId[paletteId].push(swatchId);
      swatchesByPaletteId[paletteId][swatchId] = swatch;
      colorTokens.push(colorToken, colorTokenLight, colorTokenDark);
      swatchesByColorToken[colorToken] = swatch;
      swatchesByColorToken[colorTokenLight] = swatch;
      swatchesByColorToken[colorTokenDark] = swatch;
    }
    const palette = {
      paletteId,
      paletteName,
      isAdjustable,
      base,
      swatchIds,
      swatches,
    } satisfies Record<keyof InferPaletteConfig<any>, unknown>;
    palettes.push(palette);
    paletteIds.push(paletteId);
    palettesById[paletteId] = palette;
  }

  return {
    colorTokens,
    paletteIds,
    palettesById,
    swatchIdsByPaletteId,
    swatchesByPaletteId,
    swatchesByColorToken,
  } satisfies Record<
    keyof InferPalettesConfig<TOptions>,
    unknown
  > as unknown as SimplifyDeep<InferPalettesConfig<TOptions>>;
};
