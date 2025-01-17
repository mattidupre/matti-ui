import { type ComponentProps, memo } from 'react';
import type { Simplify } from 'type-fest';
import { Slider } from '../../Slider';
import { OKLCH_BOUNDS, type Color, COLOR_LABELS } from '../../../shared';
import { TrackOverlay } from './TrackOverlay';

type SliderProps = ComponentProps<typeof Slider>;

type ColorValueSliderProps = Simplify<
  Pick<SliderProps, 'label' | 'isDisabled'> & {
    onChange: (value: number) => void;
    color: Color;
    pick: keyof Color;
  }
>;

export const ColorValueSlider = memo(function ColorValueSlider({
  onChange,
  pick,
  color,
  ...props
}: ColorValueSliderProps) {
  return (
    <>
      <span>{COLOR_LABELS[pick]}</span>
      <Slider
        {...props}
        onChange={onChange}
        value={color?.[pick]}
        minValue={OKLCH_BOUNDS[pick][0]}
        maxValue={OKLCH_BOUNDS[pick][1]}
        trackOverlay={<TrackOverlay pick={pick} color={color} />}
      />
    </>
  );
});
