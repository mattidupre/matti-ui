// @ts-check

import { defineColors } from './colors.js';
import { defineBreakpoints } from './breakpoints.js';

/**
 * @typedef {{
 *   breakpoints: Parameters<defineBreakpoints>[0];
 *   colors: Parameters<defineColors>[0];
 * }} UiOptions
 */

/**
 * @typedef { import('type-fest').SimplifyDeep<{
 *   breakpoints: ReturnType<typeof defineBreakpoints<T['breakpoints']>>;
 *   colors: ReturnType<typeof defineColors<T['colors']>>;
 * }>} UiEnvironment<T>
 * @template {UiOptions} T
 */

/**
 * @type {<const T extends UiOptions>(config: T) =>
 *   UiEnvironment<T>
 * }
 */
export const defineUiEnvironment = ({ breakpoints, colors }) =>
  /** @type {any} */
  ({
    breakpoints: defineBreakpoints(breakpoints),
    colors: defineColors(colors),
  });
