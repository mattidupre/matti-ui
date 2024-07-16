import { type ComponentProps, useCallback, useMemo } from 'react';
import { ColorSlider } from '../ColorSlider';
import { extendColor, type Color, type PaletteId } from '../../shared';
import { usePalette } from '../ColorsProvider';

type ColorFieldProps = {
  paletteId: PaletteId;
  onChange?: ComponentProps<typeof ColorSlider>['onChange'];
} & Pick<ComponentProps<typeof ColorSlider>, 'label' | 'adjust'>;

export function ColorField({
  paletteId,
  adjust,
  onChange,
  ...props
}: ColorFieldProps) {
  const { baseColor, setBaseColor } = usePalette(paletteId);

  const defaultColor = useMemo(
    () => extendColor({ lightness: 0.5 }, baseColor),
    [baseColor],
  );

  const handleChange = useCallback(
    (value: Color) => {
      setBaseColor(value);
      onChange?.(value);
    },
    [onChange, setBaseColor],
  );

  return (
    <ColorSlider
      {...props}
      key={paletteId}
      defaultValue={defaultColor}
      adjust={adjust}
      onChange={handleChange}
    />
  );
}
