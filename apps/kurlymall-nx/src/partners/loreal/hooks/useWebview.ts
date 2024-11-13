import { useEffect, useRef, useState } from 'react';

import { isWebview } from '../../../../util/window/getDevice';

const DEFAULT_STATE = false;

export const useWebview = () => {
  const [webview, setIsWebview] = useState(DEFAULT_STATE);
  const prevRef = useRef(DEFAULT_STATE);

  useEffect(() => {
    const isWebView = isWebview();
    if (prevRef.current === isWebView) {
      return;
    }
    setIsWebview(isWebView);
    prevRef.current = isWebView;
  });

  return webview;
};
