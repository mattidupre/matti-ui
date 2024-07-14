import { UI_PREFIX } from '../constants';

export type CssVariable<
  T extends string = string,
  TColorScheme extends 'light' | 'dark' | undefined = undefined,
> = TColorScheme extends undefined
  ? `--${typeof UI_PREFIX}-${T}`
  : `--${typeof UI_PREFIX}-${T}-${TColorScheme}`;

export const createCssVariable = <
  T extends string,
  TColorScheme extends 'light' | 'dark' | undefined = undefined,
>(
  value: T,
  colorScheme?: TColorScheme,
) => {
  type TResult = CssVariable<T, TColorScheme>;
  if (!colorScheme) {
    return `--${UI_PREFIX}-${value}` as TResult;
  }
  return `--${UI_PREFIX}-${value}-${colorScheme}` as TResult;
};

export type CssVariableWrapped<
  T extends string = string,
  TColorScheme extends 'light' | 'dark' | undefined = undefined,
> = `var(${CssVariable<T, TColorScheme>})`;

export const wrapCssVariable = <T extends CssVariable>(value: T) => {
  return `var(${value})` as const;
};

export const createCssVariableWrapped = <
  T extends string,
  TColorScheme extends 'light' | 'dark' | undefined = undefined,
>(
  value: T,
  colorScheme?: TColorScheme,
) => wrapCssVariable(createCssVariable(value, colorScheme));