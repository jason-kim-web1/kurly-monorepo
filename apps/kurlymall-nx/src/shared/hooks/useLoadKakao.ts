import { useEffect, useState } from 'react';

import { KAKAO_SHARE_KEY } from '../configs/config';

const KakaoScriptBasePath = 'https://developers.kakao.com/sdk/js/kakao.min.js';
const KakaoScriptFallbackPath = 'https://res.kurly.com/js/lib/kakao.min.js';

export default function useLoadKakao() {
  const [isLoaded, setIsLoaded] = useState(false);

  const kakaoInitialized = () => {
    const kakao = window.Kakao;

    if (kakao) {
      if (!kakao.isInitialized()) {
        kakao.init(KAKAO_SHARE_KEY);
      }
    }
  };

  useEffect(() => {
    if (isLoaded) {
      return;
    }

    setIsLoaded(true);
    const scriptElement = document.createElement('script');
    scriptElement.src = KakaoScriptBasePath;
    scriptElement.async = true;
    document.head.appendChild(scriptElement);

    scriptElement.onload = () => kakaoInitialized();

    scriptElement.onerror = () => {
      document.querySelector(`script[src="${KakaoScriptBasePath}"]`)?.remove();

      const fallbackScriptElement = document.createElement('script');
      fallbackScriptElement.src = KakaoScriptFallbackPath;
      fallbackScriptElement.async = true;
      document.head.appendChild(fallbackScriptElement);
      fallbackScriptElement.onload = () => kakaoInitialized();
    };
  }, [isLoaded]);
}
