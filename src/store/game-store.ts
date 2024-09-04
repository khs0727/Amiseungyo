import { ResultWithColor } from '@/utils/score-calculator';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Game {
  date: string;
  team: string;
  score: { team1: number; team2: number };
  scoreResult: ResultWithColor | null;
  picture?: string | null;
  player?: string;
  review?: string;
}

interface GameStore {
  games: Game[];
  addGame: (game: Game) => void;
  resetGames: () => void;
}

export const useGameStore = create(
  persist<GameStore>(
    (set) => ({
      games: [],
      addGame: (game) =>
        set((state) => ({
          games: [...state.games, game],
        })),
      resetGames: () =>
        set(() => ({
          games: [], // games 상태 초기화
        })),
    }),
    {
      name: 'game-storage',
    },
  ),
);
