// @ts-check

import { createCssVariable, wrapCssVariable } from './css.js';

/**
 * @typedef {ReadonlyArray<{
 *   paletteId: string;
 *   paletteName: string;
 *   swatchIds: ReadonlyArray<string>;
 * }>} ColorsOptions
 */

/**
 * @typedef {TTuple extends readonly [
 *   infer TPalette extends ColorsOptions[number], ...infer TRest extends ColorsOptions
 * ]
 *     ? [...TResult, TPalette['paletteId'], ...ColorsToPaletteIds<TRest, TResult>]
 *     : []
 * } ColorsToPaletteIds
 * @template {ColorsOptions} TTuple
 * @template {ReadonlyArray<string>} [TResult=[]]
 */

/**
 * @type {<const T extends ColorsOptions>(colors: T) => ColorsToPaletteIds<T>}
 */
const colorsToPaletteIds = (colors) =>
  /** @type {any} */ (colors.map(({ paletteId }) => paletteId));

/**
 * @type {<
 *   TPaletteId extends string,
 *   TSwatchId extends string,
 *   TColorScheme extends undefined | 'light' | 'dark' = undefined
 * >(paletteId: TPaletteId, swatchId: TSwatchId, colorScheme?: TColorScheme) =>
 *   [TColorScheme] extends [undefined]
 *     ? `${TPaletteId}.${TSwatchId}`
 *     : `${TPaletteId}.${TSwatchId}.${TColorScheme}`
 * }
 */
const createColorTokenName = (id, swatch, colorScheme) =>
  /** @type {any} */ (
    colorScheme ? `${id}.${swatch}.${colorScheme}` : `${id}.${swatch}`
  );

/**
 * @type {<
 *   TPaletteId extends string,
 *   TSwatchId extends string,
 *   TColorScheme extends undefined | 'light' | 'dark' = undefined
 * >(paletteId: TPaletteId, swatchId: TSwatchId, colorScheme?: TColorScheme) =>
 *   ReturnType<typeof createCssVariable<ReturnType<
 *     typeof createColorTokenName<TPaletteId, TSwatchId, TColorScheme>
 *   >>>
 * }
 */
export const createColorTokenVariable = (id, swatch, colorScheme) =>
  /** @type {any} */ (
    createCssVariable(createColorTokenName(id, swatch, colorScheme))
  );

/**
 * @typedef {TTuple extends readonly [
 *   infer TSwatch extends string,
 *   ...infer TRest extends ReadonlyArray<string>,
 * ]
 *   ? CreateTokenNames<
 *       TPaletteId,
 *       TRest,
 *       [...TResult, ReturnType<typeof createColorTokenName<TPaletteId, TSwatch>>]
 *     >
 *   : TResult
 * } CreateTokenNames<TTuple, TResult>
 * @template {string} TPaletteId
 * @template {ReadonlyArray<string>} TTuple
 * @template {ReadonlyArray<string>} [TResult=[]]
 */

/**
 * @typedef {TTuple extends readonly [
 *   infer TPalette extends ColorsOptions[number],
 *   ...infer TRest extends ColorsOptions,
 * ]
 *   ? ColorsToTokenNamesTuple<TRest, [...TResult, ...CreateTokenNames<
 *       TPalette['paletteId'],
 *       TPalette['swatchIds']
 *     >]>
 *   : TResult
 * } ColorsToTokenNamesTuple<TTuple, TResult>
 * @template {ColorsOptions} TTuple
 * @template {ReadonlyArray<string>} [TResult=[]]
 */

/**
 * @type {<const T extends ColorsOptions>(colors: T) =>
 *   ColorsToTokenNamesTuple<T>
 * }
 */
const colorsToTokenNamesTuple = (colors) =>
  /** @type {any} */ (
    colors.flatMap(({ swatchIds, paletteId }) =>
      swatchIds.flatMap((swatchName) =>
        createColorTokenName(paletteId, swatchName),
      ),
    )
  );

/**
 * @type {<const T extends ColorsOptions>(colors: T) => {
 * [P in (T extends ReadonlyArray<infer V extends ColorsOptions[number]>
 *   ? V
 *   : never
 * ) as P['paletteId']]: {
 *   [S in P['swatchIds'][number]]:
 *     ReturnType<typeof createColorTokenName<P['paletteId'], S>>
 * }}}
 */
