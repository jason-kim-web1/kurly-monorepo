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

export default function TossPaymentsSuccessContainer({
  isMobilePage = false,
  isGiftOrder = false,
  isJoinOrder,
}: Props) {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const { paymentReady } = useGuestCheckDuringWebPayment({ isGiftOrder, isJoinOrder });

  const {
    groupOrderNo,
    authType,
    pointUse,
    installment,
    noInt,
    cardCode,
    sessionKey,
    encData,
    pan,
    eci,
    cavv,
    xid,
    joinCode,
  } = query as ParsedUrlQuery & {
    groupOrderNo: string;
    authType: string;
    pointUse: string;
    installment: string;
    noInt: string;
    cardCode: string;
    sessionKey: string;
    encData: string;
    pan: string;
    eci: string;
    cavv: string;
    xid: string;
    joinCode: string;
  };

  const checkResult = useCallback(() => {
    if (!paymentReady) {
      return;
    }

    dispatch(
      completeOrder({
        selectedVendorCode: 'toss-payments',
        groupOrderNo,
        tossPaymentsParameter: {
          authType,
          pointUse,
          installment,
          noInt,
          ispDetails: {
            cardCode,
            sessionKey,
            encData,
          },
          safeClickDetails: {
            pan,
            eci,
            cavv,
            xid,
            joinCode,
          },
        },
        isGiftOrder,
        isJoinOrder,
      }),
    );
  }, [
    paymentReady,
    dispatch,
    groupOrderNo,
    authType,
    pointUse,
    installment,
    noInt,
    cardCode,
    sessionKey,
    encData,
    pan,
    eci,
    cavv,
    xid,
    joinCode,
    isGiftOrder,
    isJoinOrder,
  ]);

  useEffect(() => {
    checkResult();
  }, [checkResult]);

  return isMobilePage ? <MWInProgress /> : <PCInProgress />;
}
