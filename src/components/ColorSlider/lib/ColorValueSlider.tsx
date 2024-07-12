import { memo } from 'react';
import { type Color, COLOR_LABELS } from '../../../entities';
import { Slider } from '../../Slider';

type ColorValueSliderProps = {
  label: string;
  isDisabled?: boolean;
  onChange: (value: number) => void;
  value?: Color;
  defaultValue?: Color;
  pick: keyof Color;
};

export const ColorValueSlider = memo(function ColorValueSlider({
  onChange,
  pick,
  value,
  defaultValue,
  ...props
}: ColorValueSliderProps) {
  return (
    <>
      <span>{COLOR_LABELS[pick]}</span>
      <Slider
        onChange={onChange}
        value={value?.[pick]}
        defaultValue={defaultValue?.[pick]}
        {...props}
      />
    </>
  );
});
