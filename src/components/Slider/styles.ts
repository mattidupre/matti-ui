import { selectFlagSelf } from '../../entities';
import { sva } from '@styled-system/css';

export const styles = sva({
  slots: ['slider', 'track', 'thumb'],
  base: {
    slider: {
      display: 'block',
      position: 'relative',
      width: '100%',
      height: '1.5rem',
    },
    track: {
      width: '100%',
      height: '100%',
      ['&::before']: {
        content: '',
        display: 'block',
        width: '100%',
        height: '4px',
        borderRadius: '2px',
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translate3d(0px, -50%, 0px)',
        backgroundColor: 'currentColor',
      },
    },
    thumb: {
      width: '1rem',
      height: '1rem',
      borderRadius: '50%',
      backgroundColor: 'currentColor',
      top: '50%',
      cursor: 'pointer',
      [selectFlagSelf('isDragging')]: {
        width: '1.5rem',
        height: '1.5rem',
      },
    },
  },
});
