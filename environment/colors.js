// @ts-check

import { createCssVariable, wrapCssVariable } from './css.js';

/**
 * @typedef {ReadonlyArray<{
 *   id: string;
 *   name: string;
 *   swatchIds: ReadonlyArray<string>;
 * }>} ColorsOptions
 */

/**
 * @typedef {TTuple extends readonly [
 *   infer TPalette extends ColorsOptions[number], ...infer TRest extends ColorsOptions
 * ]
 *     ? [...TResult, TPalette['id'], ...ColorsToPaletteIds<TRest, TResult>]
 *     : []
 * } ColorsToPaletteIds
 * @template {ColorsOptions} TTuple
 * @template {ReadonlyArray<string>} [TResult=[]]
 */

/**
 * @type {<const T extends ColorsOptions>(colors: T) => ColorsToPaletteIds<T>}
 */
const colorsToPaletteIds = (colors) =>
  /** @type {any} */ (colors.map(({ id }) => id));

/**
 * @type {<const T extends ColorsOptions>(colors: T) => {
 *   [P in (T extends ReadonlyArray<infer V extends ColorsOptions[number]>
 *     ? V
 *     : never
 *   ) as P['id']]: P
 * }}
 */
const colorsToPalettes = (colors) =>
  /** @type {any} */ (
    Object.fromEntries(colors.map((palette) => [palette.id, palette]))
  );

/**
 * @type {<TId extends string, TSwatch extends string>(id: TId, swatch: TSwatch) =>
 *   `${TId}.${TSwatch}`
 * }
 */
const createColorTokenName = (id, swatch) => `${id}.${swatch}`;

/**
 * @type {<TId extends string, TSwatch extends string>(id: TId, swatch: TSwatch) =>
 *   ReturnType<typeof createCssVariable<`${TId}-${TSwatch}`>>
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
 *       TPalette['id'],
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
    colors.flatMap((palette) =>
      palette.swatchIds.flatMap((swatchName) =>
        createColorTokenName(palette.id, swatchName),
      ),
    )
  );

/**
 * @type {<const T extends ColorsOptions>(colors: T) => {
 * [P in (T extends ReadonlyArray<infer V extends ColorsOptions[number]>
 *   ? V
 *   : never
 * ) as P['id']]: {
 *   [S in P['swatchIds'][number]]:
 *     ReturnType<typeof createColorTokenName<P['id'], S>>
 * }}}
 */
const colorsToTokenNames = (colors) =>
  /** @type {any} */ (
    Object.fromEntries(
      colors.map(({ id, swatchIds }) => [
        id,
        Object.fromEntries(
          swatchIds.map((swatchId) => [
            swatchId,
            createColorTokenName(id, swatchId),
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
 * ) as P['id']]: {
 *   [S in P['swatchIds'][number]]:
 *     ReturnType<typeof createColorTokenVariable<P['id'], S>>
 * }}}
 */
const colorsToCssVariables = (colors) => {
  /** @type {Record<string, Record<string, string>>} */
  const cssVariables = {};
  for (const { id, swatchIds } of colors) {
    cssVariables[id] = {};
    for (const swatchName of swatchIds) {
      cssVariables[id][swatchName] = createCssVariable(`${id}-${swatchName}`);
    }
  }
  return /** @type {any} */ (cssVariables);
};

/**
 * @type {<const T extends ColorsOptions>(colors: T) => {
 * [P in (T extends ReadonlyArray<infer V extends ColorsOptions[number]>
 *   ? V
 *   : never
 * ) as P['id']]: {
 *   [S in P['swatchIds'][number]]:
 *     ReturnType<typeof wrapCssVariable<
 *       ReturnType<typeof createColorTokenVariable<P['id'], S>>
 *     >>
 * }}}
 */
const colorsToCssVariablesWrapped = (colors) => {
  /** @type {Record<string, Record<string, string>>} */
  const cssVariables = {};
  for (const { id, swatchIds } of colors) {
    cssVariables[id] = {};
    for (const swatchName of swatchIds) {
      cssVariables[id][swatchName] = wrapCssVariable(
        createCssVariable(`${id}-${swatchName}`),
      );
    }
  }
  return /** @type {any} */ (cssVariables);
};

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
