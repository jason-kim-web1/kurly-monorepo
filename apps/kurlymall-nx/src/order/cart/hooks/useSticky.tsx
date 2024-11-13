import { useEffect, useRef, useState } from 'react';

export function useSticky({ rootMarginTop }: { rootMarginTop: number }) {
  const [sticky, setSticky] = useState(false);
  const thresholdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSetSticky = () => {
      if (thresholdRef.current) {
        setSticky(thresholdRef.current.getBoundingClientRect().top < -rootMarginTop);
      }
    };

    window.addEventListener('scroll', handleSetSticky);
    return () => {
      window.removeEventListener('scroll', handleSetSticky);
    };
  }, []);

  return { sticky, thresholdRef };
}
