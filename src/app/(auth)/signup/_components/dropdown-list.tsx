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
import { cn } from '@/lib/utils';

interface DropdownListProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function DropdownList({ value, onChange, placeholder }: DropdownListProps) {
  return (
    <DropdownMenu>
      <div className="relative">
        <DropdownMenuTrigger asChild className="text-lg">
          <Button variant="outline" className={cn(!value && 'text-slate-400')}>
            {value || placeholder}
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="absolute w-[200px]" align="start" sideOffset={4}>
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
