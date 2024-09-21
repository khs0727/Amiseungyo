import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { defaultImages } from '@/constants/teams';
import { Game } from '@/store/game-store';
import { TeamNames, useThemeStore } from '@/store/theme-store';
import { useState } from 'react';
import GameItem from './game-item';

export default function GamesPagination({ games }: { games: Game[] }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const gamesperPage = 6;
  const totalPage = Math.ceil(games.length / gamesperPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentGames = games.slice((currentPage - 1) * gamesperPage, currentPage * gamesperPage);

  const userId = localStorage.getItem('userId');
  const team = userId ? useThemeStore((state) => state.team[userId]) : undefined;

  const teamImage = team ? defaultImages[team as TeamNames] : defaultImages['default'];

  return (
    <div className="relative min-h-screen">
      <ul className="grid grid-cols-2 gap-5 mb-5">
        {currentGames.map((game, index) => (
          <GameItem key={index} game={game} teamImage={teamImage} />
        ))}
      </ul>
      <Pagination className="fixed bottom-0 left-0 w-full mt-5">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>

          {[...Array(totalPage)].map((_, index) => {
            const page = index + 1;
            const isStartEllipsis = currentPage > 3 && page === 2;
            const isEndEllipsis = currentPage < totalPage - 2 && page === totalPage - 1;

            if (page >= currentPage - 1 && page <= currentPage + 1) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page)}
                    className="text-lg"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }

            if (isStartEllipsis) {
              return <PaginationEllipsis key="start-ellipsis" />;
            }

            if (isEndEllipsis) {
              return <PaginationEllipsis key="end-ellipsis" />;
            }

            return null;
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
