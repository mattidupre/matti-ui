import { clampChroma } from 'culori';
import type { Oklch } from './entities';

// https://stackoverflow.com/questions/77539518/how-to-find-a-maximum-chroma-value-in-the-oklch-color-space-for-given-hue-and-li

// https://culorijs.org/api/

export const getMaxChroma = ({
  lightness,
  hue,
}: Omit<Oklch, 'chroma'>): number =>
  (
    clampChroma({ mode: 'oklch', l: lightness, c: 1, h: hue }, 'oklch') as {
      c: number;
    }
  ).c;
