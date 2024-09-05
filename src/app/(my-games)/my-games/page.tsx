'use client';

import Nav from '@/components/nav';
import ProtectedRoute from '@/components/protected-route';
import { defaultImages, TEAMSTYLES } from '@/constants/teams';
import { useGameStore } from '@/store/game-store';
import { TeamNames, useThemeStore } from '@/store/theme-store';
import GameItem from './_components/game-item';

export default function MyGames() {
  const team = useThemeStore((state) => state.team as TeamNames);

  const teamStyles = TEAMSTYLES[team] || TEAMSTYLES['default'];
  const teamImage = defaultImages[team];

  const games = useGameStore((state) => state.games);

  return (
    <ProtectedRoute>
      <Nav />

      <div
        className={`flex flex-col items-center max-w-full w-screen h-screen ${teamStyles.bg.light} px-6 py-10`}
      >
        <div className="max-w-[1200px] w-full">
          <h2 className={`text-3xl underline mb-8 ${teamStyles.text}`}>나의 경기</h2>
          {games.length === 0 ? (
            <p className="text-3xl flex justify-center mt-10">등록된 게임이 없습니다.</p>
          ) : (
            <ul className="grid grid-cols-2 gap-5">
              {games.map((game, index) => (
                <GameItem key={index} game={game} teamImage={teamImage} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
