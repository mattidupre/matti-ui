import { mapValues } from 'lodash-es';
import { RADII_CONFIG } from '../config';

const { radiiIds, radiiById } = RADII_CONFIG;

export const RADII_IDS = radiiIds;

export type RadiiId = (typeof radiiIds)[number];

export const RADII_BY_ID = radiiById;

type RadiiConfig = (typeof RADII_BY_ID)[RadiiId];

export const mapRadiiToIds = <T>(callback: (radii: RadiiConfig) => T) =>
  mapValues(RADII_BY_ID, (radii) => callback(radii)) as Record<RadiiId, T>;
