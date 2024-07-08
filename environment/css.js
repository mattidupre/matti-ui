// @ts-check

import { PREFIX } from './constants';

/**
 * @type {<T extends string>(name: T) => `--${typeof PREFIX}-${T}`}
 */
export const createCssVariable = (name) => `--${PREFIX}-${name}`;

/**
 * @type {<T extends ReturnType<typeof createCssVariable<string>>>(variable: T) => `var(${T})`}
 */
export const wrapCssVariable = (variable) => `var(${variable})`;
