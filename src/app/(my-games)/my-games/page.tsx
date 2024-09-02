'use client';

import ProtectedRoute from '@/components/protected-route';
import { useGameStore } from '@/store/game-store';

export default function MyGames() {
  const games = useGameStore((state) => state.games);
  console.log(games);
  return (
    <ProtectedRoute>
      <div>내 경기</div>
    </ProtectedRoute>
  );
}
