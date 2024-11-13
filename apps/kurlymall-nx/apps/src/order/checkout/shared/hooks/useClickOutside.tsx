import { useEffect } from 'react';

interface UseClickOutside {
  ref: React.RefObject<HTMLElement>;
  callback: () => void;
}

export default function useClickOutside({ ref, callback }: UseClickOutside) {
  useEffect(() => {
    if (typeof window === 'undefined' || !ref) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    window.document.addEventListener('mousedown', handleClickOutside);

    return () => window.document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);
}
