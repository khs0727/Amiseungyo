import { create } from 'zustand';
import { TeamNames } from '@/constants/teams';

interface ThemeStore {
  team: string | undefined;
  setTeam: (team: string) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  team: undefined,
  setTeam: (team) => set({ team }),
}));
