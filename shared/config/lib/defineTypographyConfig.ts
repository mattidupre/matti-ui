type DefineTypographyOptions = Record<never, never>;

export const defineTypogragraphyConfig = <T extends DefineTypographyOptions>(
  options: T,
): T => options;
