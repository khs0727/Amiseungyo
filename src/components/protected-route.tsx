'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuthStore from '@/store/auth-store';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // 리디렉션 중에는 아무것도 렌더링 하지 않음
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
