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

export default function NaverPayProcessContainer({ isMobilePage = false, isGiftOrder = false, isJoinOrder }: Props) {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const { paymentReady } = useGuestCheckDuringWebPayment({ isGiftOrder, isJoinOrder });

  const {
    orderNumber: groupOrderNo,
    paymentId: paymentGatewayTransactionId,
    resultCode: paymentGatewayResult,
    resultMessage: paymentGatewayMessage,
  } = query as ParsedUrlQuery & {
    orderNumber: string;
    paymentId: string;
    resultCode: string;
    resultMessage: string;
  };

  const checkResult = useCallback(() => {
    if (!paymentReady) {
      return;
    }

    dispatch(
      completeOrder({
        groupOrderNo,
        selectedVendorCode: 'naver-pay',
        paymentGatewayResult,
        paymentGatewayMessage,
        paymentGatewayTransactionId,
        isGiftOrder,
        isJoinOrder,
      }),
    );
  }, [
    dispatch,
    groupOrderNo,
    isGiftOrder,
    isJoinOrder,
    paymentGatewayMessage,
    paymentGatewayResult,
    paymentGatewayTransactionId,
    paymentReady,
  ]);

  useEffect(() => {
    checkResult();
  }, [checkResult]);

  return isMobilePage ? <MWInProgress /> : <PCInProgress />;
}
