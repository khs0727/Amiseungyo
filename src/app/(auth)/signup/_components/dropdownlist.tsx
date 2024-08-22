'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';

import { TEAMS } from '@/constants/teams';
import { useThemeStore } from '@/store/themeStore';

interface DropdownListProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DropdownList({ value, onChange }: DropdownListProps) {
  const { setTeam } = useThemeStore();

  const handleSelectTeam = (team: string) => {
    setTeam(team);
    onChange(team); //팀 상태도 업데이트
  };

  return (
    <DropdownMenu>
      <div className="relative">
        <DropdownMenuTrigger asChild className="text-lg">
          <Button variant="outline">{value}</Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={handleSelectTeam}>
          {TEAMS.map((team) => (
            <DropdownMenuRadioItem key={team} value={team}>
              {team}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
