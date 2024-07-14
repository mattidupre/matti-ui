import { useCallback, useMemo, memo, useState } from 'react';
import { mapValues } from 'lodash-es';
import { type Color, COLOR_DEFAULTS, COLOR_LABELS } from '../../../shared';
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

const COLOR_KEYS = Object.keys(COLOR_DEFAULTS) as ReadonlyArray<ColorKey>;

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
  const [isControlled] = useState(defaultValue === undefined);
  const [valueState, setValueState] = useState<Color>(
    (isControlled ? value : defaultValue) ?? COLOR_DEFAULTS,
  );
  const color = value ?? valueState;

  const labels = useMemo(
    () => mapValues(COLOR_LABELS, (colorLabel) => `${label} ${colorLabel}`),
    [label],
  );

  const colorKeys = useMemo(() => parseColorKeys(pick), [pick]);

  const handleChange = useCallback(
    (value: Partial<Color>) => {
      const newColor = {
        ...color,
        ...value,
      };
      if (!isControlled) {
        setValueState(newColor);
      }
      onChange(newColor);
    },
    [color, isControlled, onChange],
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
      <br />
      {colorKeys.map((pickKey) => {
        return (
          <ColorValueSlider
            label={labels[pickKey]}
            onChange={callbacks[pickKey]}
            key={pickKey}
            pick={pickKey}
            color={color}
            isDisabled={isDisabled}
          />
        );
      })}
    </>
  );
});
