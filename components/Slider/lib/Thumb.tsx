import { useSliderThumb, VisuallyHidden } from 'react-aria';
import { type ReactNode, useCallback, useContext, useRef } from 'react';
import clsx from 'clsx';
import { useSetAtom } from 'jotai';
import { flagsToDataAttributes } from '../../../shared';
import { SliderContext } from '../entities';
import { css } from '../../../styled-system/css';

const styles = css({
  top: '50%',
  height: '100%',
  aspectRatio: '1',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

type ThumbProps = {
  className?: string;
  overlay?: ReactNode;
};

export function Thumb({ overlay, className }: ThumbProps) {
  const { sliderState, trackRef, sliderAtom } = useContext(SliderContext);
  const setSliderAtom = useSetAtom(sliderAtom);

  const inputRef = useRef(null);
  const { thumbProps, inputProps, isDragging, isDisabled, isFocused } =
    useSliderThumb(
      {
        index: 0,
        trackRef,
        inputRef,
        onFocus: useCallback(
          () => setSliderAtom({ isFocused: true }),
          [setSliderAtom],
        ),
        onBlur: useCallback(
          () => setSliderAtom({ isFocused: false }),
          [setSliderAtom],
        ),
      },
      sliderState,
    );

  return (
    <div
      className={clsx(styles, className)}
      {...thumbProps}
      {...flagsToDataAttributes({
        isDisabled,
        isDragging,
        isFocused,
      })}
    >
      {overlay}
      <VisuallyHidden>
        <input ref={inputRef} {...inputProps} />
      </VisuallyHidden>
    </div>
  );
}
