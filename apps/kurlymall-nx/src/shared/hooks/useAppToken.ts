import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { loadAppToken, storeAppToken } from '../../order/shared/shared/services/appToken.storage.service';
import { setAccessToken } from '../reducers/auth';
import { isWebview } from '../../../util/window/getDevice';
import { extractAuthentication } from '../utils/token';

export const useAppToken = ({ accessToken }: { accessToken?: string }) => {
  const [appToken, setAppToken] = useState<string>();
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isWebview()) {
      setIsReady(true);
      return;
    }

    if (accessToken) {
      dispatch(setAccessToken(extractAuthentication(accessToken)));
      storeAppToken(accessToken);
      setAppToken(accessToken);
    } else {
      const localAccessToken = loadAppToken();

      if (localAccessToken) {
        dispatch(setAccessToken(extractAuthentication(localAccessToken)));
        setAppToken(localAccessToken);
      }
    }
    setIsReady(true);
  }, [accessToken, dispatch]);

  return { appToken, isReady };
};
