import { colorValue, type Color } from '../../../shared/entities';
import { sliderTrackOverlayClassName } from '../../Slider';

type TrackOverlayProps = {
  pick: keyof Color;
  color: Color;
};

export function TrackOverlay({ color }: TrackOverlayProps) {
  return (
    <div
      className={sliderTrackOverlayClassName}
      style={{ backgroundColor: colorValue(color) }}
    />
  );
}
