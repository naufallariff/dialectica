'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-biru-muda-2">
      <p className="text-xl font-semibold text-gray-700">Redirecting to login...</p>
    </div>
  );
}