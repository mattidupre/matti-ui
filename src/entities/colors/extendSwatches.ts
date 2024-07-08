import { pick } from 'lodash-es';
import {
  SWATCH_PARTIAL_KEYS,
  type SwatchConfigById,
  type SwatchPartial,
  type SwatchOptions,
  type SwatchConfig,
  type SwatchesPartial,
} from './entities';
import { extendSwatch } from './extendSwatch';

export const extendSwatches = <TSwatch extends SwatchConfigById>(
  swatch: TSwatch,
  ...options: ReadonlyArray<undefined | SwatchesPartial>
): TSwatch => {
  const result = {} as Record<string, SwatchConfig>;
  const baseOptions = options.map(
    (swatch) => pick(swatch, SWATCH_PARTIAL_KEYS) as undefined | SwatchOptions,
  );
  for (const swatchId of Object.keys(swatch)) {
    const extendArgs: Array<undefined | SwatchPartial> = [
      (swatch as Record<string, SwatchConfig>)[swatchId],
    ];
    for (const [i, option] of options.entries()) {
      extendArgs.push(
        baseOptions[i],
        option && (option as Record<string, SwatchPartial>)[swatchId],
      );
    }
    result[swatchId] = extendSwatch(...extendArgs);
  }

  return result as TSwatch;
};
