import Link from 'next/link';
import { Button } from './ui/button';
import { TeamNames, useThemeStore } from '@/store/theme-store';
import { TEAMSTYLES } from '@/constants/teams';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Nav() {
  const router = useRouter();
  const team = useThemeStore((state) => state.team as TeamNames);

  const teamStyles = TEAMSTYLES[team] || TEAMSTYLES['default'];

  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/');
    toast.success('로그아웃 되었습니다.');
  };

  return (
    <nav className={`max-w-full w-screen p-8 flex ${teamStyles.bg.dark} justify-between`}>
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

        {isAuthenticated ? (
          <Button variant="link" className="text-lg text-white" onClick={handleLogout}>
            로그아웃
          </Button>
        ) : (
          <Link href="/signin">
            <Button variant="link" className="text-lg text-white">
              로그인
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
