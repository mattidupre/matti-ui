import { useAtom } from 'jotai';
import { colorSchemePreferenceAtom } from './entities';

export const useColorSchemePreference = () =>
  useAtom(colorSchemePreferenceAtom);
