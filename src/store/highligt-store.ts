import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Game } from './game-store';

interface HighlightStore {
  favorites: Game[];
  addFavorite: (game: Game) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useHighlightStore = create(
  persist<HighlightStore>(
    (set, get) => ({
      favorites: [],
      addFavorite: (game) =>
        set((state) => ({
          favorites: [...state.favorites, game],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((game) => game.id !== id),
        })),
      isFavorite: (id) => get().favorites.some((game) => game.id === id),
    }),
    {
      name: 'highlight-store',
    },
  ),
);
