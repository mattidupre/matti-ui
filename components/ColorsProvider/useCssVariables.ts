import { useAtomValue } from 'jotai';
import { mapSwatches } from '../../shared';
import { getColorVariable } from '../entities';
import { useSwatchAtom } from './lib/ColorAtomsContext';

export const useCssVariables = () =>
  Object.fromEntries(
    mapSwatches(({ colorToken }) => {
      // Because these are static values, hook order is preserved.
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { value, lightValue, darkValue } = useAtomValue(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSwatchAtom(colorToken),
      );
      return [
        [getColorVariable(colorToken), value],
        [getColorVariable(`${colorToken}.light`), lightValue],
        [getColorVariable(`${colorToken}.dark`), darkValue],
      ];
    }).flat(),
  );
