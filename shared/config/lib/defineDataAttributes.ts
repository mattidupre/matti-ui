export type DefineDataAttributesOptions = {
  flags: Record<`is${Capitalize<string>}`, `data-${string}`>;
};

export const defineDataAttributes = <
  const TOptions extends DefineDataAttributesOptions,
>(
  options: TOptions,
) => options;
