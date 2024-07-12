import { useCallback, useMemo, useRef, memo } from 'react';
import { mapValues } from 'lodash-es';
import { type Color, COLOR_DEFAULT, COLOR_LABELS } from '../../entities';
import { ColorValueSlider } from './lib/ColorValueSlider';

type ColorKey = keyof Color;

type ColorSliderProps = {
  label: string;
  isDisabled?: boolean;
  onChange: (value: Color) => void;
  value?: Color;
  defaultValue?: Color;
  pick?: ColorKey | ReadonlyArray<ColorKey>;
};

const COLOR_KEYS = Object.keys(COLOR_DEFAULT) as ReadonlyArray<ColorKey>;

const parseColorKeys = (
  colorKeys: ColorSliderProps['pick'],
): ReadonlyArray<ColorKey> => {
  const pickArray = Array.isArray(colorKeys) ? colorKeys : [colorKeys];
  return COLOR_KEYS.filter((key) => pickArray.includes(key));
};

export const ColorSlider = memo(function ColorSlider({
  label,
  isDisabled,
  onChange,
  value,
  defaultValue,
  pick = COLOR_KEYS,
}: ColorSliderProps) {
  const labels = useMemo(
    () => mapValues(COLOR_LABELS, (colorLabel) => `${label} ${colorLabel}`),
    [label],
  );

  const colorKeys = useMemo(() => parseColorKeys(pick), [pick]);

  const colorRef = useRef<Color>(value ?? defaultValue ?? COLOR_DEFAULT);

  const handleChange = useCallback(
    (color: Partial<Color>) => {
      colorRef.current = {
        ...colorRef.current,
        ...color,
      };
      onChange(colorRef.current);
    },
    [onChange],
  );

  const callbacks = useMemo(
    () =>
      Object.fromEntries(
        colorKeys.map((colorKey) => [
          colorKey,
          (value: number) => handleChange({ [colorKey]: value }),
        ]),
      ),
    [colorKeys, handleChange],
  );

  return (
    <>
      <span>{label}</span>
      <br />
      {colorKeys.map((pickKey) => (
        <ColorValueSlider
          label={labels[pickKey]}
          onChange={callbacks[pickKey]}
          key={pickKey}
          pick={pickKey}
          value={value}
          defaultValue={defaultValue}
          isDisabled={isDisabled}
        />
      ))}
    </>
  );
});
