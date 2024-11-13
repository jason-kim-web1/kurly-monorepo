import { useEffect, useState } from 'react';

import { isDefined } from '../utils/lodash-extends';
import { NAVER_SHARE_CLIENTID } from '../configs/config';

function loadNaverMapScript() {
  return new Promise<boolean>((resolve, reject) => {
    const naverMapScript = document.createElement('script');
    naverMapScript.async = false;
    naverMapScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_SHARE_CLIENTID}`;

    naverMapScript.addEventListener('load', () => resolve(true), false);
    naverMapScript.addEventListener('error', () => reject(false), false);
    document.head.appendChild(naverMapScript);
  });
}

export default function useLoadNaverMap() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      if (isDefined(typeof window) && isDefined(window.naver?.maps)) {
        setIsLoaded(true);
        return;
      }

      const load = await loadNaverMapScript();
      setIsLoaded(load);
    })();
  }, []);

  return { isLoaded };
}
