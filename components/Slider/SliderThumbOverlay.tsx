import { css } from '../../styled-system/css';
import { useSlider } from './useSlider';

export const sliderThumbOverlayClassName = css({
  width: '75%',
  height: '75%',
  borderRadius: '50%',
  backgroundColor: 'currentColor',
  transform: 'scale(80%)',
  transitionProperty: 'transform',
  transitionDuration: '0.125s',
  cursor: 'pointer',
  ['&[data-dragging]']: {
    transform: 'scale(100%)',
  },
  _hover: {
    transform: 'scale(100%)',
  },
});

export function SliderThumbOverlay() {
  const { dataAttributes } = useSlider();
  return <div className={sliderThumbOverlayClassName} {...dataAttributes} />;
}
