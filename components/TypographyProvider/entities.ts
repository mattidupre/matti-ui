import { createContext } from 'react';
import { atom } from 'jotai';
import type { WritableAtom } from 'jotai/experimental';
import {
  TYPOGRAPHY_THEME_DEFAULT_ID,
  type TypographyThemeId,
} from '../../shared';

export type TypographyThemeIdAtom = WritableAtom<
  TypographyThemeId,
  [{ typographyThemeId: undefined | TypographyThemeId }],
  void
>;

export type TypographyContextValue = {
  /** The current theme ID. If undefined, reverts to parent of config default. */
  typographyThemeIdAtom: TypographyThemeIdAtom;
};

export const TypographyContext = createContext<
  undefined | TypographyContextValue
>(undefined);

export const createTypographyAtoms = ({
  typographyThemeIdAtomParent,
  typographyThemeIdDefault,
}: {
  typographyThemeIdAtomParent: undefined | TypographyThemeIdAtom;
  typographyThemeIdDefault: undefined | TypographyThemeId;
}): TypographyContextValue => {
  const typographyThemeIdAtomPrimitive = atom(typographyThemeIdDefault);
  return {
    typographyThemeIdAtom: atom(
      (get) =>
        get(typographyThemeIdAtomPrimitive) ??
        (typographyThemeIdAtomParent && get(typographyThemeIdAtomParent)) ??
        TYPOGRAPHY_THEME_DEFAULT_ID,
      (
        get,
        set,
        {
          typographyThemeId,
        }: { typographyThemeId: undefined | TypographyThemeId },
      ) => {
        set(typographyThemeIdAtomPrimitive, typographyThemeId);
      },
    ),
  };
};
