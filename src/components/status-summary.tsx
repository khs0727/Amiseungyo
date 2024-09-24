import { TEAMSTYLES } from '@/constants/teams';
import { useThemeStore } from '@/store/theme-store';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Game, useGameStore } from '@/store/game-store';
import { Card, CardContent } from './ui/card';
import RecentGames from './recent-games';
import useHighlightStore from '@/store/highligt-store';
import Footer from './footer';

export default function StatusSummary() {
  const userId = localStorage.getItem('userId');
  const team = useThemeStore((state) => (userId ? state.team[userId] : undefined));

  const teamStyles = team ? TEAMSTYLES[team] : TEAMSTYLES.default;

  const games = useGameStore((state) => (userId ? state.games[userId] || [] : []));
  const favorites = useHighlightStore((state) => (userId ? state.favorites[userId] || [] : []));

  const calculateWinRate = () => {
    const totalGames = games.length;
    const wins = games.filter((game) => game.scoreResult?.result === '승').length;
    const winRate = totalGames > 0 ? (wins / totalGames) * 100 : 0;
    return winRate.toFixed(2);
  };

  const getLatestGames = (gameList: Game[], count: number) => {
    const sortedGames = [...gameList].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return sortedGames.slice(0, count);
  };

  return (
    <>
      <main
        className={`flex justify-center items-start max-w-full w-screen min-h-screen pb-10 ${teamStyles.bg.light}`}
      >
        <div
          className={`w-[1200px] min-h-[900px] mt-16 mx-10 px-8 py-5 border-4 border-dashed rounded-lg ${teamStyles.border}`}
        >
          {/* 총 경기수 */}
          <div className="mb-6 flex items-center gap-5">
            <h3 className="text-3xl text-zinc-600 underline">직관 경기 수 :</h3>
            <p className="text-2xl text-zinc-500">{games.length}</p>
          </div>

          {/* 응원하는 팀의 승률 */}
          <div className="mb-6 flex items-center gap-5">
            <h3 className="text-3xl text-zinc-600 underline">나의 승률 :</h3>
            <p className="text-2xl text-zinc-500 text-shadow">{calculateWinRate()}%</p>
          </div>

          {/* 최근 기록한 경기 */}
          <div className="mb-6">
            <h3 className="text-3xl text-zinc-600 underline">최근 직관 경기</h3>

            <Carousel className="flex justify-center items-center mt-6 mx-auto">
              {games.length === 0 ? (
                <p className="text-3xl justify-center flex mt-10">등록된 게임이 없습니다.</p>
              ) : (
                <CarouselContent>
                  {getLatestGames(games, 3).map((game) => (
                    <CarouselItem key={game.id} className="min-w-[330px] basis-1/3">
                      <Card className={`${teamStyles.bg.light} border-zinc-400`}>
                        <CardContent>
                          <RecentGames game={game} />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              )}
            </Carousel>
          </div>

          {/* 하이라이트 경기 */}
          <div className="mb-4">
            <h3 className="text-3xl text-zinc-600 underline">Highlight Moments</h3>
            <Carousel className="flex max-w-[1030px] w-full justify-center mt-4 mx-auto">
              {favorites.length === 0 ? (
                <p className="text-3xl flex justify-center mt-10">등록된 게임이 없습니다.</p>
              ) : (
                <CarouselContent>
                  {favorites.map((game) => (
                    <CarouselItem key={game.id} className="min-w-[330px] basis-1/3">
                      <Card className={`${teamStyles.bg.light} border-zinc-400`}>
                        <CardContent>
                          <RecentGames game={game} />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              )}
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
