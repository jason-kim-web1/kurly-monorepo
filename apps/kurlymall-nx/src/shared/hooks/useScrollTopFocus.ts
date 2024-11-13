import { useEffect } from 'react';

export default function useScrollTopFocus() {
  useEffect(() => {
    const timer = setTimeout(() => window.scrollTo(0, 0), 300);
    return () => {
      clearTimeout(timer);
    };
  }, []);
}
