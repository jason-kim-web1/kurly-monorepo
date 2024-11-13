import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Loading from '../../shared/components/Loading/Loading';
import { useAppSelector } from '../../shared/store';
import { isWebview } from '../../../util/window/getDevice';
import appService from '../../shared/services/app.service';
import deepLinkUrl from '../../shared/constant/deepLink';
import { COMMON_PATH } from '../../shared/constant';
import useKurlypay from '../../shared/hooks/useKurlypay';
import { tryParseUrl } from '../../shared/utils/url';

export default function KurlypayBridge() {
  const router = useRouter();
  const { authKurlypay } = useKurlypay();

  const { isGuest, hasSession } = useAppSelector(({ auth }) => auth);

  useEffect(() => {
    const isKurlyWebView = isWebview();

    if (router.isReady && hasSession) {
      if (isGuest) {
        if (isKurlyWebView) {
          // 로그인 하지 않고 돌아오는 경우를 대비하여 자동으로 꺼지게 한다.
          window.document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
              setTimeout(() => {
                appService.closeWebview();
              }, 500); // 앱에서 로그인을 성공하고 돌아오면 웹뷰를 새로고침 해 주는데, 이 시점이 visibilitychange 이후이기 때문에 성공시에 꺼지지 않도록 timeout 설정
            }
          });
          location.assign(deepLinkUrl.LOGIN);
        } else {
          const url = new URL(location.href);
          url.searchParams.set('noscheme', 'true');
          void router.replace(`${COMMON_PATH.login.uri}?guest=1&return_url=${encodeURIComponent(url.href)}`);
        }
      } else {
        const url = tryParseUrl(router.query.url?.toString());
        if (url && /kurlypay\.co\.kr$/.test(url.hostname)) {
          authKurlypay().then(({ accessToken, errorCode }) => {
            if (accessToken) {
              url.searchParams.set('accessToken', accessToken);
            }
            if (errorCode) {
              url.searchParams.set('errorCode', errorCode);
            }
            location.replace(url.href);
          });
        } else {
          alert('잘못된 접근입니다.');
          if (isKurlyWebView) {
            appService.closeWebview();
          }
        }
      }
    }
  }, [authKurlypay, hasSession, isGuest, router]);
  return <Loading />;
}
