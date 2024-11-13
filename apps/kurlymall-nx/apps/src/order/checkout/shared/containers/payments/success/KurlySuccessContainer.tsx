import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { ParsedUrlQuery } from 'querystring';

import { completeOrder } from '../../../../../shared/shared/reducers/payments.slice';

import usePaymentReady from '../../../hooks/usePaymentReady';

import PCInProgress from '../../../../../shared/pc/components/InProgress';
import MWInProgress from '../../../../../shared/m/components/InProgress';

interface Props {
  isMobilePage?: boolean;
  isGiftOrder?: boolean;
  isJoinOrder?: boolean;
}

export default function KurlySuccessContainer({ isMobilePage = false, isGiftOrder = false, isJoinOrder }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { paymentReady } = usePaymentReady();

  const { groupOrderNo, paymentGatewayTransactionId } = router.query as ParsedUrlQuery & {
    groupOrderNo: string;
    paymentGatewayTransactionId?: string;
  };

  const checkResult = useCallback(() => {
    if (!paymentReady) {
      return;
    }

    dispatch(
      completeOrder({
        paymentGatewayTransactionId,
        groupOrderNo,
        selectedVendorCode: 'kurly',
        isGiftOrder,
        isJoinOrder,
      }),
    );
  }, [paymentReady, dispatch, paymentGatewayTransactionId, groupOrderNo, isGiftOrder, isJoinOrder]);

  useEffect(() => {
    checkResult();
  }, [checkResult]);

  return isMobilePage ? <MWInProgress /> : <PCInProgress />;
}
