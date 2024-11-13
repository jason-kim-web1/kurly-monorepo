import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { ParsedUrlQuery } from 'querystring';

import { completeOrder } from '../../../../../shared/shared/reducers/payments.slice';

import PCInProgress from '../../../../../shared/pc/components/InProgress';
import MWInProgress from '../../../../../shared/m/components/InProgress';
import useGuestCheckDuringWebPayment from '../../../hooks/useGuestCheckDuringWebPayment';

interface Props {
  isMobilePage?: boolean;
  isGiftOrder?: boolean;
  isJoinOrder?: boolean;
}

export default function KakaoPayProcessContainer({ isMobilePage = false, isGiftOrder = false, isJoinOrder }: Props) {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const { paymentReady } = useGuestCheckDuringWebPayment({ isGiftOrder, isJoinOrder });

  const { orderNumber: groupOrderNo, pg_token: paymentGatewayToken } = query as ParsedUrlQuery & {
    orderNumber: string;
    pg_token: string;
  };

  const checkResult = useCallback(() => {
    if (!paymentReady) {
      return;
    }

    dispatch(
      completeOrder({
        groupOrderNo,
        selectedVendorCode: 'kakao-pay',
        paymentGatewayToken,
        isGiftOrder,
        isJoinOrder,
      }),
    );
  }, [paymentReady, dispatch, groupOrderNo, paymentGatewayToken, isGiftOrder, isJoinOrder]);

  useEffect(() => {
    checkResult();
  }, [checkResult]);

  return isMobilePage ? <MWInProgress /> : <PCInProgress />;
}
