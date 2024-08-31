import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TeamNames =
  | '기아 타이거즈'
  | '삼성 라이온즈'
  | 'LG 트윈스'
  | '두산 베어스'
  | 'SSG 랜더스'
  | 'KT 위즈'
  | '한화 이글스'
  | '롯데 자이언츠'
  | 'NC 다이노스'
  | '키움 히어로즈';

interface ThemeStore {
  team: string | undefined;
  setTeam: (team: string) => void;
}

export const useThemeStore = create(
  persist<ThemeStore>(
    (set) => ({
      team: undefined,
      setTeam: (team) => set({ team }),
    }),
    {
      name: 'theme-storage',
    },
  ),
);
