'use client';

import { TeamNames, useThemeStore } from '@/store/theme-store';
import { TEAMCOLORS } from '@/constants/teams';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Nav() {
  const team = useThemeStore((state) => state.team as TeamNames);

  const navClass = TEAMCOLORS[team] || TEAMCOLORS['default'];

  return (
    <nav className={`bg-slate-950 max-w-full w-screen p-8 ${navClass} flex justify-between`}>
      <Link href="/">
        <h1 className="text-3xl text-white">AmISeungyo</h1>
      </Link>
      <div className="flex gap-3 items-center">
        <Link href="/my-games">
          <Button variant="link" className="text-lg text-white">
            My Games
          </Button>
        </Link>
        <Link href="/add-game">
          <Button variant="link" className="text-lg text-white">
            add Game
          </Button>
        </Link>
        <Link href="/profile">
          <Button variant="link" className="text-lg text-white">
            Profile
          </Button>
        </Link>
      </div>
    </nav>
  );
}
