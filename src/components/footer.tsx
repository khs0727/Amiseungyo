import { CiBaseball } from 'react-icons/ci';
import { TEAMSTYLES } from '@/constants/teams';
import { useThemeStore } from '@/store/theme-store';

export default function Footer() {
  const userId = localStorage.getItem('userId');
  const team = useThemeStore((state) => (userId ? state.team[userId] : undefined));

  const teamStyles = team ? TEAMSTYLES[team] : TEAMSTYLES.default;

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
