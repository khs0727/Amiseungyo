'use client';

import HeroBanner from '@/components/hero-banner';
import Nav from '@/components/nav';
import StatusSummary from '@/components/status-summary';
import useAuthStore from '@/store/auth-store';

export default function Home() {
  const { isAuthenticated } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
  }));

  return (
    <div>
      <Nav />
      {isAuthenticated ? <StatusSummary /> : <HeroBanner />}
    </div>
  );
}
