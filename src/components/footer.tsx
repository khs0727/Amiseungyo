import { TEAMSTYLES } from '@/constants/teams';
import { TeamNames, useThemeStore } from '@/store/theme-store';
import { CiBaseball } from 'react-icons/ci';

export default function Footer() {
  const team = useThemeStore((state) => state.team as TeamNames);

  const teamStyles = TEAMSTYLES[team] || TEAMSTYLES['default'];

  return (
    <div className={`flex justify-between  ${teamStyles.bg.light} pt-10 pb-5 px-10`}>
      <span className="flex items-center gap-2 text-zinc-400 text-lg">
        <CiBaseball />
        {team}
      </span>
      <p className="text-sm text-zinc-400">&copy; khs0727</p>
    </div>
  );
}
