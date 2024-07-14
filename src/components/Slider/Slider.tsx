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
import { css } from '../../../styled-system/css';
import { Thumb } from './lib/Thumb';
import {
  type SliderAtomValue,
  SliderContext,
  type SliderContextValue,
} from './entities';
import { TrackOverlay } from './lib/TrackOverlay';
import { Track } from './lib/Track';
import { ThumbOverlay } from './lib/ThumbOverlay';

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
  trackClassName?: string;
  trackRef?: RefObject<HTMLDivElement>;
  trackOverlay?: ReactElement;
  thumbClassName?: string;
  thumbRef?: RefObject<HTMLDivElement>;
  thumbOverlay?: ReactElement;
};

export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    trackOverlay = <TrackOverlay />,
    thumbOverlay = <ThumbOverlay />,
    className,
    label,
    value,
    defaultValue,
    isDisabled,
    onChange,
    stops = 100,
    minValue = 0,
    maxValue = 1,
    thumbClassName,
    thumbRef: thumbRefProp,
    trackClassName,
    trackRef: trackRefProp,
  },
  sliderRef,
) {
  const trackRefDefault = useRef(null);
  const trackRef: NonNullable<SliderProps['trackRef']> =
    trackRefProp ?? trackRefDefault;

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

  const thumbRefDefault = useRef(null);
  const thumbRef: NonNullable<SliderProps['thumbRef']> =
    thumbRefProp ?? thumbRefDefault;

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
        <Track className={trackClassName} overlay={trackOverlay}>
          <Thumb className={thumbClassName} overlay={thumbOverlay} />
        </Track>
      </div>
    </SliderContext.Provider>
  );
});
