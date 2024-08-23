'use client';

import { TeamNames, useThemeStore } from '@/store/themeStore';
import { TEAMCOLORS } from '@/constants/teams';
import Link from 'next/link';

export default function Nav() {
  const team = useThemeStore((state) => state.team as TeamNames);

  const navClass = TEAMCOLORS[team] || TEAMCOLORS['default'];

  return (
    <nav className="p-8 flex justify-between" style={{ backgroundColor: navClass }}>
      <h1 className="text-3xl text-white">AmISeungyo</h1>
      <div className="flex gap-5 items-center text-lg text-white">
        <Link href="/home">Home</Link>
        <Link href="/about">Records</Link>
        <Link href="/services">Add Record</Link>
        <Link href="/contact">Profile</Link>
      </div>
    </nav>
  );
}
