import { type SliderStateOptions, useSliderState } from 'react-stately';
import { useNumberFormatter } from 'react-aria';
import {
  forwardRef,
  type ReactElement,
  type RefObject,
  useCallback,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import { atom, useSetAtom } from 'jotai';
import { css } from '../../styled-system/css';
import { Thumb } from './lib/Thumb';
import {
  type SliderAtomValue,
  SliderContext,
  type SliderContextValue,
} from './entities';
import { SliderTrackOverlay } from './SliderTrackOverlay';
import { Track } from './lib/Track';
import { SliderThumbOverlay } from './SliderThumbOverlay';

const styles = css({
  display: 'block',
  position: 'relative',
  width: '100%',
  height: '1.5rem',
});

type SliderProps = {
  ref?: RefObject<HTMLDivElement>;
  className?: string;
  label: string;
  isDisabled?: boolean;
  minValue?: number;
  maxValue?: number;
  onChange: (value: number) => void;
  stops?: number;
  value?: number;
  defaultValue?: number;
  trackOverlay?: ReactElement;
  thumbOverlay?: ReactElement;
};

export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    trackOverlay = <SliderTrackOverlay />,
    thumbOverlay = <SliderThumbOverlay />,
    className,
    label,
    value,
    defaultValue,
    isDisabled,
    onChange,
    stops = 100,
    minValue = 0,
    maxValue = 1,
  },
  sliderRef,
) {
  const trackRef = useRef<HTMLDivElement>(null);

  const [sliderAtom] = useState((): SliderContextValue['sliderAtom'] => {
    const primitive = atom<SliderAtomValue>({
      isFocused: false,
      isDragging: false,
      value: value ?? defaultValue!,
    } satisfies SliderAtomValue);
    return atom(
      (get) => get(primitive),
      (get, set, value: Partial<SliderAtomValue>) =>
        set(primitive, {
          ...get(primitive),
          ...value,
        }),
    );
  });
  const setSliderAtom = useSetAtom(sliderAtom);

  const thumbRef = useRef<HTMLDivElement>(null);

  const sliderOptions: SliderStateOptions<number> = {
    label,
    value,
    defaultValue,
    isDisabled,
    onChange: useCallback(
      (value: number) => {
        onChange(value);
        setSliderAtom({ isDragging: true, value });
      },
      [onChange, setSliderAtom],
    ),
    maxValue,
    minValue,
    step: Math.abs((maxValue - minValue) / stops),
    numberFormatter: useNumberFormatter(),
    orientation: 'horizontal',
    onChangeEnd: useCallback(() => {
      setSliderAtom({ isDragging: false });
    }, [setSliderAtom]),
  };

  const sliderState = useSliderState(sliderOptions);

  return (
    <SliderContext.Provider
      value={{
        sliderAtom,
        sliderOptions,
        thumbRef,
        trackRef,
        sliderState,
        isDisabled: Boolean(isDisabled),
      }}
    >
      <div className={clsx(styles, className)} ref={sliderRef}>
        <Track overlay={trackOverlay}>
          <Thumb overlay={thumbOverlay} />
        </Track>
      </div>
    </SliderContext.Provider>
  );
});
