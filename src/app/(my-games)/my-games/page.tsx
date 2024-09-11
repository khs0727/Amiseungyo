'use client';

import Nav from '@/components/nav';
import ProtectedRoute from '@/components/protected-route';
import { defaultImages, TEAMSTYLES } from '@/constants/teams';
import { useGameStore } from '@/store/game-store';
import { TeamNames, useThemeStore } from '@/store/theme-store';
import GameItem from './_components/game-item';
import SortGames, { SortType } from './_components/sort-games';
import { useState } from 'react';

export default function MyGames() {
  const [sortType, setSortType] = useState<SortType>('최신순');

  const team = useThemeStore((state) => state.team as TeamNames);

  const teamStyles = TEAMSTYLES[team] || TEAMSTYLES['default'];
  const teamImage = defaultImages[team];

  const games = useGameStore((state) => state.games);

  const sortedGames = [...games].sort((a, b) => {
    if (sortType === '최신순') {
      return new Date(b.date).getTime() - new Date(a.date).getTime(); //최신순
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime(); //오래된순
    }
  });

  return (
    <ProtectedRoute>
      <Nav />

      <div
        className={`flex flex-col items-center max-w-full w-screen  ${teamStyles.bg.light} px-6 py-10`}
      >
        <div className="max-w-[1200px] w-full">
          <div className="flex justify-between">
            <h2 className={`text-3xl underline mb-8 ${teamStyles.text}`}>나의 경기</h2>
            <SortGames onSortChange={setSortType} />
          </div>
          {games.length === 0 ? (
            <p className="text-3xl flex justify-center mt-10">등록된 게임이 없습니다.</p>
          ) : (
            <ul className="grid grid-cols-2 gap-5">
              {sortedGames.map((game, index) => (
                <GameItem key={index} game={game} teamImage={teamImage} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
