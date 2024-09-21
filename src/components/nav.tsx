import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import Link from 'next/link';
import { Button } from './ui/button';
import { useThemeStore } from '@/store/theme-store';
import { TEAMSTYLES } from '@/constants/teams';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';

export default function Nav() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();

  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const team = useThemeStore((state) => (userId ? state.team[userId] : undefined));

  console.log(team);
  const teamStyles = team ? TEAMSTYLES[team] : TEAMSTYLES['default'];

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      logout();
      localStorage.removeItem('userId');
      useThemeStore.getState().setTeam(undefined);

      router.push('/');
      toast.success('로그아웃 되었습니다.');
    } catch (error) {
      toast.error('로그아웃 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="link" className={`${teamStyles.bg.dark} text-lg text-white`}>
                로그아웃
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={`${teamStyles.bg.light}`}>
              <AlertDialogHeader>
                <AlertDialogTitle>로그아웃 하시겠습니까?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className={`${teamStyles.bg.dark} text-white`}>
                  취소
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout} className={`${teamStyles.bg.dark}`}>
                  로그아웃
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
