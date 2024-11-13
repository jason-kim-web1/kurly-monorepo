import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function CollectionsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/main');
  }, [router]);
  return null;
}
