/**
 * Safely retrieve a property value of an object without any constraints on the
 * respective key.
 * Resolves to a union of all object values.
 */
export const safeGet = <TObject extends Record<PropertyKey, unknown>>(
  swatches: TObject,
  swatchId: PropertyKey,
) =>
  (swatches as Record<PropertyKey, unknown>)[swatchId] as {
    [K in keyof TObject as string]: TObject[K];
  }[string];
