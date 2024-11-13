import { useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

import { isProduction } from '../configs/config';

// NOTE: 개발 전용
export const useRenderCount = (name: string) => {
  const internalIdRef = useRef(nanoid());
  const renderCountRef = useRef(0);
  useEffect(() => {
    if (isProduction()) {
      return;
    }
    renderCountRef.current += 1;
    console.log(`[${internalIdRef.current}] ${name} : ${renderCountRef.current}`);
  });
};
