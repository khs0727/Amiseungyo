import { defaultImages, TEAMSTYLES } from '@/constants/teams';
import { Game } from '@/store/game-store';
import { TeamNames, useThemeStore } from '@/store/theme-store';
import Image from 'next/image';

interface RecentGamesProps {
  game: Game;
}

export default function RecentGames({ game }: RecentGamesProps) {
  const team = useThemeStore((state) => state.team as TeamNames);
  const teamStyles = TEAMSTYLES[team] || TEAMSTYLES['default'];
  const teamImage = defaultImages[team];

  return (
    <div className="flex flex-col min-h-[450px] max-h-[500px] mt-5 gap-5 justify-start items-center overflow-y-auto">
      {game.picture ? (
        <Image
          src={game.picture}
          alt="Game"
          width={200}
          height={200}
          className="mt-2 object-cover rounded-lg"
        />
      ) : (
        <Image
          src={teamImage}
          alt="defaultImage"
          width={200}
          height={200}
          className="mt-2 object-cover rounded-lg"
        />
      )}
      <div className="flex flex-col mx-4 justify-center">
        <span className="flex items-center gap-5 mb-2">
          <h3 className="text-2xl">vs {game.team}</h3>
          <p className="text-xl" style={{ color: game.scoreResult?.color }}>
            {game.scoreResult?.result}
          </p>
        </span>
        <p className="text-xl">
          {game.score.team1} : {game.score.team2}
        </p>
        <p className="text-zinc-500 mb-2">{new Date(game.date).toLocaleDateString('ko-KR')}</p>

        {game.player && <p className={`${teamStyles.text} mb-2`}>수훈선수 : {game.player}</p>}
        {game.review && (
          <span className="text-zinc-500 mb-3">
            리뷰 : <p className="break-keep whitespace-break-spaces">{game.review} </p>
          </span>
        )}
      </div>
    </div>
  );
}
