import { type Atom, atom, useAtomValue } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { useEffect, useState } from 'react';

export const DEFAULT_COLOR_SCHEME = 'dark';

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

let systemColorAtom: Atom<'light' | 'dark'>;

/**
 * Defaults to dark.
 */
export const getSystemColorAtom = () => {
  if (!systemColorAtom) {
    const isLightMediaQuery = globalThis?.matchMedia(
      '(prefers-color-scheme: light)',
    );
    const primitiveSystemColorAtom = atom<'light' | 'dark'>(
      isLightMediaQuery ? 'light' : 'dark',
    );
    primitiveSystemColorAtom.onMount = (setAtom) => {
      if (!isLightMediaQuery) {
        return;
      }

      const callback = ({ matches }: { matches: boolean }) => {
        setAtom(matches ? 'dark' : 'light');
      };

      isLightMediaQuery.addEventListener('change', callback);

      return () => {
        isLightMediaQuery.removeEventListener('change', callback);
      };
    };

    systemColorAtom = atom((get) => get(primitiveSystemColorAtom));
  }

  return systemColorAtom;
};

export const useSystemColorScheme = () => useAtomValue(getSystemColorAtom());
