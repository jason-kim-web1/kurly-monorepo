import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { useCallback, useEffect } from 'react';

import { isNull } from 'lodash';

import { useAppSelector } from '../../../../shared/store';

import { setPaymentGatewayUrl } from '../../../shared/shared/reducers/payments.slice';

export default function usePaymentProcessEvent(onCloseAction?: () => void) {
  const dispatch = useDispatch();
  const { beforePopState, asPath } = useRouter();
  const paymentGatewayUrl = useAppSelector(({ payments }) => payments.paymentGatewayUrl);

  const handleCloseIframe = useCallback(() => {
    window.history.pushState('', '', asPath);
    dispatch(setPaymentGatewayUrl(null));

    if (onCloseAction) {
      onCloseAction();
    }
  }, [asPath, dispatch, onCloseAction]);

  useEffect(() => {
    if (isNull(paymentGatewayUrl)) {
      return;
    }

    document.body.style.overflow = 'hidden';

    beforePopState(() => {
      handleCloseIframe();
      return false;
    });

    return () => {
      document.body.style.overflow = 'auto';
      beforePopState(() => true);
    };
  }, [beforePopState, handleCloseIframe, paymentGatewayUrl]);
}
