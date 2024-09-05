import { Button } from '@/components/ui/button';
import { TEAMSTYLES } from '@/constants/teams';
import { Game, useGameStore } from '@/store/game-store';
import { TeamNames, useThemeStore } from '@/store/theme-store';
import Image from 'next/image';
import { useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';

interface GameItemProps {
  game: Game;
  teamImage: string;
}

export default function GameItem({ game, teamImage }: GameItemProps) {
  const [IsMenuOpen, setIsMenuOpen] = useState(false);

  const team = useThemeStore((state) => state.team as TeamNames);
  const teamStyles = TEAMSTYLES[team] || TEAMSTYLES['default'];

  const deleteGame = useGameStore((state) => state.deleteGame);

  const handleIconClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <li className="relative flex mb-3 p-5 shadow-2xl border border-gray-200 rounded-lg transition-colors duration-300 hover:border-zinc-500 hover:cursor-pointer">
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
          className="mt-2 object-contain rounded-lg"
        />
      )}
      <div className="flex flex-col ml-8 justify-center">
        <span className="flex items-center gap-5 mb-2">
          <h3 className="text-2xl">vs {game.team}</h3>
          <p className="text-xl" style={{ color: game.scoreResult?.color }}>
            {game.scoreResult?.result}
          </p>
        </span>
        <p className="text-xl">
          {game.score.team1} : {game.score.team2}
        </p>
        <p className="text-zinc-500 mb-2">{new Date(game.date).toISOString().split('T')[0]}</p>

        {game.player && <p className={`${teamStyles.text} mb-2`}>수훈선수 : {game.player}</p>}
        {game.review && (
          <span className="text-zinc-500 mb-3">
            리뷰 : <p className="break-keep whitespace-break-spaces">{game.review} </p>
          </span>
        )}
      </div>
      <Button variant="icon" className="absolute top-3 right-3" onClick={handleIconClick}>
        <HiDotsHorizontal />
      </Button>
      {IsMenuOpen && (
        <div className="absolute top-12 right-3 flex flex-col gap-1">
          <Button className={`${teamStyles.bg.dark}`}>수정하기</Button>
          <Button onClick={() => deleteGame(game.id)} className={`${teamStyles.bg.dark}`}>
            삭제하기
          </Button>
        </div>
      )}
    </li>
  );
}
