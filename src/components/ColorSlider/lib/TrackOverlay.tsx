import { colorValue, type Color } from '../../../entities';
import { useSlider } from '../../Slider';

type TrackOverlayProps = {
  pick: keyof Color;
  color: Color;
};

export function TrackOverlay({ pick, color }: TrackOverlayProps) {
  const { value } = useSlider();
  return <div style={{ backgroundColor: colorValue(color) }}>HERE {value}</div>;
}
