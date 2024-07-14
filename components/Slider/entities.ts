import type { WritableAtom } from 'jotai/experimental';
import { createContext, type RefObject } from 'react';
import type { SliderState, SliderStateOptions } from 'react-stately';

export type SliderAtomValue = {
  isDragging: boolean;
  isFocused: boolean;
  value: number;
};

export type SliderContextValue = {
  sliderAtom: WritableAtom<SliderAtomValue, [Partial<SliderAtomValue>], void>;
  sliderOptions: SliderStateOptions<number>;
  sliderState: SliderState;
  thumbRef: RefObject<HTMLDivElement>;
  trackRef: RefObject<HTMLDivElement>;
  isDisabled: boolean;
};

export const SliderContext = createContext<SliderContextValue>(
  undefined as unknown as SliderContextValue,
);

export type UseSliderValue = SliderAtomValue &
  Pick<SliderContextValue, 'isDisabled'> & {
    dataAttributes: Record<string, string>;
  };
