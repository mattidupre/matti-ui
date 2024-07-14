import type { ReactElement, ReactNode } from 'react';
import { useContext } from 'react';
import { useSlider } from 'react-aria';
import clsx from 'clsx';
import { SliderContext } from '../entities';
import { css } from '../../../../styled-system/css';

const style = css({
  display: 'block',
  position: 'relative',
  width: '100%',
  height: '100%',
});

type TrackProps = {
  className?: string;
  overlay: ReactElement;
  children: ReactNode;
};

export const Track = function Track({
  className,
  overlay,
  children,
}: TrackProps) {
  const { sliderOptions, sliderState, trackRef } = useContext(SliderContext);

  const { trackProps } = useSlider(sliderOptions, sliderState, trackRef);
  return (
    <div {...trackProps} ref={trackRef} className={clsx(style, className)}>
      {overlay}
      {children}
    </div>
  );
};
