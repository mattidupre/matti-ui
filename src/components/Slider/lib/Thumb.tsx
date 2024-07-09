import type { SliderState } from 'react-stately';
import { useSliderThumb, VisuallyHidden } from 'react-aria';
import { type RefObject, useRef } from 'react';
import { flagsToDataAttributes } from '../../../entities';

type ThumbProps = {
  className?: string;
  state: SliderState;
  trackRef: RefObject<Element>;
  index: number;
};

export function Thumb({ className, state, trackRef, index }: ThumbProps) {
  const inputRef = useRef(null);
  const { thumbProps, inputProps, isDragging, isDisabled, isFocused } =
    useSliderThumb(
      {
        index,
        trackRef,
        inputRef,
      },
      state,
    );

  return (
    <div
      className={className}
      {...thumbProps}
      {...flagsToDataAttributes({
        isDisabled,
        isDragging,
        isFocused,
      })}
    >
      <VisuallyHidden>
        <input ref={inputRef} {...inputProps} />
      </VisuallyHidden>
    </div>
  );
}
