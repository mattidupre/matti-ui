import { useSlider } from '../useSlider';
import { css } from '@styled-system/css';

const style = css({
  display: 'block',
  position: 'absolute',
  width: '100%',
  height: '4px',
  borderRadius: '2px',
  top: '50%',
  left: 0,
  transform: 'translate3d(0px, -50%, 0px)',
  backgroundColor: 'currentColor',
});

export function TrackOverlay() {
  const { dataAttributes } = useSlider();
  return <div className={style} {...dataAttributes} />;
}
