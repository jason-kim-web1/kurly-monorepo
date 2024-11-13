import { useEffect } from 'react';

import appService from '../services/app.service';
import { useWebview } from './useWebview';

export const useWebviewTitle = ({ headerTitle }: { headerTitle: string }) => {
  const webview = useWebview();

  useEffect(() => {
    if (webview && headerTitle) {
      appService.changeTitle(headerTitle);
    }
  }, [webview, headerTitle]);

  return { webview };
};
