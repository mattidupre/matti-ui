import {
  parseLightOrDarkOrBase,
  type LightAndDark,
  type LightOrDarkOrBase,
} from '../colorScheme';

export type Oklch = {
  lightness: number;
  chroma: number;
  hue: number;
};

export type OklchLightDark = LightAndDark<Oklch>;

export const OKLCH_BOUNDS = {
  lightness: [0, 1],
  chroma: [0, 0.37],
  hue: [0, 360],
} as const satisfies Record<keyof Oklch, [max: number, min: number]>;

export const OKLCH_LABELS = {
  lightness: 'Lightness',
  chroma: 'Chroma',
  hue: 'Hue',
} as const satisfies Record<keyof Oklch, string>;

export const OKLCH_DEFAULTS: Oklch = {
  lightness: 0,
  chroma: 0,
  hue: 0,
};

export const OKLCH_DEFAULTS_LIGHT_DARK: OklchLightDark = {
  light: OKLCH_DEFAULTS,
  dark: OKLCH_DEFAULTS,
};

export const extendOklch = (
  ...colors: ReadonlyArray<undefined | Partial<Oklch>>
) => Object.assign(globalThis.structuredClone(OKLCH_DEFAULTS), ...colors);

export type PartialOkclhLightDark = LightOrDarkOrBase<Partial<Oklch>>;

export const extendOklchLightDark = (
  ...colors: ReadonlyArray<undefined | PartialOkclhLightDark>
) => {
  let result: OklchLightDark = globalThis.structuredClone(
    OKLCH_DEFAULTS_LIGHT_DARK,
  );
  for (const color of colors) {
    const { light, dark } = parseLightOrDarkOrBase(color);
    result = {
      light: {
        ...result.light,
        ...light,
      },
      dark: {
        ...result.dark,
        ...dark,
      },
    };
  }
  return result;
};

const _oklchToString = ({ lightness, chroma, hue }: Oklch) =>
  `oklch(${lightness} ${chroma} ${hue})`;

export const oklchToString = (
  ...colors: ReadonlyArray<undefined | PartialOkclhLightDark>
): string => {
  const { light, dark } = extendOklchLightDark(...colors);
  const lightString = _oklchToString(light);
  const darkString = _oklchToString(dark);
  return lightString === darkString
    ? lightString
    : `light-dark(${lightString}, ${darkString})`;
};
