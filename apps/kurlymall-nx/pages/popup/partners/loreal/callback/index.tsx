import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useWebview } from '../../../../../src/shared/hooks';
import { checkBrowserEnvironment } from '../../../../../src/shared/utils/checkBrowserEnvironment';
import appService from '../../../../../src/shared/services/app.service';

const LorealCallbackPage = () => {
  const { isReady, query } = useRouter();
  const isWebView = useWebview();

  useEffect(() => {
    if (!checkBrowserEnvironment() || !isReady) {
      return;
    }
    if (isWebView) {
      appService.closeWebview({
        callback_function: 'PARTNER_INTEGRATION_CALLBACK()',
      });
      return;
    }
    window.opener?.postMessage(
      {
        type: 'PARTNER_INTEGRATION_CALLBACK',
        payload: {
          partnerName: 'loreal',
          // TODO: 로레알 콜백 상태 (성공상태) from query
          status: query.status || 'unknown',
        },
      },
      window.location.href,
    );
    window.close();
  }, [isReady, isWebView, query]);

  return null;
};

export default LorealCallbackPage;
