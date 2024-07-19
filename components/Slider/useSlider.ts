import { useAtomValue } from 'jotai';
import { useContext, useMemo } from 'react';
import { flagsToDataAttributes } from '../../shared';
import { SliderContext, type UseSliderValue } from './entities';

export const useSlider = () => {
  const { sliderAtom, isDisabled } = useContext(SliderContext);
  const atomValue = useAtomValue(sliderAtom);
  const { isFocused, isDragging } = atomValue;
  const dataAttributes = useMemo(
    () => flagsToDataAttributes({ isFocused, isDragging, isDisabled }),
    [isDisabled, isDragging, isFocused],
  );

  return useMemo(
    (): UseSliderValue => ({ ...atomValue, isDisabled, dataAttributes }),
    [atomValue, dataAttributes, isDisabled],
  );
};
