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

export default function PaycoProcessContainer({ isMobilePage = false, isGiftOrder = false, isJoinOrder }: Props) {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const { paymentReady } = useGuestCheckDuringWebPayment({ isGiftOrder, isJoinOrder });

  const {
    orderNumber: groupOrderNo,
    reserveOrderNo: paymentGatewayAuthNo,
    paymentCertifyToken: paymentGatewayAuthToken,
    code: paymentGatewayResult,
  } = query as ParsedUrlQuery & {
    orderNumber: string;
    code: string;
    reserveOrderNo: string;
    paymentCertifyToken: string;
  };

  const checkResult = useCallback(() => {
    if (!paymentReady) {
      return;
    }

    dispatch(
      completeOrder({
        groupOrderNo,
        selectedVendorCode: 'payco',
        paymentGatewayResult,
        paymentGatewayAuthNo,
        paymentGatewayAuthToken,
        isGiftOrder,
        isJoinOrder,
      }),
    );
  }, [
    paymentReady,
    dispatch,
    groupOrderNo,
    paymentGatewayResult,
    paymentGatewayAuthNo,
    paymentGatewayAuthToken,
    isGiftOrder,
    isJoinOrder,
  ]);

  useEffect(() => {
    checkResult();
  }, [checkResult]);

  return isMobilePage ? <MWInProgress /> : <PCInProgress />;
}
