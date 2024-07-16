import { type ComponentProps, useCallback, useMemo } from 'react';
import { ColorSlider } from '../ColorSlider';
import { extendColor, type Color, type PaletteId } from '../../shared';
import { usePalette } from '../ColorsProvider';

type ColorFieldProps = {
  paletteId: PaletteId;
  adjust?: ComponentProps<typeof ColorSlider>['pick'];
};

export function ColorField({ paletteId, adjust }: ColorFieldProps) {
  const { baseColor, setBaseColor } = usePalette(paletteId);

  const defaultColor = useMemo(
    () => extendColor({ lightness: 0.5 }, baseColor),
    [baseColor],
  );

  const handlePaletteChange = useCallback(
    (value: Color) => {
      setBaseColor(value);
    },
    [setBaseColor],
  );

  return (
    <ColorSlider
      key={paletteId}
      label="Palette"
      defaultValue={defaultColor}
      pick={adjust}
      onChange={handlePaletteChange}
    />
  );
}
