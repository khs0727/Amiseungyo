import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TEAMSTYLES } from '@/constants/teams';
import { useThemeStore } from '@/store/theme-store';

export type SortType = '최신순' | '오래된순';

interface SortGamesProps {
  onSortChange: (sortType: SortType) => void;
}

export default function SortGames({ onSortChange }: SortGamesProps) {
  const [selectedSort, setSelectedSort] = useState<SortType>('최신순');

  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const team = useThemeStore((state) => (userId ? state.team[userId] : undefined));

  const teamStyles = team ? TEAMSTYLES[team] : TEAMSTYLES.default;

  const handleSortChange = (sortType: SortType) => {
    setSelectedSort(sortType);
    onSortChange(sortType);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`${teamStyles.bg.light} w-[90px] border-2 border-zinc-600 text-lg`}
        >
          {selectedSort}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`w-56 ${teamStyles.bg.light}`}>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={selectedSort === '최신순'}
          onCheckedChange={() => handleSortChange('최신순')}
        >
          최신순
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedSort === '오래된순'}
          onCheckedChange={() => handleSortChange('오래된순')}
        >
          오래된순
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
