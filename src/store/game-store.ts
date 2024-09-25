import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResultWithColor } from '@/utils/score-calculator';

export interface Game {
  id: string;
  date: Date;
  team: string;
  score: { team1: number; team2: number };
  scoreResult: ResultWithColor | null;
  picture?: string | null;
  player?: string;
  review?: string;
}

interface GameStore {
  games: Record<string, Game[]>;
  addGame: (game: Game) => void;
  deleteGame: (id: string) => void;
  updateGame: (id: string, updatedGame: Partial<Game>) => void;
  getGame: (id: string) => Game | undefined;
}

export const useGameStore = create(
  persist<GameStore>(
    (set, get) => ({
      games: {},
      addGame: (game) => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        set((state) => ({
          games: {
            ...state.games,
            [userId]: [...(state.games[userId] || []), game],
          },
        }));
      },
      deleteGame(id: string) {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        set((state) => ({
          games: {
            ...state.games,
            [userId]: state.games[userId].filter((game) => game.id !== id),
          },
        }));
      },
      updateGame(id: string, updatedGame: Partial<Game>) {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        set((state) => ({
          games: {
            ...state.games,
            [userId]: state.games[userId].map((game) =>
              game.id === id ? { ...game, ...updatedGame } : game,
            ),
          },
        }));
      },
      getGame(id: string) {
        const userId = localStorage.getItem('userId');
        if (!userId) return undefined;

        const currentGames = get().games[userId] || [];
        return currentGames.find((game) => game.id === id);
      },
    }),
    {
      name: 'game-storage',
    },
  ),
);
