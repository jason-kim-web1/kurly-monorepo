import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { isWebview } from '../../../util/window/getDevice';

export function useAppLinkBridge() {
  const router = useRouter();
  const uriScheme = useMemo(() => {
    if (router.isReady) {
      const url = router.query.url;
      if (url && typeof url === 'string') {
        return `kurly://open?url=${encodeURIComponent(url)}`;
      }
    }
  }, [router.isReady, router.query.url]);

  const bridgePageOn = useMemo(() => {
    if (router.isReady) {
      const apponly = /true/i.test(router.query.apponly as string);
      const isKurlyWebView = isWebview();
      return apponly && !isKurlyWebView;
    }
    return false;
  }, [router.isReady, router.query.apponly]);

  const bridgePageTitle = useMemo(() => {
    if (router.isReady) {
      const title = router.query.title;
      if (title && typeof title === 'string') {
        return title;
      }
    }
    return '컬리 앱을 설치해주세요';
  }, [router.isReady, router.query.title]);

  return { uriScheme, bridgePageOn, bridgePageTitle };
}
