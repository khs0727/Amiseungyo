import { create } from 'zustand';

interface ThemeStore {
  team: string;
  setTeam: (team: string) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  team: '기본테마',
  setTeam: (team) => set({ team }),
}));
