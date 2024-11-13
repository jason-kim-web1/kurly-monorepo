import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function CategoriesPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/main');
  }, [router]);
  return null;
}
