import { useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import { ParsedUrlQuery } from 'querystring';

import orderResult from '../../../../../shared/shared/utils/orderResult';
import useGuestCheckDuringWebPayment from '../../../hooks/useGuestCheckDuringWebPayment';

interface Props {
  isGiftOrder?: boolean;
  isJoinOrder?: boolean;
}

export default function OrderCancelContainer({ isGiftOrder = false, isJoinOrder }: Props) {
  const { query } = useRouter();
  const { paymentReady } = useGuestCheckDuringWebPayment({ isGiftOrder, isJoinOrder });

  const { orderNumber } = query as ParsedUrlQuery & {
    orderNumber: string;
  };

  const checkResult = useCallback(() => {
    if (!paymentReady) {
      return;
    }

    orderResult().paymentsCancel({ groupOrderNo: orderNumber, isGiftOrder, isJoinOrder });
  }, [paymentReady, orderNumber, isGiftOrder, isJoinOrder]);

  useEffect(() => {
    checkResult();
  }, [checkResult]);

  return <></>;
}
