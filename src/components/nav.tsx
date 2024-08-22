'use client';

import { useThemeStore } from '@/store/themeStore';
import { TEAMCOLORS, TeamNames } from '@/constants/teams';
import Link from 'next/link';

export default function Nav() {
  const team = useThemeStore((state) => state.team as TeamNames);

  const navClass = TEAMCOLORS[team];

  return (
    <nav className={`p-8 ${navClass} flex justify-between`}>
      <h1 className="text-3xl text-#f8fafc">AmISeungyo</h1>
      <div className="flex gap-5 items-center text-lg text-#f8fafc">
        <Link href="/home">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
