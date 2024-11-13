import { useEffect, useState } from 'react';

import { isWebview } from '../../../util/window/getDevice';

export const useWebview = () => {
  const [webview, setIsWebview] = useState(true);

  useEffect(() => {
    setIsWebview(isWebview());
  }, []);

  return webview;
};
