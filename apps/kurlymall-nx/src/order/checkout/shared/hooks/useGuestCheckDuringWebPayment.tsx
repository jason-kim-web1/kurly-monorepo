import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../../shared/store';
import { setValue } from '../../../shared/shared/reducers/payments.slice';
import { ORDER_PATH } from '../../../../shared/constant';
import { isWebview } from '../../../../../util/window/getDevice';
import { redirectTo } from '../../../../shared/reducers/page';

interface Props {
  isGiftOrder?: boolean;
  isJoinOrder?: boolean;
}

export default function useGuestCheckDuringWebPayment({ isGiftOrder, isJoinOrder }: Props) {
  const [paymentReady, setPaymentReady] = useState(false);
  const { accessToken, isGuest } = useAppSelector(({ auth }) => ({
    accessToken: auth.accessToken,
    isGuest: auth.isGuest,
  }));
  const { isReady: routerIsReady } = useRouter();
  const dispatch = useDispatch();

  const checkResult = useCallback(() => {
    if (!accessToken || !routerIsReady) {
      return;
    }

    if (isGuest && !isWebview()) {
      dispatch(
        setValue({
          paymentsResult: {
            reason: '유효시간이 만료되었습니다. 로그인을 다시 시도해주세요.',
            isGiftOrder,
            isJoinOrder,
          },
        }),
      );

      dispatch(redirectTo({ url: ORDER_PATH.fail.uri, replace: true }));

      return;
    }

    setPaymentReady(true);
  }, [accessToken, dispatch, isGiftOrder, isGuest, isJoinOrder, routerIsReady]);

  useEffect(() => {
    checkResult();
  }, [checkResult]);

  return {
    paymentReady,
  };
}
