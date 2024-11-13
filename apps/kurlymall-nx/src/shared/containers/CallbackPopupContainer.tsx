import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useWebview } from '../hooks';
import appService from '../services/app.service';
import { checkBrowserEnvironment } from '../utils/checkBrowserEnvironment';

/**
 * 자식 창에서 해당 페이지로 리다이렉트 되면 부모 창이나 부모 웹뷰가 있는 경우 callbackFunction 메세지를 보냅니다.
 *
 * @param { string } callbackFunction 부모 창이나 부모 웹뷰로 보낼 callbackFunction 메세지
 * @param { string } status status로 데이터를 보낼 값
 * @param { () => void } lastly 메세지 보내기를 시도 한 후 마지막으로 호출 할 함수
 * @return null
 */
export default function CallbackPopupContainer({
  callbackFunction,
  status,
  lastly,
}: {
  callbackFunction: string;
  status: string;
  lastly(): void;
}): null {
  const { isReady, query, back } = useRouter();
  const isWebView = useWebview();

  useEffect(() => {
    if (!checkBrowserEnvironment() || !isReady) {
      return;
    }
    if (isWebView) {
      appService.closeWebview({
        callback_function: `${callbackFunction}('${status}')`,
      });
      return;
    }

    window.opener?.postMessage(
      {
        type: callbackFunction,
        payload: {
          status,
        },
      },
      window.location.href,
    );

    lastly();
  }, [back, callbackFunction, isReady, isWebView, lastly, query, status]);

  return null;
}
