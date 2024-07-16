import { useRequiredContext } from '../../shared';
import { ColorSchemeContext } from './entities';

export const useColorScheme = () =>
  useRequiredContext(ColorSchemeContext, 'ColorSchemeContext');
