'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-ungu-primary to-biru-muda-2 relative">
      <p className="text-xl font-semibold text-black animate-bounce">Loading . . .</p>
    </div>
  );
}