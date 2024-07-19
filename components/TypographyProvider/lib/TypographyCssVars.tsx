import { type ReactNode, useMemo } from 'react';
import { getTypographyVariableValues } from '../../../shared';
import { useTypographyTheme } from '../useTypographyThemeId';

type TypographyCssVarsProps = {
  children?: ReactNode;
};

export function TypographyCssVars({ children }: TypographyCssVarsProps) {
  const { typographyThemeId } = useTypographyTheme();
  const styleVars = useMemo(
    () => getTypographyVariableValues(typographyThemeId),
    [typographyThemeId],
  );
  return <div style={styleVars}>{children}</div>;
}
