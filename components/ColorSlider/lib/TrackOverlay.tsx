import { colorValue, type Color } from '../../../shared/entities';
import { useSlider } from '../../Slider';

type TrackOverlayProps = {
  pick: keyof Color;
  color: Color;
};

export function TrackOverlay({ color }: TrackOverlayProps) {
  const { value } = useSlider();
  return <div style={{ backgroundColor: colorValue(color) }}>HERE {value}</div>;
}
