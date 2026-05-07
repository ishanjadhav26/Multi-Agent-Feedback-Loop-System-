'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace('/voice'); }, [router]);
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18 }}>
      Redirecting to Voice Call...
    </div>
  );
}
