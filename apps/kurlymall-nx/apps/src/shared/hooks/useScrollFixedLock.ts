import { useEffect } from 'react';

/**
 * document.body의 스크롤을 고정합니다.
 *
 * 스크롤바가 사라지거나 나타날 때 document.body의 화면 폭이 변하지 않도록 fixed 옵션을 사용합니다.
 */
export default function useScrollFixedLock() {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;
    `;

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, -parseInt(scrollY || '0', 10));
    };
  }, []);
}
