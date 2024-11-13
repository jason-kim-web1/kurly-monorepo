import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { checkBrowserEnvironment } from '../../../../shared/utils/checkBrowserEnvironment';
import { CALLBACK_FUNCTION_NAMES } from '../../../../shared/constant/callbackFunction';

export default function usePlccCallback() {
  const { reload } = useRouter();

  const handleSuccessCallback = () => {
    reload();
  };

  const handleFailCallback = () => {
    // TODO: 실패 로직
  };

  const handleMessageFromChildWindow = (event: MessageEvent) => {
    const { data } = event;

    try {
      const { type, payload } = data;
      if (type !== CALLBACK_FUNCTION_NAMES.plccCreate) {
        return;
      }

      const { status } = payload;

      if (status === 'success') {
        handleSuccessCallback();
      } else if (status === 'fail') {
        handleFailCallback();
      }
    } catch (error) {
      handleFailCallback();
    }
  };

  useEffect(() => {
    if (!checkBrowserEnvironment()) {
      return;
    }
    window.addEventListener('message', handleMessageFromChildWindow);
    return () => {
      window.removeEventListener('message', handleMessageFromChildWindow);
    };
  }, [handleMessageFromChildWindow]);

  return null;
}
