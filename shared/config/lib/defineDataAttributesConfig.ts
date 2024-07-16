export type DefineDataAttributesOptions = {
  flags: Record<`is${Capitalize<string>}`, `data-${string}`>;
};

export const defineDataAttributesConfig = <
  const TOptions extends DefineDataAttributesOptions,
>(
  options: TOptions,
) => options;
