import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { isPC } from '../../../../util/window/getDevice';
import { InProgressProps, PAYMENT_RESULT } from '../interfaces';
import usePaymentProcess from '../hooks/usePaymentProcess';
import PCInProgress from '../../shared/pc/components/InProgress';
import MoInProgress from '../../shared/m/components/InProgress';

import { getPaymentResult } from '../utils/getPaymentResult';
import { getPageProcessResult } from '../utils/getPaymentResultParams';

export default function InProgress(iframeProcessResult: InProgressProps) {
  const { query } = useRouter();
  const pageProcessResult = getPageProcessResult(query);

  const { paymentResult, requestSubscribeParams } = getPaymentResult({
    iframeProcessResult,
    pageProcessResult,
  });
  const { successPaymentProcess, failPaymentProcess, cancelPaymentProcess } = usePaymentProcess(requestSubscribeParams);

  useEffect(() => {
    (async () => {
      if (paymentResult === PAYMENT_RESULT.SUCCESS) {
        await successPaymentProcess();
        return;
      }
      if (paymentResult === PAYMENT_RESULT.ERROR) {
        await failPaymentProcess();
        return;
      }
      await cancelPaymentProcess();
    })();
  }, []);

  return isPC ? <PCInProgress /> : <MoInProgress />;
}
