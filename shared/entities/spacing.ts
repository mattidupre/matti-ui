import { mapValues } from 'lodash-es';
import { SPACING_CONFIG } from '../config';

const { spacingIds, spacingById } = SPACING_CONFIG;

export const SPACING_IDS = spacingIds;

export type SpacingId = (typeof spacingIds)[number];

export const SPACING_BY_ID = spacingById;

type SpacingConfig = (typeof SPACING_BY_ID)[SpacingId];

export const mapSpacingToIds = <T>(callback: (spacing: SpacingConfig) => T) =>
  mapValues(SPACING_BY_ID, (spacing) => callback(spacing)) as Record<
    SpacingId,
    T
  >;
