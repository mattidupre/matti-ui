import { type ComponentProps, useCallback, useState } from 'react';
import { ColorSlider } from '../ColorSlider';
import { extendColor, type Color, type PaletteId } from '../../shared';
import { usePalette } from '../ColorsProvider';

type ColorFieldProps = {
  paletteId: PaletteId;
  adjust?: ComponentProps<typeof ColorSlider>['pick'];
};

export function ColorField({ paletteId, adjust }: ColorFieldProps) {
  const { color, setColor } = usePalette(paletteId);

  const [defaultColor] = useState(() => extendColor({ lightness: 0.5 }, color));

  const handlePaletteChange = useCallback(
    (value: Color) => {
      setColor(value);
    },
    [setColor],
  );

  return (
    <>
      <ColorSlider
        label="Palette"
        defaultValue={defaultColor}
        pick={adjust}
        onChange={handlePaletteChange}
      />
    </>
  );
}
