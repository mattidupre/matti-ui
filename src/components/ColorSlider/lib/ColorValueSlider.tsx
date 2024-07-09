import { memo } from 'react';
import type { ColorConfig } from '../../../entities';
import { Slider } from '../../Slider';
import { COLOR_LABELS } from '../entities';

type ColorValueSliderProps = {
  label: string;
  isDisabled?: boolean;
  onChange: (value: number) => void;
  value?: number;
  defaultValue?: number;
  pick: keyof ColorConfig;
};

export const ColorValueSlider = memo(function ColorValueSlider({
  onChange,
  pick,
  ...props
}: ColorValueSliderProps) {
  return (
    <>
      <span>{COLOR_LABELS[pick]}</span>
      <Slider onChange={onChange} {...props} />
    </>
  );
});
