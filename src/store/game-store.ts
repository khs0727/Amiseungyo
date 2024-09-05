import { ResultWithColor } from '@/utils/score-calculator';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Game {
  id: string;
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
  deleteGame: (id: string) => void;
  clearGames: () => void;
}

export const useGameStore = create(
  persist<GameStore>(
    (set) => ({
      games: [],
      addGame: (game) =>
        set((state) => ({
          games: [...state.games, game],
        })),
      deleteGame(id: string) {
        set((state) => ({
          games: state.games.filter((game) => game.id != id),
        }));
      },
      clearGames: () =>
        set(() => ({
          games: [], // 모든 게임을 빈 배열로 설정하여 초기화
        })),
    }),
    {
      name: 'game-storage',
    },
  ),
);
