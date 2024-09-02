import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Game {
  date: string;
  team: string;
  score: { team1: number; team2: number };
  player?: string;
  review?: string;
}

interface GameStore {
  games: Game[];
  addGame: (game: Game) => void;
}

export const useGameStore = create(
  persist<GameStore>(
    (set) => ({
      games: [],
      addGame: (game) =>
        set((state) => ({
          games: [...state.games, game],
        })),
    }),
    {
      name: 'game-storage',
    },
  ),
);
