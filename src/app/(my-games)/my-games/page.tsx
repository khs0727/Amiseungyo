'use client';

import Nav from '@/components/nav';
import ProtectedRoute from '@/components/protected-route';
import { TEAMSTYLES } from '@/constants/teams';
import { useGameStore } from '@/store/game-store';
import { TeamNames, useThemeStore } from '@/store/theme-store';
import { useEffect } from 'react';

export default function MyGames() {
  const team = useThemeStore((state) => state.team as TeamNames);
  const resetGames = useGameStore((state) => state.resetGames);

  const teamStyles = TEAMSTYLES[team] || TEAMSTYLES['default'];
  const games = useGameStore((state) => state.games);

  console.log(games);

  return (
    <ProtectedRoute>
      <Nav />

      <div
        className={`flex flex-col items-start max-w-full w-screen h-screen ${teamStyles.bg.light} px-12 py-8`}
      >
        <button onClick={resetGames}>Reset Games</button>
        <h2 className={`text-3xl underline mb-8 ${teamStyles.text}`}>내 경기</h2>
        {games.length === 0 ? (
          <p>등록한 게임이 없습니다.</p>
        ) : (
          <ul>
            {games.map((game, index) => (
              <li key={index}>
                <h3>vs {game.team}</h3>
                <p>{game.date}</p>
                <p>
                  {game.score.team1} : {game.score.team2}
                </p>

                {game.player && <p>수훈선수: {game.player}</p>}
                {game.review && <p>리뷰: {game.review}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </ProtectedRoute>
  );
}
