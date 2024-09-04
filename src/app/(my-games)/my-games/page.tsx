'use client';

import Nav from '@/components/nav';
import ProtectedRoute from '@/components/protected-route';
import { defaultImages, TEAMSTYLES } from '@/constants/teams';
import { useGameStore } from '@/store/game-store';
import { TeamNames, useThemeStore } from '@/store/theme-store';
import Image from 'next/image';

export default function MyGames() {
  const team = useThemeStore((state) => state.team as TeamNames);
  const resetGames = useGameStore((state) => state.resetGames);

  const teamStyles = TEAMSTYLES[team] || TEAMSTYLES['default'];
  const teamImage = defaultImages[team];

  const games = useGameStore((state) => state.games);

  console.log(games);

  return (
    <ProtectedRoute>
      <Nav />

      <div
        className={`flex flex-col items-center max-w-full w-screen  h-screen ${teamStyles.bg.light} px-6 py-10`}
      >
        <div className="max-w-[1200px] w-full">
          <h2 className={`text-3xl underline mb-8 ${teamStyles.text}`}>내 경기</h2>
          {games.length === 0 ? (
            <p className="text-3xl">등록한 게임이 없습니다.</p>
          ) : (
            <ul className="grid grid-cols-2 gap-5">
              {games.map((game, index) => (
                <li
                  key={index}
                  className="flex mb-3 p-5 shadow-2xl border border-gray-200 rounded-lg transition-colors duration-300 hover:border-zinc-500"
                >
                  {game.picture ? (
                    <Image
                      src={game.picture}
                      alt="Game"
                      width={200}
                      height={200}
                      className="mt-2 object-contain rounded-lg"
                    />
                  ) : (
                    <Image
                      src={teamImage}
                      alt="defaultImage"
                      width={200}
                      height={200}
                      className="mt-2 object-contain rounded-lg"
                    />
                  )}
                  <span className="flex flex-col ml-8 justify-center">
                    <h3 className="text-2xl">vs {game.team}</h3>
                    <p className="text-xl">
                      {game.score.team1} : {game.score.team2}
                    </p>
                    <p>{new Date(game.date).toISOString().split('T')[0]}</p>

                    {game.player && <p>수훈선수: {game.player}</p>}
                    {game.review && <p>리뷰: {game.review}</p>}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