const colorsToTokenNames = (colors) =>
  /** @type {any} */ (
    Object.fromEntries(
      colors.map(({ paletteId, swatchIds }) => [
        paletteId,
        Object.fromEntries(
          swatchIds.map((swatchId) => [
            swatchId,
            createColorTokenName(paletteId, swatchId),
          ]),
        ),
      ]),
    )
  );

/**
 * @type {<const T extends ColorsOptions>(colors: T) => {
 * [P in (T extends ReadonlyArray<infer V extends ColorsOptions[number]>
 *   ? V
 *   : never
 * ) as P['paletteId']]: {
 *   [S in P['swatchIds'][number]]: {
 *      light: ReturnType<typeof createColorTokenVariable<P['paletteId'], S, 'light'>>
 *      dark: ReturnType<typeof createColorTokenVariable<P['paletteId'], S, 'dark'>>
 *   }
 * }}}
 */
const colorsToCssVariables = (colors) => {
  /** @type {Record<string, Record<string, Record<string, string>>>} */
  const cssVariables = {};
  for (const { paletteId, swatchIds } of colors) {
    cssVariables[paletteId] = {};
    for (const swatchName of swatchIds) {
      cssVariables[paletteId][swatchName] = {};
      for (const colorScheme of /** @type { const }*/ (['light', 'dark'])) {
        cssVariables[paletteId][swatchName][colorScheme] = createCssVariable(
          createColorTokenName(paletteId, swatchName, colorScheme),
        );
      }
    }
  }
  return /** @type {any} */ (cssVariables);
};

/**
 * @type {<const T extends ColorsOptions>(colors: T) => {
 * [P in (T extends ReadonlyArray<infer V extends ColorsOptions[number]>
 *   ? V
 *   : never
 * ) as P['paletteId']]: {
 *   [S in P['swatchIds'][number]]: {
 *     light: ReturnType<typeof wrapCssVariable<
 *       ReturnType<typeof createColorTokenVariable<P['paletteId'], S, 'light'>>
 *     >>;
 *     dark: ReturnType<typeof wrapCssVariable<
 *       ReturnType<typeof createColorTokenVariable<P['paletteId'], S, 'dark'>>
 *     >>;
 *   }
 * }}}
 */
const colorsToCssVariablesWrapped = (colors) => {
  /** @type {Record<string, Record<string, Record<string, string>>>} */
  const cssVariables = {};
  for (const { paletteId, swatchIds } of colors) {
    cssVariables[paletteId] = {};
    for (const swatchName of swatchIds) {
      cssVariables[paletteId][swatchName] = {};
      for (const colorScheme of ['light', 'dark']) {
        cssVariables[paletteId][swatchName][colorScheme] = wrapCssVariable(
          createCssVariable(`${paletteId}.${swatchName}.${colorScheme}`),
        );
      }
    }
  }
  return /** @type {any} */ (cssVariables);
};

/**
 * @type {<const T extends ColorsOptions>(colors: T) => {
 *   [P in (T extends ReadonlyArray<infer V extends ColorsOptions[number]>
 *     ? V
 *     : never
 *   ) as P['paletteId']]: P & {
 *     tokenNames: CreateTokenNames<P['paletteId'], P['swatchIds']>
 *   }
 * }}
 */
const colorsToPalettes = (colors) =>
  /** @type {any} */ (
    Object.fromEntries(
      colors.map((palette) => [
        palette.paletteId,
        {
          ...palette,
          tokenNames: palette.swatchIds.map((swatchId) =>
            createColorTokenName(palette.paletteId, swatchId),
          ),
        },
      ]),
    )
  );

/**
 * @type {<const T extends ColorsOptions>(colors: T) => {
 *   paletteIds: ReturnType<typeof colorsToPaletteIds<T>>;
 *   palettes: ReturnType<typeof colorsToPalettes<T>>;
 *   tokenNamesTuple: ReturnType<typeof colorsToTokenNamesTuple<T>>;
 *   tokenNames: ReturnType<typeof colorsToTokenNames<T>>;
 *   cssVariables: ReturnType<typeof colorsToCssVariables<T>>;
 *   cssVariablesWrapped: ReturnType<typeof colorsToCssVariablesWrapped<T>>;
 * }}
 */
export const defineColors = (colors) => ({
  paletteIds: colorsToPaletteIds(colors),
  palettes: colorsToPalettes(colors),
  tokenNamesTuple: colorsToTokenNamesTuple(colors),
  tokenNames: colorsToTokenNames(colors),
  cssVariables: colorsToCssVariables(colors),
  cssVariablesWrapped: colorsToCssVariablesWrapped(colors),
});
