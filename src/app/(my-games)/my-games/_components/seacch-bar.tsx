import { IoIosSearch } from 'react-icons/io';
import { Input } from '@/components/ui/input';
import { TEAMSTYLES } from '@/constants/teams';
import { useThemeStore } from '@/store/theme-store';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onSearch(value);
  };

  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const team = useThemeStore((state) => (userId ? state.team[userId] : undefined));

  const teamStyles = team ? TEAMSTYLES[team] : TEAMSTYLES.default;

  return (
    <div className="flex relative">
      <IoIosSearch className="absolute top-3 left-2.5 text-zinc-500" />
      <Input
        placeholder="검색어를 입력해주세요."
        value={searchTerm}
        onChange={handleChange}
        className={`w-[500px] pl-8 ${teamStyles.bg.light} text-lg border-2 border-zinc-500`}
      />
    </div>
  );
}
