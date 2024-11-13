import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { ParsedUrlQuery } from 'querystring';

import { failOrderWithSetMessage } from '../../../../../shared/shared/reducers/payments.slice';
import { PaymentAllResult } from '../../../../../../shared/interfaces';
import useGuestCheckDuringWebPayment from '../../../hooks/useGuestCheckDuringWebPayment';

interface Props {
  paymentAllResult?: PaymentAllResult;
  paymentGatewayMessage?: string;
  isGiftOrder?: boolean;
}

export default function OrderFailContainer({ paymentAllResult, paymentGatewayMessage, isGiftOrder = false }: Props) {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const { paymentReady } = useGuestCheckDuringWebPayment({ isGiftOrder });

  const { orderNumber, paymentGatewayMessage: queryPaymentGatewayMessage } = query as ParsedUrlQuery & {
    orderNumber: string;
    paymentGatewayMessage?: string;
  };

  const checkResult = useCallback(() => {
    if (!paymentReady) {
      return;
    }

    dispatch(
      failOrderWithSetMessage({
        groupOrderNo: orderNumber,
        paymentAllResult,
        paymentGatewayMessage: paymentGatewayMessage ? paymentGatewayMessage : queryPaymentGatewayMessage,
        isGiftOrder,
        showPGFailMessage: true,
      }),
    );
  }, [
    dispatch,
    isGiftOrder,
    orderNumber,
    paymentAllResult,
    paymentGatewayMessage,
    paymentReady,
    queryPaymentGatewayMessage,
  ]);

  useEffect(() => {
    checkResult();
  }, [checkResult]);

  return <></>;
}
