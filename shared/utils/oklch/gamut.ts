import { clampChroma, inGamut } from 'culori';
import type { Oklch } from './entities';

// https://stackoverflow.com/questions/77539518/how-to-find-a-maximum-chroma-value-in-the-oklch-color-space-for-given-hue-and-li
// https://culorijs.org/api/

const inOklch = inGamut('rgb');

const parseOklch = ({ lightness, chroma, hue }: Oklch) =>
  ({
    mode: 'oklch',
    l: lightness,
    c: chroma,
    h: hue,
  }) as const;

export const oklchInGamut = (color: Oklch) => inOklch(parseOklch(color));

export const getMaxChroma = ({
  lightness,
  hue,
}: Omit<Oklch, 'chroma'>): number =>
  clampChroma(parseOklch({ lightness, hue, chroma: 1 }), 'oklch').c;
