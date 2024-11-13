import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useWebview } from '../../../src/shared/hooks';
import appService from '../../../src/shared/services/app.service';

export default function ClosePopup() {
  const { isReady } = useRouter();
  const isWebView = useWebview();

  useEffect(() => {
    if (!isReady) {
      return;
    }
    if (isWebView) {
      appService.closeWebview();
      return;
    }
    window.close();
  }, [isReady, isWebView]);

  return null;
}
