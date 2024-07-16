type DefineColorSchemeOptions = {
  colorSchemeSsr: 'light' | 'dark';
  className: {
    light: string;
    dark: string;
  };
};

export const defineColorSchemeConfig = (options: DefineColorSchemeOptions) =>
  options;
