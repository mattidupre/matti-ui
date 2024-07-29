type DefineColorSchemeOptions = {
  className: {
    light: string;
    dark: string;
  };
};

export const defineColorSchemeConfig = (options: DefineColorSchemeOptions) =>
  options;
