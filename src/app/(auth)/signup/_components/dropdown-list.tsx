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

interface DropdownListProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DropdownList({ value, onChange }: DropdownListProps) {
  return (
    <DropdownMenu>
      <div className="relative">
        <DropdownMenuTrigger asChild className="text-lg">
          <Button variant="outline">{value}</Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
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
