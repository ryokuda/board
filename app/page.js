
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TopPage() {
  const router = useRouter();

  useEffect( () => router.push( '/board'), [] )
  return (
    <div></div>
  );
}
