type DefineColorSchemeOptions = {
  defaultColorScheme: 'light' | 'dark';
  className: {
    light: string;
    dark: string;
  };
};

export const defineColorSchemeConfig = (options: DefineColorSchemeOptions) =>
  options;
