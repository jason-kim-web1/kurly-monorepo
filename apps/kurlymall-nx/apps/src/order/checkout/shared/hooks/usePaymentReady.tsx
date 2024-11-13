import { useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { loadAppToken } from '../../../shared/shared/services/appToken.storage.service';

import { useAppSelector } from '../../../../shared/store';
import { setAccessToken } from '../../../../shared/reducers/auth';

export default function usePaymentReady() {
  const [paymentReady, setPaymentReady] = useState(false);
  const { accessToken } = useAppSelector(({ auth }) => auth);
  const { isReady } = useRouter();
  const dispatch = useDispatch();

  const checkResult = useCallback(() => {
    if (!isReady) {
      return;
    }

    if (!accessToken) {
      const localAccessToken = loadAppToken();

      if (localAccessToken) {
        dispatch(
          setAccessToken({
            accessToken: localAccessToken,
            isGuest: false,
          }),
        );
      }

      return;
    }

    setPaymentReady(true);
  }, [isReady, accessToken, dispatch]);

  useEffect(() => {
    checkResult();
  }, [checkResult]);

  return {
    paymentReady,
    accessToken,
  };
}
