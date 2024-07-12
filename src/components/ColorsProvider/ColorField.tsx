import { type ComponentProps, useCallback, useState } from 'react';
import { ColorSlider } from '../ColorSlider';
import { COLOR_DEFAULT, type Color, type PaletteId } from '../../entities';
import { usePalette } from './usePalette';

type ColorFieldProps = {
  paletteId: PaletteId;
  pick?: ComponentProps<typeof ColorSlider>['pick'];
};

export function ColorField({ paletteId, pick }: ColorFieldProps) {
  const { color, setColor } = usePalette(paletteId);

  const [defaultColor] = useState(() => ({ ...COLOR_DEFAULT, ...color }));

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
        pick={pick}
        onChange={handlePaletteChange}
      />
    </>
  );
}
