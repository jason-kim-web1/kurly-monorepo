import { useCallback, useEffect, useRef } from 'react';

export default function useScrollLock() {
  const ref = useRef<Document>();

  useEffect(() => {
    ref.current = document;
  }, []);

  const lockScroll = useCallback(() => {
    if (!ref.current) {
      return;
    }
    ref.current.body.style.overflow = 'hidden';
  }, []);

  const unlockScroll = useCallback(() => {
    if (!ref.current) {
      return;
    }
    ref.current.body.style.overflow = 'visible';
  }, []);

  return { lockScroll, unlockScroll };
}
