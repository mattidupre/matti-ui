import { type SliderStateOptions, useSliderState } from 'react-stately';
import { useSlider, useNumberFormatter } from 'react-aria';
import { useRef } from 'react';
import { styles } from './styles';
import { Thumb } from './lib/Thumb';

type SliderProps = {
  label: string;
  isDisabled?: boolean;
  minValue?: number;
  maxValue?: number;
  onChange: (value: number) => void;
  stops?: number;
  value?: number;
  defaultValue?: number;
};

export function Slider({
  label,
  value,
  defaultValue,
  isDisabled,
  onChange,
  stops = 100,
  minValue = 0,
  maxValue = 1,
}: SliderProps) {
  const classNames = styles();

  const trackRef = useRef<HTMLDivElement>(null);

  const sliderOptions: SliderStateOptions<number> = {
    label,
    value,
    defaultValue,
    isDisabled,
    onChange,
    orientation: 'horizontal',
    maxValue,
    minValue,
    step: Math.abs((maxValue - minValue) / stops),
    numberFormatter: useNumberFormatter(),
  };

  const state = useSliderState(sliderOptions);

  const { trackProps } = useSlider(sliderOptions, state, trackRef);

  return (
    <div className={classNames.slider}>
      <div className={classNames.track} {...trackProps} ref={trackRef}>
        <Thumb
          className={classNames.thumb}
          index={0}
          state={state}
          trackRef={trackRef}
        />
      </div>
    </div>
  );
}
