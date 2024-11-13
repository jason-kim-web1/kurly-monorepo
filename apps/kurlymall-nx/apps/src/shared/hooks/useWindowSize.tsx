import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

const DELAY = 100;

interface WindowSize {
  height: number;
  width: number;
}

export default function useWindowSize() {
  const [size, setSize] = useState<WindowSize>({
    width: typeof window === 'object' ? window.innerWidth : 0,
    height: typeof window === 'object' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (!window) {
      return;
    }

    const handleResize = debounce(() => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, DELAY);

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
