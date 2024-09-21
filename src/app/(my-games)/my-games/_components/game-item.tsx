import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { TEAMSTYLES } from '@/constants/teams';
import { Game, useGameStore } from '@/store/game-store';
import { useHighlightStore } from '@/store/highligt-store';
import { TeamNames, useThemeStore } from '@/store/theme-store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoHeartSharp } from 'react-icons/io5';
import { IoHeartOutline } from 'react-icons/io5';

interface GameItemProps {
  game: Game;
  teamImage: string;
}

export default function GameItem({ game, teamImage }: GameItemProps) {
  const [IsMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const userId = localStorage.getItem('userId');
  const team = userId ? useThemeStore((state) => state.team[userId]) : undefined;
  const teamStyles = team ? TEAMSTYLES[team] : TEAMSTYLES['default'];

  const deleteGame = useGameStore((state) => state.deleteGame);
  const gameId = game.id;

  const { addFavorite, removeFavorite, isFavorite } = useHighlightStore();

  const handleToggleFavorite = () => {
    if (isFavorite(game.id)) {
      removeFavorite(game.id);
    } else {
      addFavorite(game);
    }
  };

  const handleIconClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleEditClick = () => {
    router.push(`/edit-game/${gameId}`);
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
        <p className="text-zinc-500 mb-2">{new Date(game.date).toLocaleDateString('ko-KR')}</p>

        {game.player && <p className={`${teamStyles.text} mb-2`}>수훈선수 : {game.player}</p>}
        {game.review && (
          <span className="text-zinc-500 mb-3">
            리뷰 : <p className="break-keep whitespace-break-spaces">{game.review} </p>
          </span>
        )}
      </div>
      <Button variant="icon" className="absolute bottom-2 right-1" onClick={handleToggleFavorite}>
        {isFavorite(game.id) ? (
          <IoHeartSharp className="w-6 h-6 text-red-600" />
        ) : (
          <IoHeartOutline className="w-6 h-6 text-zinc-400" />
        )}
      </Button>

      <Button variant="icon" className="absolute top-3 right-3" onClick={handleIconClick}>
        <HiDotsHorizontal />
      </Button>
      {IsMenuOpen && (
        <div className="absolute top-12 right-3 flex flex-col gap-1">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className={`${teamStyles.bg.dark}`}>수정하기</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={`${teamStyles.bg.light}`}>
              <AlertDialogHeader>
                <AlertDialogTitle>이 게임을 수정하시겠습니까?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className={`${teamStyles.bg.dark} text-white`}>
                  취소
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleEditClick} className={`${teamStyles.bg.dark}`}>
                  수정하기
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className={`${teamStyles.bg.dark}`}>삭제하기</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={`${teamStyles.bg.light}`}>
              <AlertDialogHeader>
                <AlertDialogTitle>정말 이 게임을 삭제하시겠습니까?</AlertDialogTitle>
                <AlertDialogDescription>
                  한 번 삭제한 게임은 다시 되돌릴 수 없습니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className={`${teamStyles.bg.dark} text-white`}>
                  취소
                </AlertDialogCancel>
                <AlertDialogAction
                  className={`${teamStyles.bg.dark}`}
                  onClick={() => deleteGame(game.id)}
                >
                  삭제하기
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </li>
  );
}
