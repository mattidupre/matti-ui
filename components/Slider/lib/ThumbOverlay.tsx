import { useSlider } from '../useSlider';
import { css } from '../../../styled-system/css';

const style = css({
  width: '75%',
  height: '75%',
  borderRadius: '50%',
  backgroundColor: 'currentColor',
  transform: 'scale(80%)',
  transitionProperty: 'transform',
  transitionDuration: '0.125s',
  ['&[data-dragging]']: {
    transform: 'scale(100%)',
  },
  _hover: {
    transform: 'scale(100%)',
  },
});

export function ThumbOverlay() {
  const { dataAttributes } = useSlider();
  return <div className={style} {...dataAttributes} />;
}
