import { useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import { checkBrowserEnvironment } from '../../../../shared/utils/checkBrowserEnvironment';
import { CALLBACK_FUNCTION_NAMES } from '../../../../shared/constant/callbackFunction';

export default function useOrderRefreshCallback() {
  const { reload } = useRouter();

  const handleSuccess = useCallback(() => {
    reload();
  }, [reload]);

  const handleHistoryBack = useCallback(
    (event) => {
      if (typeof window !== 'object') {
        return;
      }

      const { navigation } = window.performance;

      if (event.persisted || navigation.type === navigation.TYPE_BACK_FORWARD) {
        handleSuccess();
      }
    },
    [handleSuccess],
  );

  const handleMessageFromChildWebView = useCallback(
    (status: string) => {
      if (status !== 'success') {
        return;
      }
      handleSuccess();
    },
    [handleSuccess],
  );

  const handleMessageFromChildWindow = useCallback(
    (event: MessageEvent) => {
      const {
        data: { type, payload },
      } = event;

      try {
        if (type !== CALLBACK_FUNCTION_NAMES.checkoutRefresh || payload.status !== 'success') {
          return;
        }
        handleSuccess();
      } catch (error) {}
    },
    [handleSuccess],
  );

  useEffect(() => {
    if (!checkBrowserEnvironment()) {
      return;
    }
    window.ORDER_REFRESH_CALLBACK = handleMessageFromChildWebView;
    window.addEventListener('message', handleMessageFromChildWindow);
    window.addEventListener('pageshow', handleHistoryBack);
    return () => {
      delete window.ORDER_REFRESH_CALLBACK;
      window.removeEventListener('message', handleMessageFromChildWindow);
      window.removeEventListener('pageshow', handleHistoryBack);
    };
  }, [handleHistoryBack, handleMessageFromChildWebView, handleMessageFromChildWindow]);

  return null;
}
