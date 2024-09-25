import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Game } from './game-store';

interface HighlightStore {
  favorites: { [userId: string]: Game[] };
  addFavorite: (game: Game) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const useHighlightStore = create(
  persist<HighlightStore>(
    (set, get) => ({
      favorites: {},
      addFavorite: (game) => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        set((state) => ({
          favorites: {
            ...state.favorites,
            [userId]: [...(state.favorites[userId] || []), game],
          },
        }));
      },
      removeFavorite: (id) => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        set((state) => ({
          favorites: {
            ...state.favorites,
            [userId]: state.favorites[userId]?.filter((game) => game.id !== id) || [],
          },
        }));
      },
      isFavorite: (id) => {
        const userId = localStorage.getItem('userId');
        if (!userId) return false;
        return get().favorites[userId]?.some((game) => game.id === id) || false;
      },
    }),
    {
      name: 'highlight-store',
    },
  ),
);

export default useHighlightStore;
