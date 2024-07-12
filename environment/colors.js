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
 * @type {<TPaletteId extends string, TSwatchId extends string>(paletteId: TPaletteId, swatchId: TSwatchId) =>
 *   `${TPaletteId}.${TSwatchId}`
 * }
 */
const createColorTokenName = (id, swatch) => `${id}.${swatch}`;

/**
 * @type {<TId extends string, TSwatchId extends string>(paletteId: TId, swatchId: TSwatchId) =>
 *   ReturnType<typeof createCssVariable<`${TId}-${TSwatchId}`>>
 * }
 */
const createColorTokenVariable = (id, swatch) =>
  createCssVariable(`${id}-${swatch}`);

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
 *   [S in P['swatchIds'][number]]:
 *     ReturnType<typeof createColorTokenVariable<P['paletteId'], S>>
 * }}}
 */
const colorsToCssVariables = (colors) => {
  /** @type {Record<string, Record<string, string>>} */
  const cssVariables = {};
  for (const { paletteId, swatchIds } of colors) {
    cssVariables[paletteId] = {};
    for (const swatchName of swatchIds) {
      cssVariables[paletteId][swatchName] = createCssVariable(
        `${paletteId}-${swatchName}`,
      );
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
 *   [S in P['swatchIds'][number]]:
 *     ReturnType<typeof wrapCssVariable<
 *       ReturnType<typeof createColorTokenVariable<P['paletteId'], S>>
 *     >>
 * }}}
 */
const colorsToCssVariablesWrapped = (colors) => {
  /** @type {Record<string, Record<string, string>>} */
  const cssVariables = {};
  for (const { paletteId, swatchIds } of colors) {
    cssVariables[paletteId] = {};
    for (const swatchName of swatchIds) {
      cssVariables[paletteId][swatchName] = wrapCssVariable(
        createCssVariable(`${paletteId}-${swatchName}`),
      );
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
