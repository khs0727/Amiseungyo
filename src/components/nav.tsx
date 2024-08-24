'use client';

import { TeamNames, useThemeStore } from '@/store/themeStore';
import { TEAMCOLORS } from '@/constants/teams';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Nav() {
  const team = useThemeStore((state) => state.team as TeamNames);

  const navClass = TEAMCOLORS[team] || TEAMCOLORS['default'];

  return (
    <nav className={`p-8 ${navClass} flex justify-between`}>
      <h1 className="text-3xl text-#f8fafc">AmISeungyo</h1>
      <div className="flex gap-3 items-center">
        <Link href="/home" passHref>
          <Button variant="link" className="text-lg">
            Home
          </Button>
        </Link>
        <Link href="/myGames">
          <Button variant="link" className="text-lg">
            My Games
          </Button>
        </Link>
        <Link href="/addGame">
          <Button variant="link" className="text-lg">
            add Game
          </Button>
        </Link>
        <Link href="/profile">
          <Button variant="link" className="text-lg">
            Profile
          </Button>
        </Link>
      </div>
    </nav>
  );
}
