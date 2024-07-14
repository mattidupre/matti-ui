import { useCallback } from 'react';
import { useAtomCallback } from 'jotai/utils';
import { usePalettesAtoms } from './lib/ColorAtomsContext';

export const useCssVariables = () => {
  // Expected to not change.
  const palettesAtoms = usePalettesAtoms();
  return useAtomCallback(
    useCallback(
      (get) =>
        Object.assign(
          {} as Record<string, string>,
          ...Object.values(palettesAtoms).map(({ cssVariablesAtom }) =>
            get(cssVariablesAtom),
          ),
        ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    ),
  );
};
