import { useEffect, useRef } from 'react';
import { eq, some } from 'lodash';
import { useRouter } from 'next/router';

import { isUriSchemeCallAllowedOnLoad } from '../../../util/window/getDevice';
import { tryUriScheme } from '../utils/deep-link';

// 유니버셜링크(iOS), 앱링크(Android) 동작하지 않을 때 페이지 진입 시 URI Scheme 호출을 시도
export function useAppLinkFallback(
  uriScheme: string | undefined,
  configs?: {
    tryOnLoad?: boolean;
    onFulfilled?: (isMoved: boolean) => void;
  },
) {
  const router = useRouter();
  // 중복호출 방지. 페이지로드시 최초 1회만 호출
  const isTriedRef = useRef(false);
  const { tryOnLoad = true, onFulfilled } = configs || {};
  const shouldNotTry = some([isTriedRef.current, !tryOnLoad, eq(uriScheme, undefined)]);

  useEffect(() => {
    if (shouldNotTry || !router.isReady) {
      return;
    }
    isTriedRef.current = true;
    if (isUriSchemeCallAllowedOnLoad(router.query)) {
      tryUriScheme(uriScheme as string).then(onFulfilled);
      return;
    }
    onFulfilled?.(false);
  }, [shouldNotTry, onFulfilled, uriScheme, router.isReady, router.query]);

  return { uriScheme };
}
