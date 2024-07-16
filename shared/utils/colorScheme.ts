import { useEffect, useState } from 'react';

export type LightAndDark<T> = {
  light: T;
  dark: T;
};

export type LightOrDarkOrBase<T extends Record<PropertyKey, unknown>> =
  | undefined
  | (Partial<T> & {
      light?: T;
      dark?: T;
    });

export const parseLightOrDarkOrBase = <T extends Record<PropertyKey, unknown>>(
  value: undefined | LightOrDarkOrBase<T>,
): LightAndDark<T> => {
  const { light, dark, ...rest } = value ?? {};
  return {
    light: {
      ...rest,
      ...light,
    },
    dark: {
      ...rest,
      ...dark,
    },
  } as LightAndDark<T>;
};

export type LightOrDarkOrString<T extends string> =
  | undefined
  | T
  | {
      light?: T;
      dark?: T;
    };

export const parseLightOrDarkOrString = <T extends string>(
  value: undefined | LightOrDarkOrString<T>,
): LightAndDark<T> => {
  if (value === undefined || typeof value === 'string') {
    return { light: value, dark: value } as LightAndDark<T>;
  }
  return { light: undefined, dark: undefined, ...value } as LightAndDark<T>;
};

/**
 * Will return undefined on SSR.
 */
export const useSystemColorScheme = () => {
  const [isDarkMediaQuery] = useState<undefined | MediaQueryList>(() =>
    globalThis?.matchMedia('(prefers-color-scheme: dark)'),
  );

  const [colorSchemeState, setColorSchemeState] = useState<
    undefined | 'light' | 'dark'
  >(() => (isDarkMediaQuery?.matches ? 'dark' : 'light'));

  useEffect(() => {
    isDarkMediaQuery?.addEventListener('change', ({ matches }) =>
      setColorSchemeState(matches ? 'dark' : 'light'),
    );
  }, [isDarkMediaQuery]);

  return colorSchemeState;
};
