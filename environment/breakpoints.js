// @ts-check

/**
 * @typedef { ReadonlyArray<{id: string, value: number}> } BreakpointsOptions
 */

/**
 * @typedef {TTuple extends readonly [
 *   infer B extends BreakpointsOptions[number],
 *   ...infer X extends BreakpointsOptions,
 * ]
 *   ? BreakpointsToNames<X, [...TResult, B['id']]>
 *   : TResult
 * } BreakpointsToNames<TTuple, TResult>
 *  @template {BreakpointsOptions} TTuple
 * @template {ReadonlyArray<string>} [TResult=[]]
 */

/**
 * @type {<const T extends BreakpointsOptions>(breakpoints: T) =>
 *   BreakpointsToNames<T>
 * }
 */
const breakpointsToNames = (breakpoints) =>
  /** @type {any} */ (breakpoints.map(({ id }) => id));

/**
 * @type {<const T extends BreakpointsOptions>(breakpoints: T) => {
 *   [K in (T extends ReadonlyArray<infer V extends BreakpointsOptions[number]>
 *     ? V
 *     : never
 *   ) as K['id']]: `${K['value']}px`
 * }}
 */
const breakpointsToSizes = (breakpoints) =>
  /** @type {any} */ (
    Object.fromEntries(breakpoints.map(({ id, value }) => [id, `${value}px`]))
  );

/**
 * @type {<const T extends BreakpointsOptions>(breakpoints: T) => {
 *   [K in (T extends ReadonlyArray<infer V extends BreakpointsOptions[number]>
 *     ? V
 *     : never
 *   ) as K['id']]: K['value']
 * }}
 */
const breakpointsToValues = (breakpoints) =>
  /** @type {any} */ (
    Object.fromEntries(breakpoints.map(({ id, value }) => [id, value]))
  );

/**
 * @type {<const T extends BreakpointsOptions>(breakpoints: T) => {
 *   values: ReturnType<typeof breakpointsToValues<T>>;
 *   sizes: ReturnType<typeof breakpointsToSizes<T>>;
 *   names: ReturnType<typeof breakpointsToNames<T>>
 * }}
 */
export const defineBreakpoints = (breakpoints) => ({
  values: breakpointsToValues(breakpoints),
  sizes: breakpointsToSizes(breakpoints),
  names: breakpointsToNames(breakpoints),
});
